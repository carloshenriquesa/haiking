import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4NFYezwCZRbUtCLHiFxYWkjRjDwY_3nA",
  authDomain: "trilhub-bf706.firebaseapp.com",
  projectId: "trilhub-bf706",
  storageBucket: "trilhub-bf706.firebasestorage.app",
  messagingSenderId: "150398811431",
  appId: "1:150398811431:web:a61e2cf90f009669acbd02",
  measurementId: "G-H5SV2LQNDT"
};

const app = initializeApp(firebaseConfig);

export { app };