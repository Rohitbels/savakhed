const packageDetails = require("./../package.json");

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

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
	console.log(arrayP);
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
}

new Promise((resolve, reject) => {
	db.collection("bookList")
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				let book = doc.data();
				setDetails(doc["id"], book["pustakName"], book["lekhak"]);
			});

			console.log("details are set");

			resolve();
			reject();
		})
		.catch((error) => console.error(error));
}).then(() => {
	// addDetails(LekhakMulakshara[0], PustakMulakshara[0], IDs[0]);
});
