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

const logger = (type, message) => {
	console.log(new Date().toLocaleString() + " |  " + type + ": " + message);
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

new Promise((resolve, reject) => {
	logger("info", "Script has started succesfully");

	let query = db.collection("bookList");
	query = query.where("dakhalId", ">", 100);
	query = query.where("dakhalId", "<", 200);
	query = query.orderBy("dakhalId", "asc");

	query
		.limit(100)
		.get()
		.then((snapshot) => {
			var batch = db.batch();

			snapshot.forEach((doc) => {
				let book = doc.data();

				if (book["pustakName"] && book["lekhak"]) {
					var bookRef = db.collection("bookList").doc(doc["id"]);
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
			logger("info", "Successfully created batch 0-100");
			batch.commit();
			logger("info", "Successfully commited batch 0-100");
		})
		.catch((error) => logger("error", error.message));

	resolve();
	reject();
})
	.then(() => logger("info", "Script ended successfully"))
	.catch((error) => logger("error", error.message));
