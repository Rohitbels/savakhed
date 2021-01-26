// 														||श्री||

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
const docRef = db.collection("bookList");
const IDs = [];
const LekhakMulakshara = [];
const PustakMulakshara = [];

const logger = (type, message) => {
	console.log(new Date().toLocaleString() + " |  " + type + ": " + message);
};

setDetails = (id, pustakName, lekhakName, dakhalId) => {
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
	LekhakMulakshara.push(arrayL);
	PustakMulakshara.push(arrayP);

	logger(
		"info",
		"Details set for Document-ID: " +
			id +
			", Dakhal-ID: " +
			dakhalId +	
			", PustakName: " +
			pustakName.join(" ") +
			", LekhakName: " +
			lekhakName.join(" ")
	);
};

async function addDetails(arrayL, arrayP, id) {
	const cityRef = db.collection("bookList").doc(id);
	const res = await cityRef.update({
		lekhakMulakshare: arrayL,
		pustakMulakshare: arrayP,
		lekhakNameMulakshare: arrayL.join(" "),
	});

	logger("info", "Details added");
}

async function run() {
	// Getting inital docs (can be optimised to be inside the while loop)
	let snapshot = await docRef
		.limit(3)
		.get()
		.catch((error) => logger("error", error));

	// For first iteration last is set to first doc in snapshot
	let last = snapshot.docs[0];

	try {
		while (true) {
			// Getting `5` snapshots starting after last, alternative being `startAt`
			snapshot = await docRef
				.limit(5)
				.startAfter(last)
				.get()
				.catch((error) => logger("error", "Script ended!"));

			// Setting details for each doc in snapshot
			snapshot.forEach((doc) => {
				setDetails(
					doc["id"],
					doc.data()["pustakName"],
					doc.data()["lekhak"],
					doc.data()["dakhalId"]
				);
			});

			// Setting `last` to last snapshot doc
			last = snapshot.docs[snapshot.docs.length - 1];


			// Adds entries to database (hardcoded values for testing)
			IDs.forEach((index) => {

			})
			for (i = 0; i < 3; i++) {
				await addDetails(
					LekhakMulakshara[i],
					PustakMulakshara[i],
					IDs[i]
				);
			}
		}
	} catch (error) {
		logger("Lekhak Mulakshara", LekhakMulakshara);
		logger("Pustak Mulakshara", PustakMulakshara);
		logger("error", error);
		logger("error", "Script ended!");
	}
}

run();
