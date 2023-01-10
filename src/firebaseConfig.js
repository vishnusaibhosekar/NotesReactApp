import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOhoxog1VEoeQIpKWlkgZBLNKempmT4DU",
  authDomain: "notes-app-40b02.firebaseapp.com",
  projectId: "notes-app-40b02",
  storageBucket: "notes-app-40b02.appspot.com",
  messagingSenderId: "839183819110",
  appId: "1:839183819110:web:09b29a2ef4bd602c2ca8a7"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
