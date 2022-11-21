import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8Z3OLRQjJomF5fLls_4dD5Fv6ylFQqiE",
    authDomain: "todo-list-2b9fc.firebaseapp.com",
    databaseURL: "https://todo-list-2b9fc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-list-2b9fc",
    storageBucket: "todo-list-2b9fc.appspot.com",
    messagingSenderId: "359157744616",
    appId: "1:359157744616:web:04bfe8c6f637a86afeda5d",
    storageBucket: 'gs://todo-list-2b9fc.appspot.com'
};
  
const app = initializeApp(firebaseConfig);

export const firestore  = getFirestore(app);

