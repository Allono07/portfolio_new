// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0v66rpnRlf5s_TO2CxBEBPSt2CJwx2vg",
  authDomain: "portfolio-website-c899e.firebaseapp.com",
  projectId: "portfolio-website-c899e",
  storageBucket: "portfolio-website-c899e.firebasestorage.app",
  messagingSenderId: "955465981238",
  appId: "1:955465981238:web:48be745bc5c5da4107e797",
  measurementId: "G-EL2LSGW7SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (only works in browser, not SSR)
let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { analytics };