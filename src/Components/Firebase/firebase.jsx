import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD3p-pd-bN9YvZfJdK48u3UGAl4z6wiTcw",
    authDomain: "ngoshub-17357.firebaseapp.com",
    projectId: "ngoshub-17357",
    storageBucket: "ngoshub-17357.appspot.com",
    messagingSenderId: "719850233180",
    appId: "1:719850233180:web:5677b1dd040a1e7a5fb599",
    databaseURL:"https://ngoshub-17357-default-rtdb.firebaseio.com",
  };

  export const app = initializeApp(firebaseConfig);
  export const imgDb=getStorage(app);
  export const txtDb=getFirestore(app);

  