// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDazEswnOTR8uXle45Iwzv7CI9GzFi5Pfo",
    authDomain: "bangorder-db7d2.firebaseapp.com",
    databaseURL: "https://bangorder-db7d2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bangorder-db7d2",
    storageBucket: "bangorder-db7d2.appspot.com",
    messagingSenderId: "652535089659",
    appId: "1:652535089659:web:23028604d33540a866e35e",
    measurementId: "G-ZBD9R5R547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;