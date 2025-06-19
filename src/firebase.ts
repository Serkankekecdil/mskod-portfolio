// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8CqmPCz6mYuHXdzr4FzOlEg2RMbKHkx8",
  authDomain: "mskod-portfolio.firebaseapp.com",
  projectId: "mskod-portfolio",
  storageBucket: "mskod-portfolio.firebasestorage.app",
  messagingSenderId: "543071816809",
  appId: "1:543071816809:web:9708b7ef8f4bef03fde6f8",
  measurementId: "G-DL9W57QM7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app; 