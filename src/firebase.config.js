
import { getApp, getApps, initializeApp, } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDDVVBey1mxg7PUyoXHxVK0MkwwrJTcC3I",
  authDomain: "nutech-test-5de06.firebaseapp.com",
  projectId: "nutech-test-5de06",
  storageBucket: "nutech-test-5de06.appspot.com",
  messagingSenderId: "58022431177",
  appId: "1:58022431177:web:7531c593e8089e3a3a8018",
  measurementId: "G-TZWDWRVGM0"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
