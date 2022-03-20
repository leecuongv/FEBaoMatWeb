import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyA0Psy4GpZ_ls5yzpspQg5q5BMdSLbVyuQ",
    authDomain: "story-e3425.firebaseapp.com",
    projectId: "story-e3425",
    storageBucket: "story-e3425.appspot.com",
    messagingSenderId: "209959015986",
    appId: "1:209959015986:web:7960159edfaf0a8ab70e2b",
    measurementId: "G-FSH6HQ253X"
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);