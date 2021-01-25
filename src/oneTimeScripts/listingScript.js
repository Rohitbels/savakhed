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

firebase.initializeApp(config);
firebase.auth();

const db = firebase.firestore();

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

let dbEntries = new Map();

const logger = (type, message) => {
	console.log(new Date().toLocaleString() + " |  " + type + ": " + message);
};

setDetails = (id, pustakName, lekhakName, dakhalId) => {
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

	dbEntries.set(dakhalId, {
		docId: id,
		lekhakMulakshare: arrayL,
		pustakMulakshare: arrayP,
		lekhakFullName: lekhakName.join(" "),
	});
};

async function addDetails(
	lekhakMulakshare,
	pustakMulakshare,
	lekhakFullName,
	id
) {
	const cityRef = db.collection("bookList").doc(id);
	const res = await cityRef
		.update({
			lekhakMulakshare: lekhakMulakshare,
			pustakMulakshare: pustakMulakshare,
			lekhakFullName: lekhakFullName,
			lekhakNameMulakshare: lekhakMulakshare.join(" "),
		})
		.then(() =>
			logger(
				"info",
				"Entry added for Dakhal-ID: " +
					doc["id"].dakhalId +
					",  Document-ID: " +
					doc["id"]
			)
		);
}

new Promise((resolve, reject) => {
	logger("info", "Script has started succesfully");

	db.collection("bookList")
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				let book = doc.data();
				if (book["pustakName"] && book["lekhak"]) {
					setDetails(
						doc["id"],
						book["pustakName"],
						book["lekhak"],
						book["dakhalId"]
					);
				}
			});

			dbEntries = new Map([...dbEntries.entries()].sort());
			console.log(dbEntries.entries());

			resolve();
			reject();
		})
		.catch((error) => console.error(error));
}).then(() => {
	// addDetails(LekhakMulakshara[0], PustakMulakshara[0], IDs[0]);
});
