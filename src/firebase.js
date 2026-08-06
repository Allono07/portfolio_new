// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== 'undefined') {
  console.debug('Firebase config loaded', {
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId,
    origin: window.location.origin,
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const POPUP_FALLBACK_CODES = new Set([
  'auth/popup-blocked',
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
]);

export async function signInWithGoogle() {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (POPUP_FALLBACK_CODES.has(error?.code)) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }

    throw error;
  }
}

export async function completeGoogleRedirectSignIn() {
  return getRedirectResult(auth);
}

// Analytics (only works in browser, not SSR)
let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

export function initGtag() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  if (window.gtag) {
    return; // already initialized
  }

  // Delay GA script loading until browser is idle (performance optimization)
  const scheduleGtagLoad = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGtagScript(), { timeout: 3000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(loadGtagScript, 2000);
    }
  };

  function loadGtagScript() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }

  // Load gtag after page is interactive but don't block rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleGtagLoad);
  } else {
    scheduleGtagLoad();
  }
}

export { analytics, auth, db, googleProvider, signOut };
