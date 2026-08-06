import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import BlogLikeButton from '../components/BlogLikeButton.js';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase.js';
import { forumTopics } from '../data/forumTopics.js';
import {
  addForumComment,
  addForumInterest,
  hasLikedForumTopic,
  likeForumTopic,
  markForumTopicLiked,
  subscribeToForumComments,
  subscribeToForumLikes,
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

export default function ForumPage() {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authPending, setAuthPending] = useState(true);
  const [likedTopics, setLikedTopics] = useState(() => {
    const initialState = {};

    forumTopics.forEach((topic) => {
      initialState[topic.id] = hasLikedForumTopic(topic.id);
    });

    return initialState;
  });
  const [submittingLikeId, setSubmittingLikeId] = useState(null);
  const [submittingCommentId, setSubmittingCommentId] = useState(null);
  const [submittingInterestId, setSubmittingInterestId] = useState(null);
  const [statusMessages, setStatusMessages] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthPending(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeLikes = forumTopics.map((topic) =>
      subscribeToForumLikes(
        topic.id,
        (count) => {
          setLikes((previous) => ({ ...previous, [topic.id]: count }));
        },
        () => {},
      ),
    );

    const unsubscribeComments = forumTopics.map((topic) =>
      subscribeToForumComments(
        topic.id,
        (nextComments) => {
          setComments((previous) => ({ ...previous, [topic.id]: nextComments }));
        },
        () => {},
      ),
    );

    return () => {
      unsubscribeLikes.forEach((unsubscribe) => unsubscribe());
      unsubscribeComments.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setAuthPending(true);
      await signInWithPopup(auth, googleProvider);
      setStatusMessages((previous) => ({ ...previous, auth: 'Signed in with Google.' }));
    } catch (error) {
      console.error('Unable to sign in with Google', error);
      setStatusMessages((previous) => ({ ...previous, auth: 'Unable to sign in with Google right now.' }));
    } finally {
      setAuthPending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setStatusMessages((previous) => ({ ...previous, auth: 'Signed out.' }));
    } catch (error) {
      console.error('Unable to sign out', error);
      setStatusMessages((previous) => ({ ...previous, auth: 'Unable to sign out right now.' }));
    }
  };

  const handleLike = async (topicId) => {
    if (likedTopics[topicId]) {
      return;
    }

    setSubmittingLikeId(topicId);

    try {
      await likeForumTopic(topicId);
      setLikes((previous) => ({ ...previous, [topicId]: (previous[topicId] || 0) + 1 }));
      markForumTopicLiked(topicId);
      setLikedTopics((previous) => ({ ...previous, [topicId]: true }));
    } catch (error) {
      console.error('Unable to save forum like', error);
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Unable to save your like right now. Please try again.',
      }));
    } finally {
      setSubmittingLikeId(null);
    }
  };

  const handleCommentSubmit = async (event, topicId) => {
    event.preventDefault();
    const trimmedComment = (commentDrafts[topicId] || '').trim();

    if (!currentUser) {
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Please sign in with Google to leave a comment.',
      }));
      return;
    }

    if (!trimmedComment) {
      return;
    }

    setSubmittingCommentId(topicId);

    try {
      await addForumComment(topicId, trimmedComment);
      setCommentDrafts((previous) => ({ ...previous, [topicId]: '' }));
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Comment posted. Thanks for contributing.',
      }));
    } catch (error) {
      console.error('Unable to save forum comment', error);
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Unable to post your comment right now. Please try again.',
      }));
    } finally {
      setSubmittingCommentId(null);
    }
  };

  const handleInterestSubmit = async (event, topicId) => {
    event.preventDefault();

    if (!currentUser) {
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Please sign in with Google before joining.',
      }));
      return;
    }

    const confirmed = window.confirm('On joining, we will share your email id. Continue?');

    if (!confirmed) {
      return;
    }

    setSubmittingInterestId(topicId);

    try {
      await addForumInterest(topicId, currentUser.email || '');
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Thanks for your interest. I will follow up by email.',
      }));
    } catch (error) {
      console.error('Unable to save forum interest', error);
      setStatusMessages((previous) => ({
        ...previous,
        [topicId]: 'Unable to save your interest right now. Please try again.',
      }));
    } finally {
      setSubmittingInterestId(null);
    }
  };

  return (
    <section className="page page-forum">
      <p className="page-kicker">Community forum</p>
      <h1 className="page-title">Forum</h1>
      <p className="page-lead">
        Share ideas, leave feedback, and signal interest in projects you would like to help build.
      </p>

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

      {statusMessages.auth ? <p className="forum-status">{statusMessages.auth}</p> : null}

      <div className="forum-list">
        {forumTopics.map((topic) => {
          const isLiked = Boolean(likedTopics[topic.id]);
          const topicLikes = likes[topic.id] || 0;
          const topicComments = comments[topic.id] || [];
          const commentDraft = commentDrafts[topic.id] || '';
          const statusMessage = statusMessages[topic.id];

          return (
            <article className="forum-card" key={topic.id}>
              <div className="forum-card-header">
                <div>
                  <p className="forum-kicker">{topic.category}</p>
                  <h2 className="forum-card-title">{topic.title}</h2>
                  <p className="forum-card-description">{topic.description}</p>
                </div>

                <div className="forum-card-actions">
                  <BlogLikeButton
                    liked={isLiked}
                    likeCount={topicLikes}
                    isLiking={submittingLikeId === topic.id}
                    onToggle={() => handleLike(topic.id)}
                    className="forum-like-button"
                  />
                </div>
              </div>

              <div className="forum-card-footer">
                <Link className="text-link" to={`/forum/${topic.id}`}>
                  Open discussion &gt;
                </Link>
                <span className="forum-metric">{topicComments.length} {topicComments.length === 1 ? 'comment' : 'comments'}</span>
              </div>

              <div className="forum-tags" aria-label="Topic tags">
              </div>

              <div className="forum-tags" aria-label="Topic tags">
                {topic.tags.map((tag) => (
                  <span className="forum-tag" key={tag}>{tag}</span>
                ))}
              </div>

              <form className="forum-form" onSubmit={(event) => handleCommentSubmit(event, topic.id)}>
                <label className="forum-label" htmlFor={`comment-${topic.id}`}>
                  Leave a public comment
                </label>
                <textarea
                  id={`comment-${topic.id}`}
                  className="forum-textarea"
                  rows="3"
                  maxLength="280"
                  value={commentDraft}
                  onChange={(event) => setCommentDrafts((previous) => ({ ...previous, [topic.id]: event.target.value }))}
                  placeholder="Share a thought, suggestion, or concern"
                  disabled={!currentUser}
                />
                <button className="forum-submit-button" type="submit" disabled={submittingCommentId === topic.id || !currentUser}>
                  {submittingCommentId === topic.id ? 'Posting…' : currentUser ? 'Post comment' : 'Sign in to comment'}
                </button>
              </form>

              <div className="forum-comments">
                <h3 className="forum-comments-title">Comments</h3>
                {topicComments.length > 0 ? (
                  <ul className="forum-comment-list">
                    {topicComments.map((comment) => (
                      <li className="forum-comment-item" key={comment.id}>
                        <p>{comment.text}</p>
                        <span>{formatCommentDate(comment.createdAt?.toDate ? comment.createdAt.toDate() : comment.createdAt)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="forum-empty-state">No comments yet. Be the first to add one.</p>
                )}
              </div>

              <form className="forum-form forum-form--inline" onSubmit={(event) => handleInterestSubmit(event, topic.id)}>
                <label className="forum-label" htmlFor={`interest-${topic.id}`}>
                  Interested in joining?
                </label>
                <div className="forum-inline-row">
                  <button className="forum-submit-button" type="submit" disabled={submittingInterestId === topic.id || !currentUser}>
                    {submittingInterestId === topic.id ? 'Saving…' : currentUser ? 'Join this project' : 'Sign in to join'}
                  </button>
                </div>
              </form>

              {statusMessage ? <p className="forum-status">{statusMessage}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
