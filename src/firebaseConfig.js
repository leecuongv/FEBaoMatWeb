import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
    /*
    authDomain: "story-e3425.firebaseapp.com",
    projectId: "story-e3425",
    storageBucket: "story-e3425.appspot.com",
    messagingSenderId: "209959015986",
    appId: "1:209959015986:web:7960159edfaf0a8ab70e2b",
    measurementId: "G-FSH6HQ253X"
    */
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);