//Firebase Setup
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
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
const auth = firebase.auth();
const db = firebase.firestore();
const collection = db.collection("bookListBackUp");

//Function to convert csvArray to a proper string after removing honorifics.
const honorifics = [
	"श्री",
	"सौ",
	"प्रा",
	"ऍड",
	"डॉ",
	"सीए",
	"अनु",
	"dr",
	"संग्रा",
	"प्रो",
	"संपा",
	"आचार्य",
	"कॅ",
	"संक",
	"कौ",
	"स्वा",
	"गुरु",
	"कै",
	"पं",
	"ऍडव्होकेट",
];
function csvArrayRemoveHonorifics(csvString) {
	let array = csvString.split(",");
	let i, j;

	for (i = 0; i < array.length; i++) {
		//For each word in array
		for (j = 0; j < honorifics.length; j++) {
			//Check each honorific present
			if (array[i] === honorifics[j]) {
				array.splice(i, 1);
				if (i >= array.length)
					//i'th element was deleted
					break;
				//If no next element, break
				else j = 0; //Start from first honorific again for new word present at 'i'th location in array of words
			}
		}
	}
	let string = array.join(" ");
	return string;
}

//Just convert the csvArray to string, with honorifics
function csvArrayToString(csvString) {
	let array = csvString.split(",");
	let string = array.join(" ");
	return string;
}

//Writing to a CSV File
async function writeToCSV(dict) {
	//console.log("Writing to CSV.");
	const dictToWrite = {};
	head = [];
	for (const [key, value] of Object.entries(dict)) {
		dictToWrite[key] = value.toString(); //Dict for writing to csv, has different format from dict for firebase
		head.push(key);
	}
	const createCsvWriter = require("csv-writer").createObjectCsvWriter;
	const csvWriter = createCsvWriter({
		path: "src/oneTimeScripts/Write trials.csv",
		header: head,
	});
	records = [dictToWrite];
	csvWriter
		.writeRecords(records) // returns a promise
		.then(() => {
			console.log("Done writing to CSV");
		});
}

//Create empty docs of all chars at start.
const allChars = [
	"अ",
	"आ",
	"इ",
	"ई",
	"उ",
	"ऊ",
	"ऋ",
	"ऌ",
	"ऍ",
	"ऎ",
	"ए",
	"ऐ",
	"ऑ",
	"ऒ",
	"ओ",
	"औ",
	"क",
	"ख",
	"ग",
	"घ",
	"ङ",
	"च",
	"छ",
	"ज",
	"झ",
	"ञ",
	"ट",
	"ठ",
	"ड",
	"ढ",
	"ण",
	"त",
	"थ",
	"द",
	"ध",
	"न",
	"ऩ",
	"प",
	"फ",
	"ब",
	"भ",
	"म",
	"य",
	"र",
	"ऱ",
	"ल",
	"ळ",
	"ऴ",
	"व",
	"श",
	"ष",
	"स",
	"ह",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
async function createAllCharDocuments(collectionName) {
	//console.log("Creating empty docs in firebase for all chars.");
	for (let l = 0; l < allChars.length; l++) {
		const dataTemp = {
			char: allChars[l],
			names: {},
		};
		const doc = await db
			.collection(collectionName)
			.doc(dataTemp.char)
			.get();
		if (!doc.exists) {
			const setRes = await db
				.collection(collectionName)
				.doc(dataTemp.char)
				.set(dataTemp);
		}
	}
}

//Remove lekhaks below threshold
function removeUnpopular(dict, threshold) {
	for (const [key, value] of Object.entries(dict)) {
		for (const [inKey, inValue] of Object.entries(value)) {
			if (inValue < 5) {
				delete dict[key][inKey];
			}
			//console.log(inKey, inValue);
		}
	}
	return dict;
}

//Writing to Firebase
async function writeToFirebase(dict, collectionName) {
	//console.log("Writing to Firebase.");
	for (const [key, value] of Object.entries(dict)) {
		const writeRes = await db
			.collection(collectionName)
			.doc(key)
			.update({
				names: value,
			})
			.then(function () {
				console.log("Written to new collection in Firebase.");
			});
	}
	console.log("Firebase Collection Updated.");
}

//Trial with recd data.
async function passDictToFun(dict) {
	for (const [key, value] of Object.entries(dict)) {
		if (key === "ज") {
			const writeRes = await db
				.collection("newMappingTrial")
				.doc(key)
				.update({
					names: value,
				})
				.then(function () {
					console.log(
						"Written to new collection in Firebase from trial function."
					);
				});
			for (const [inKey, inValue] of Object.entries(value)) {
				console.log(inKey, inValue);
			}
		}
	}
}

//Main Body
async function main() {
	//Uncomment & Run only when new database or collection to be set up
	// await createAllCharDocuments("newMappingTrial"); //Pass Collection Name as Parameter

	//Reading Input from the CSV using csv-reader package
	const Fs = require("fs");
	const { format } = require("path");
	let dict = {};
	const CsvReadableStream = require("csv-reader");
	let count = 0;
	let inputStream = Fs.createReadStream(
		"src/oneTimeScripts/test.csv",
		"utf8"
	);
	inputStream
		.pipe(
			new CsvReadableStream({
				parseNumbers: true,
				parseBooleans: true,
				trim: true,
			})
		)
		.on("data", function (row) {
			count++;
			if (count % 100 === 0) console.log(count);
			let nameString = csvArrayToString(row[0]);
			let firstChar = csvArrayRemoveHonorifics(row[0])[0];

			if (!dict) dict = {};
			if (dict[firstChar]) {
				if (dict[firstChar][nameString]) {
					dict[firstChar][nameString]++;
				} else {
					dict[firstChar][nameString] = 1;
				}
			} else {
				dict[firstChar] = {};
				dict[firstChar][nameString] = 1;
			}
		})
		.on("end", async function (data) {
			console.log("Entered on end section.");

			//Remove Lekhaks below Threshold
			dict = removeUnpopular(dict, 5);

			//Uncomment to write to Firebase
			// writeToFirebase(dict, "newMappingTrial");

			//Uncomment to write to CSV
			// writeToCSV(dict);

			//Function for Trials, writing to firebase for single char.
			passDictToFun(dict);
		});
	console.log("Stop the script now if it is still running.");
	return;
}

main();
