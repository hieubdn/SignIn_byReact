// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBPoYPl1Gtc3bHZsMCM_c6BkDYMgtu8T4",
  authDomain: "logingg-80631.firebaseapp.com",
  projectId: "logingg-80631",
  storageBucket: "logingg-80631.appspot.com",
  messagingSenderId: "381332090322",
  appId: "1:381332090322:web:a6cdda7bed58cc51ab6c0b",
  measurementId: "G-SM665ZG1SW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const zaloProvider = new OAuthProvider('zalo.com');

export { auth, facebookProvider, zaloProvider };
