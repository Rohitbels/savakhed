import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Secondary;
const config = {
	apiKey: "AIzaSyCzHYtN3HUc7uNhG15YD3hrnyiX_poQUrM",
	authDomain: "devsavakhed.firebaseapp.com",
	projectId: "devsavakhed",
	storageBucket: "devsavakhed.appspot.com",
	messagingSenderId: "774083254382",
	appId: "1:774083254382:web:b184cb1b0851be9474ae7f",
	measurementId: "G-RCY6EWCX6V",
};

// Primary
// const config = {
// 	apiKey: "AIzaSyB2MH0qD3U7aOMo7AwPz9phpxtv3K1Vl7A",
// 	authDomain: "rajgurunagarlibrary.firebaseapp.com",
// 	databaseURL: "https://rajgurunagarlibrary.firebaseio.com",
// 	projectId: "rajgurunagarlibrary",
// 	storageBucket: "rajgurunagarlibrary.appspot.com",
// 	messagingSenderId: "873976955186",
// 	appId: "1:873976955186:web:1f0b7bde7368a61cb5172b",
// };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const collection = db.collection("bookList");
// export const collection = db.collection("bookListBackUp");

export default firebase;
