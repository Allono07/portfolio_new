export const LIKED_POSTS_STORAGE_KEY = 'kindle-liked-posts';

export function getStoredLikedPosts() {
  if (typeof window === 'undefined') return [];

  try {
    const likedPosts = JSON.parse(window.localStorage.getItem(LIKED_POSTS_STORAGE_KEY) || '[]');
    return Array.isArray(likedPosts) ? likedPosts : [];
  } catch {
    return [];
  }
}

export function storeLikedPost(postId) {
  const likedPosts = getStoredLikedPosts();

  if (!likedPosts.includes(postId)) {
    window.localStorage.setItem(
      LIKED_POSTS_STORAGE_KEY,
      JSON.stringify([...likedPosts, postId]),
    );
  }
}

export function removeLikedPost(postId) {
  const likedPosts = getStoredLikedPosts().filter((id) => id !== postId);
  window.localStorage.setItem(LIKED_POSTS_STORAGE_KEY, JSON.stringify(likedPosts));
}
