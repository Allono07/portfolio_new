import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

const FORUM_LIKES_COLLECTION = 'forumLikes';
const FORUM_TOPICS_COLLECTION = 'forumTopics';
const FORUM_INTEREST_COLLECTION = 'forumInterestSignups';
const FORUM_LIKED_TOPICS_STORAGE_KEY = 'kindle-forum-liked-topics';

function getStoredLikedTopics() {
  if (typeof window === 'undefined') return [];

  try {
    const likedTopics = JSON.parse(window.localStorage.getItem(FORUM_LIKED_TOPICS_STORAGE_KEY) || '[]');
    return Array.isArray(likedTopics) ? likedTopics : [];
  } catch {
    return [];
  }
}

export function hasLikedForumTopic(topicId) {
  return getStoredLikedTopics().includes(topicId);
}

export function markForumTopicLiked(topicId) {
  const likedTopics = getStoredLikedTopics();

  if (!likedTopics.includes(topicId)) {
    window.localStorage.setItem(
      FORUM_LIKED_TOPICS_STORAGE_KEY,
      JSON.stringify([...likedTopics, topicId]),
    );
  }
}

export function subscribeToForumLikes(topicId, onChange, onError) {
  const likeRef = doc(db, FORUM_LIKES_COLLECTION, topicId);

  return onSnapshot(
    likeRef,
    (snapshot) => {
      const count = snapshot.exists() ? snapshot.data().count || 0 : 0;
      onChange(Math.max(0, count));
    },
    onError,
  );
}

export function likeForumTopic(topicId) {
  const likeRef = doc(db, FORUM_LIKES_COLLECTION, topicId);

  return setDoc(
    likeRef,
    {
      count: increment(1),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeToForumComments(topicId, onChange, onError) {
  const commentsRef = collection(db, FORUM_TOPICS_COLLECTION, topicId, 'comments');
  const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));

  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      const comments = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      onChange(comments);
    },
    onError,
  );
}

export function addForumComment(topicId, commentText, userEmail = '') {
  const trimmedComment = commentText.trim();

  if (!trimmedComment) {
    return Promise.resolve();
  }

  const commentsRef = collection(db, FORUM_TOPICS_COLLECTION, topicId, 'comments');
  const normalizedEmail = typeof userEmail === 'string' ? userEmail.trim().toLowerCase() : '';

  return addDoc(commentsRef, {
    text: trimmedComment,
    email: normalizedEmail || null,
    createdAt: serverTimestamp(),
  });
}

export function updateForumComment(topicId, commentId, commentText) {
  const trimmedComment = commentText.trim();

  if (!trimmedComment) {
    return Promise.resolve();
  }

  const commentRef = doc(db, FORUM_TOPICS_COLLECTION, topicId, 'comments', commentId);

  return updateDoc(commentRef, {
    text: trimmedComment,
    updatedAt: serverTimestamp(),
  });
}

export function deleteForumComment(topicId, commentId) {
  const commentRef = doc(db, FORUM_TOPICS_COLLECTION, topicId, 'comments', commentId);

  return deleteDoc(commentRef);
}

export function addForumInterest(topicId, email) {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail) {
    return Promise.resolve();
  }

  const interestRef = doc(db, FORUM_INTEREST_COLLECTION, `${topicId}:${trimmedEmail}`);

  return setDoc(
    interestRef,
    {
      topicId,
      email: trimmedEmail,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}
