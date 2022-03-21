import "./App.css";
import { firebase } from "@firebase/app";
import { useEffect, useState } from "react";
import SingleOrder from "./components/SingleOrder";

require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD8s2M120Eniqu3lozRZof0cAm0TSIUdF4",
  authDomain: "learn-78a20.firebaseapp.com",
  projectId: "learn-78a20",
  storageBucket: "learn-78a20.appspot.com",
  messagingSenderId: "583048417423",
  appId: "1:583048417423:web:c70cfdb48f1fcb46b6a0fa",
};
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInsnapshots: true });
const orders = [];

function App() {
  const [allOrders, setAllOrders] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [change, setChange] = useState(false);

  const addData = () => {
    // ADD data to a collection
    db.collection("cafes")
      .add({
        name,
        city,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err) => {
        console.error("Error adding document: ", err);
      });
    setChange(true);
  };

  // GET the data from a collection
  // can't do const collection = ... because it can take some time

  const getData = () => {
    db.collection("cafes")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // get all the data from each document
          // console.log(doc.data())
          const data = {
            name: doc.data().name,
            city: doc.data().city,
          };
          orders.push(data);
        });
        setAllOrders(orders);
      });
  };

  useEffect(() => {
    console.log(1);
    getData();
  }, []);
  useEffect(() => {
    if (change) {
      getData();
      setChange(false);
    }
  }, [change]);
  return (
    <div>
      <div>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <button onClick={() => addData()}>Add</button>
      </div>
      {orders &&
        orders.map((order, i) => (
          <SingleOrder name={order.name} city={order.city} key={i} />
        ))}
    </div>
  );
}

export default App;
