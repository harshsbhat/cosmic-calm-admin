import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, deleteDoc, doc, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAkAtmGybpUh1AljmwLH3J0Ye3hwvWcVwE",
    authDomain: "cosmic-calm.firebaseapp.com",
    projectId: "cosmic-calm",
    storageBucket: "cosmic-calm.appspot.com",
    messagingSenderId: "229859945766",
    appId: "1:229859945766:web:1c3708c79677dcc072a5e7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {addDoc, db, getDocs, deleteDoc, doc, collection };
