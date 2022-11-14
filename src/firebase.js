// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBURf7r3WeOx-ehxHYNblG2CuM5oE3iu-Y",
  authDomain: "webengagetest-991eb.firebaseapp.com",
  projectId: "webengagetest-991eb",
  storageBucket: "webengagetest-991eb.appspot.com",
  messagingSenderId: "134292863685",
  appId: "1:134292863685:web:9ff1a35ca7c441b970ceac",
  measurementId: "G-9NC7BW11XT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);