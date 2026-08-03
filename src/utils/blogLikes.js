import { doc, increment, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

const BLOG_LIKES_COLLECTION = 'blogLikes';

export function subscribeToBlogLikes(postId, onChange, onError) {
  const likeRef = doc(db, BLOG_LIKES_COLLECTION, postId);

  return onSnapshot(
    likeRef,
    (snapshot) => {
      const count = snapshot.exists() ? snapshot.data().count || 0 : 0;
      onChange(Math.max(0, count));
    },
    onError,
  );
}

export function likeBlogPost(postId) {
  const likeRef = doc(db, BLOG_LIKES_COLLECTION, postId);

  return setDoc(
    likeRef,
    {
      count: increment(1),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function unlikeBlogPost(postId) {
  const likeRef = doc(db, BLOG_LIKES_COLLECTION, postId);

  return setDoc(
    likeRef,
    {
      count: increment(-1),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
