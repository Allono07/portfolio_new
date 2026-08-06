import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useParams } from 'react-router-dom';
import BlogLikeButton from '../components/BlogLikeButton.js';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase.js';
import { forumTopics } from '../data/forumTopics.js';
import {
  addForumComment,
  addForumInterest,
  deleteForumComment,
  hasLikedForumTopic,
  likeForumTopic,
  markForumTopicLiked,
  subscribeToForumComments,
  subscribeToForumLikes,
  updateForumComment,
} from '../utils/forum.js';

function formatCommentDate(value) {
  if (!value) {
    return 'Recently added';
  }

  try {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recently added';
  }
}

export default function ForumTopicPage() {
  const { topicId } = useParams();
  const topic = forumTopics.find((entry) => entry.id === topicId);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentDraft, setCommentDraft] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [authPending, setAuthPending] = useState(true);
  const [isLiked, setIsLiked] = useState(() => {
    if (!topic) {
      return false;
    }

    return hasLikedForumTopic(topic.id);
  });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [submittingLike, setSubmittingLike] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingInterest, setSubmittingInterest] = useState(false);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.debug('Auth state changed', { user: user ? user.email : null });
      setCurrentUser(user);
      setAuthPending(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!topic) {
      return undefined;
    }

    const unsubscribeLikes = subscribeToForumLikes(
      topic.id,
      (count) => {
        setLikes(count);
      },
      () => {},
    );

    const unsubscribeComments = subscribeToForumComments(
      topic.id,
      (nextComments) => {
        setComments(nextComments);
      },
      () => {},
    );

    return () => {
      unsubscribeLikes();
      unsubscribeComments();
    };
  }, [topic]);

  if (!topic) {
    return (
      <section className="page page-forum">
        <p className="page-kicker">Community forum</p>
        <h1 className="page-title">Topic not found</h1>
        <p className="page-lead">The requested forum topic could not be found.</p>
        <Link className="text-link" to="/forum">
          Back to forum &gt;
        </Link>
      </section>
    );
  }

  const handleGoogleSignIn = async () => {
    try {
      setAuthPending(true);
      console.debug('Google sign-in started', { origin: window.location.origin });
      const result = await signInWithPopup(auth, googleProvider);
      console.debug('Google sign-in succeeded', {
        user: result.user?.email,
        providerId: result.providerId,
      });
      setStatusMessage('Signed in with Google.');
    } catch (error) {
      console.error('Unable to sign in with Google', error);
      setStatusMessage(`Unable to sign in with Google right now: ${error.code || error.message}`);
    } finally {
      setAuthPending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setStatusMessage('Signed out.');
    } catch (error) {
      console.error('Unable to sign out', error);
      setStatusMessage('Unable to sign out right now.');
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      return;
    }

    setSubmittingLike(true);

    try {
      await likeForumTopic(topic.id);
      setLikes((previous) => previous + 1);
      markForumTopicLiked(topic.id);
      setIsLiked(true);
      setStatusMessage('Thanks for the support.');
    } catch (error) {
      console.error('Unable to save forum like', error);
      setStatusMessage('Unable to save your like right now.');
    } finally {
      setSubmittingLike(false);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const trimmedComment = commentDraft.trim();

    if (!currentUser) {
      setStatusMessage('Please sign in with Google to leave a comment.');
      return;
    }

    if (!trimmedComment) {
      return;
    }

    setSubmittingComment(true);

    try {
      await addForumComment(topic.id, trimmedComment);
      setCommentDraft('');
      setStatusMessage('Comment posted publicly.');
    } catch (error) {
      console.error('Unable to save forum comment', error);
      setStatusMessage('Unable to post your comment right now.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleInterestSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      setStatusMessage('Please sign in with Google before joining.');
      return;
    }

    const confirmed = window.confirm('On joining, we will share your email id. Continue?');

    if (!confirmed) {
      return;
    }

    setSubmittingInterest(true);

    try {
      await addForumInterest(topic.id, currentUser.email || '');
      setStatusMessage('Thanks for your interest. I will follow up by email.');
    } catch (error) {
      console.error('Unable to save forum interest', error);
      setStatusMessage('Unable to save your interest right now.');
    } finally {
      setSubmittingInterest(false);
    }
  };

  const startEditingComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  const handleEditSave = async (commentId) => {
    const trimmedComment = editingCommentText.trim();

    if (!trimmedComment) {
      return;
    }

    setSubmittingEdit(true);

    try {
      await updateForumComment(topic.id, commentId, trimmedComment);
      setEditingCommentId(null);
      setEditingCommentText('');
      setStatusMessage('Comment updated.');
    } catch (error) {
      console.error('Unable to update forum comment', error);
      setStatusMessage('Unable to update that comment right now.');
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('Remove this comment from the public forum?');

    if (!confirmed) {
      return;
    }

    setDeletingCommentId(commentId);

    try {
      await deleteForumComment(topic.id, commentId);
      setStatusMessage('Comment removed.');
    } catch (error) {
      console.error('Unable to delete forum comment', error);
      setStatusMessage('Unable to remove that comment right now.');
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <section className="page page-forum">
      <Link className="text-link" to="/forum">
        &larr; Back to forum
      </Link>

      <div className="forum-card forum-card--detail">
        <div className="forum-card-header">
          <div>
            <p className="forum-kicker">{topic.category}</p>
            <h1 className="forum-card-title">{topic.title}</h1>
            <p className="forum-card-description">{topic.description}</p>
          </div>

          <div className="forum-card-actions">
            <BlogLikeButton
              liked={isLiked}
              likeCount={likes}
              isLiking={submittingLike}
              onToggle={handleLike}
              className="forum-like-button"
            />
          </div>
        </div>

        <div className="forum-auth-row">
          {authPending ? (
            <p className="forum-status">Checking sign-in status…</p>
          ) : currentUser ? (
            <>
              <p className="forum-status">Signed in as {currentUser.email || 'Google user'}</p>
              <button className="forum-submit-button" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <button className="forum-submit-button" type="button" onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
          )}
        </div>

        <div className="forum-tags" aria-label="Topic tags">
          {topic.tags.map((tag) => (
            <span className="forum-tag" key={tag}>{tag}</span>
          ))}
        </div>

        <form className="forum-form" onSubmit={handleCommentSubmit}>
          <label className="forum-label" htmlFor={`comment-${topic.id}`}>
            Leave a public comment
          </label>
          <textarea
            id={`comment-${topic.id}`}
            className="forum-textarea"
            rows="4"
            maxLength="280"
            value={commentDraft}
            onChange={(event) => setCommentDraft(event.target.value)}
            placeholder="Share your thoughts, feedback, or ideas"
            disabled={!currentUser}
          />
          <button className="forum-submit-button" type="submit" disabled={submittingComment || !currentUser}>
            {submittingComment ? 'Posting…' : currentUser ? 'Post comment' : 'Sign in to comment'}
          </button>
        </form>

        <div className="forum-comments">
          <h2 className="forum-comments-title">Public comments</h2>
          {comments.length > 0 ? (
            <ul className="forum-comment-list">
              {comments.map((comment) => {
                const isEditing = editingCommentId === comment.id;

                return (
                  <li className="forum-comment-item" key={comment.id}>
                    {isEditing ? (
                      <div className="forum-comment-edit">
                        <textarea
                          className="forum-textarea"
                          rows="3"
                          value={editingCommentText}
                          onChange={(event) => setEditingCommentText(event.target.value)}
                        />
                        <div className="forum-comment-actions">
                          <button className="forum-submit-button" type="button" onClick={() => handleEditSave(comment.id)} disabled={submittingEdit}>
                            {submittingEdit ? 'Saving…' : 'Save'}
                          </button>
                          <button className="forum-submit-button" type="button" onClick={() => setEditingCommentId(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>{comment.text}</p>
                        <div className="forum-comment-meta">
                          <span>{formatCommentDate(comment.createdAt?.toDate ? comment.createdAt.toDate() : comment.createdAt)}</span>
                          <div className="forum-comment-actions">
                            <button className="forum-submit-button" type="button" onClick={() => startEditingComment(comment)}>
                              Edit
                            </button>
                            <button className="forum-submit-button" type="button" onClick={() => handleDeleteComment(comment.id)} disabled={deletingCommentId === comment.id}>
                              {deletingCommentId === comment.id ? 'Removing…' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="forum-empty-state">No public comments yet. Be the first to add one.</p>
          )}
        </div>

        <form className="forum-form forum-form--inline" onSubmit={handleInterestSubmit}>
          <label className="forum-label" htmlFor={`interest-${topic.id}`}>
            Interested in joining?
          </label>
          <div className="forum-inline-row">
            <button className="forum-submit-button" type="submit" disabled={submittingInterest || !currentUser}>
              {submittingInterest ? 'Saving…' : currentUser ? 'Join this project' : 'Sign in to join'}
            </button>
          </div>
        </form>

        {statusMessage ? <p className="forum-status">{statusMessage}</p> : null}
      </div>
    </section>
  );
}
