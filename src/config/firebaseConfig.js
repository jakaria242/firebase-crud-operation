import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCi50MiYEqMNTFqrEHQxL7ctydrD024kn4",
    authDomain: "mern2305-fc3f2.firebaseapp.com",
    projectId: "mern2305-fc3f2",
    storageBucket: "mern2305-fc3f2.appspot.com",
    messagingSenderId: "394832111307",
    appId: "1:394832111307:web:7cb2811d716191c5ff1d4e"
  };

  const app = initializeApp(firebaseConfig);
  export default firebaseConfig