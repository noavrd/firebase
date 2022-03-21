import './App.css';
import { firebase } from "@firebase/app";
// const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyD8s2M120Eniqu3lozRZof0cAm0TSIUdF4",
  authDomain: "learn-78a20.firebaseapp.com",
  projectId: "learn-78a20",
  storageBucket: "learn-78a20.appspot.com",
  messagingSenderId: "583048417423",
  appId: "1:583048417423:web:c70cfdb48f1fcb46b6a0fa"
};
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({timestampUnsnapshots: true});

function App() {
  
  
  const addData = () => {

    db.collection("cafes").add({
      name: "Rona Latte",
      city: "Holon",
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((err) => {
      console.error("Erroe adding document: ", err);
    });
  }

  return (
    <div>
      <button onClick={()=>addData()}>Add</button>
    </div>
   
  );
}

export default App;
