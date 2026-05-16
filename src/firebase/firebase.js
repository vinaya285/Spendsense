import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCIkTQxVZdXPpUMqzN-IRO2v2pLjRVYsAM",

  authDomain: "spendsenseai-706e8.firebaseapp.com",

  projectId: "spendsenseai-706e8",

  storageBucket: "spendsenseai-706e8.firebasestorage.app",

  messagingSenderId: "183478112743",

  appId: "1:183478112743:web:0f27bdf34ef37f16922d42"

};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
