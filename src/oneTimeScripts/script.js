/**
 *  To-Do:
 *  + Modifying `addDetails` to iterate through ids and add details appropriately
 *  + `IDs`, `LekhakMulakshara`, `PustakMulakshara` needs to be flushed (other method can work as well)
 */



const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const config = {
	apiKey: "AIzaSyCzHYtN3HUc7uNhG15YD3hrnyiX_poQUrM",
	authDomain: "devsavakhed.firebaseapp.com",
	projectId: "devsavakhed",
	storageBucket: "devsavakhed.appspot.com",
	messagingSenderId: "774083254382",
	appId: "1:774083254382:web:b184cb1b0851be9474ae7f",
	measurementId: "G-RCY6EWCX6V",
};

const chinha = [
	"्",
	"ा",
	"ि",
	"ी",
	"ु",
	"ू",
	"े",
	"ै",
	"ो",
	"ौ",
	"ं",
	"ॅ",
	"ॉ",
	"ः",
	"ृ",
];

firebase.initializeApp(config);

firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("bookList")
const IDs = [];
const LekhakMulakshara = [];
const PustakMulakshara = [];

setDetails = (id, pustakName, lekhakName) => {
	IDs.push(id);

	let arrayP = [];
	pustakName.forEach((word) => {
		chinha.forEach((chinh) => {
			word = word.replace(new RegExp(chinh, "g"), "");
		});
		arrayP.push(word);
	});

	let arrayL = [];
	lekhakName.forEach((word) => {
		chinha.forEach((chinh) => {
			word = word.split(chinh).join("");
		});
		arrayL.push(word);
	});
	// console.log('arrayP :',arrayP);
	LekhakMulakshara.push(arrayL);
	PustakMulakshara.push(arrayP);
};

async function addDetails(arrayL, arrayP, id) {
	const cityRef = db.collection("bookList").doc(id);
	const res = await cityRef.update({
		lekhakMulakshare: arrayL,
		pustakMulakshare: arrayP,
		lekhakNameMulakshare: arrayL.join(" "),
	});
	console.log("details added");
}

async function run() {

	// Getting inital docs (can be optimised to be inside the while loop)
	let snapshot = await docRef.limit(3).get().catch((e) => console.log(e))

	// For first iteration last is set to first doc in snapshot
	let last = snapshot.docs[0]

	try {
		while (true) {
			
			// Getting `5` snapshots starting after last, alternative being `startAt` 
			snapshot = await docRef.limit(5).startAfter(last).get().catch((e) => console.log(e))
			
			// Setting details for each doc in snapshot
			snapshot.forEach((doc) => {
				console.log(doc.data()['dakhalId']);
				setDetails(doc["id"], doc.data()["pustakName"], doc.data()["lekhak"]);
			})

			// Setting `last` to last snapshot doc
			last = snapshot.docs[snapshot.docs.length - 1]

			// Adds entries to database (hardcoded values for testing)
			await addDetails(["123"], ["test"], "123test");

		}
	} catch (error) {
		console.log(LekhakMulakshara);
		console.log(PustakMulakshara);
		console.log("stopped");	
		console.log(error);
	}
	
}


run()