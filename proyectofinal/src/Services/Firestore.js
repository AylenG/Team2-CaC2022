import { getFirestore, collection, addDoc, query, getDoc, getDocs, where, doc } from "firebase/firestore";
import { UserProfileModel } from "../Models/UserProfileModel";
import app from "./Firebase";

// 1) Initialize Firebase *ya importado desde Firebase.js //

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log("db", db);
const user = UserProfileModel;

const getDataById = async (userId) => {
  user.userId = userId;
  const doc = collection(db, "FakeFlix-Users");
  const q = query(doc, where("userId", "==", userId));
  await getDocs(q)
    .then((data) => {
      data.forEach((d) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(d.id, " => ", d.data());
      })
    });
}

const getAllData = async (userId) => {
  user.userId = userId;
  const doc = collection(db, "FakeFlix-Users");
  await getDocs(doc)
    .then((data) => {
      console.log("querySnapshot 2", data)
      data.forEach((d) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(d.id, " => ", d.data());
      })
    });

}

const updateElement = async ()=>{
  // TODO
}

const addElement = async (user) => {
  /* requiere un objeto user cumpliendo con la estructura de 
  Models/UserProfileModel
  no es necesario completar todos los campos del objeto ya que estan 
  pre seteados. el objeto user modifica solo los campos que necesiten ser modificados
  esta funcion NO es UPDATE de un campo existente
  */
  try {
    const docRef = await addDoc(collection(db, "FakeFlix-Users"), {
      ...user
    })
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { addElement, getDataById };
