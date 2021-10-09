const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const filestream = require("fs");

// const config = {
// 	apiKey: "AIzaSyCzHYtN3HUc7uNhG15YD3hrnyiX_poQUrM",
// 	authDomain: "devsavakhed.firebaseapp.com",
// 	projectId: "devsavakhed",
// 	storageBucket: "devsavakhed.appspot.com",
// 	messagingSenderId: "774083254382",
// 	appId: "1:774083254382:web:b184cb1b0851be9474ae7f",
// 	measurementId: "G-RCY6EWCX6V",
// };

const config = {
	apiKey: "AIzaSyB2MH0qD3U7aOMo7AwPz9phpxtv3K1Vl7A",
	authDomain: "rajgurunagarlibrary.firebaseapp.com",
	databaseURL: "https://rajgurunagarlibrary.firebaseio.com",
	projectId: "rajgurunagarlibrary",
	storageBucket: "rajgurunagarlibrary.appspot.com",
	messagingSenderId: "873976955186",
	appId: "1:873976955186:web:1f0b7bde7368a61cb5172b",
};

firebase.initializeApp(config);
firebase.auth();

const db = firebase.firestore();
const collection = db.collection("bookList");

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

const logger = (type, message) => {
	return new Date().toLocaleString() + " |  " + type + ": " + message + "\n";
};

const getMulakshare = (array) => {
	let mulaksharaArray = [];

	array.forEach((word) => {
		chinha.forEach((chinh) => {
			word = word.replace(new RegExp(chinh, "g"), "");
		});
		mulaksharaArray.push(word);
	});

	return mulaksharaArray;
};
const start = 4800;
const lastDakhalId = 5000;
new Promise(async (resolve, reject) => {
	let message = logger("info", "Script has started succesfully");

//	console.log(db.collection("bookListBackUp").docs(""));

	let query = collection.where("dakhalId", ">=", start);
	query = query.where("dakhalId", "<=", lastDakhalId);
//	query = query.orderBy("dakhalId", "asc");

	try {
		let results = await query.get();
		let lastDoc = results.docs[results.docs.length - 1];

		message = logger(
			"info",
			"Count: " +
				results.docs.length +
				" Last-Doc-Dakhal-ID: " +
				lastDoc.data()["dakhalId"]
		);
		filestream.appendFileSync("log.txt", message, "utf8");

		var batch = db.batch();

		results.forEach((doc) => {
			let book = doc.data();

			message = logger(
				"info",
				doc["id"] +
					" | " +
					"Dakhal-ID: " +
					book["dakhalId"] +
					" |  Book: " +
					book["pustakName"].join(" ") +
					" |  Author: " +
					book["lekhak"].join(" ")
			);


			if (book["pustakName"] && book["lekhak"] && book['lekhakMulakshare'] === undefined) {
				console.log(message)
				filestream.appendFileSync("log.txt", message, "utf8");
				var bookRef = collection.doc(doc["id"]);
				var l_lekhakMulakshare = getMulakshare(book["lekhak"]);
				var l_pustakMulakshare = getMulakshare(book["pustakName"]);

				batch.update(bookRef, {
					lekhakMulakshare: l_lekhakMulakshare,
					pustakMulakshare: l_pustakMulakshare,
					lekhakFullName: book["lekhak"].join(" "),
					pustakFullName: book["pustakName"].join(" "),
					lekhakNameMulakshare: l_lekhakMulakshare.join(" "),
					pustakNameMulakshare: l_pustakMulakshare.join(" "),
				});
			}
		});


	await batch.commit();

	message = logger("info", `Successfully commited batch ${start}-${lastDakhalId} (I)`);
	filestream.appendFileSync("log.txt", message, "utf8");
	resolve();
} catch (error) {
		console.log("e--------",error)
		message = logger("error", error.message);
		filestream.appendFileSync("log.txt", message, "utf8");
		reject();
	}
}).then(() => {
		let message = logger("info", "Script has ended succesfully");
		filestream.appendFileSync("log.txt", message, "utf8");

		process.exit();
		return;
	})
	.catch((error) => {
		let message = logger("error", error.message);
		filestream.appendFileSync("log.txt", message, "utf8");
		process.exit();
	});
