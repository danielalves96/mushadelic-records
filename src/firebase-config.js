// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQcGfSXr1rlWTNje_idUEFAa5EwSOmI7M',
  authDomain: 'anunnaki-72274.firebaseapp.com',
  projectId: 'anunnaki-72274',
  storageBucket: 'anunnaki-72274.appspot.com',
  messagingSenderId: '900558950920',
  appId: '1:900558950920:web:5189bed70adf75dcad77bd',
  measurementId: 'G-DK1YLWC2BL',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
