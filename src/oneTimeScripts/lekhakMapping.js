//Firebase Setup
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
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
const auth = firebase.auth();
const db = firebase.firestore();


//Function to convert given array of strings to a proper string after removing honorifics.
const honorifics = ['श्री', 'सौ', 'प्रा', 'ऍड', 'डॉ', 'सीए', 'अनु', 'dr', 'संग्रा', 'प्रो', 'संपा', 'आचार्य', 'कॅ', 'संक', 'कौ', 'स्वा', 'गुरु', 'कै', 'पं', 'ऍडव्होकेट'];
function csvArrayToString(csvString) {
    let array = csvString.split(',');
    let i, j;

    for(i = 0; i < array.length; i++) {             //For each word in array
        for(j = 0; j < honorifics.length; j++) {    //Check each honorific present
            if(array[i] === honorifics[j]) {
                array.splice(i, 1);
                if(i >= array.length)               //i'th element was deleted
                    break;                          //If no next element, break
                else
                    j = 0;                          //Start from first honorific again for new word present at 'i'th location in array of words
            }
        }
    }
    let string = array.join(" ");
    return string;
}


//Create empty docs of all chars at start.
const allChars = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ऌ', 'ऍ', 'ऎ', 'ए', 'ऐ', 'ऑ', 'ऒ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'ऩ', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ऱ', 'ल', 'ळ', 'ऴ', 'व', 'श', 'ष', 'स', 'ह', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
async function createAllCharDocuments() {
    for(let l = 0; l < allChars.length; l++) {
        const dataTemp = {
            char : allChars[l],
            names : []
        }
        const doc = await db.collection('lekhakMapping').doc(dataTemp.char).get();   
        if (!doc.exists) {
            const setRes = await db.collection('lekhakMapping').doc(dataTemp.char).set(dataTemp);
        } 
    }
}   //Tested : Declares names as an array too.


//Writing to a CSV File
async function writeToCSV(dict) {
    const dictToWrite = { };
    head = [];
    for (const [key, value] of Object.entries(dict)) {
        dictToWrite[key] = value.toString();              //Dict for writing to csv, has different format from dict for firebase
        head.push(key);
    }
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'src/oneTimeScripts/Write trials.csv',
        header: head
    });
    records = [dictToWrite]
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('Done writing to CSV');
        });

}


//Writing to Firebase
async function writeToFirebase(dict) {
    for (const [key, value] of Object.entries(dict)) {
        //Writing to Firebase
        //if(key === 'l')            //Remove condition if you want to write to firebase all characters
            for(let k = 0; k < value.length; k++) {
                const unionRes = await db.collection('lekhakMapping').doc(key).update({
                    names: firebase.firestore.FieldValue.arrayUnion(value[k])
                });
            }
        
    }
}


//Main Body
async function main() {
    //Run when new database started
    //await createAllCharDocuments();

    //Reading Input from the CSV using csv-reader package
    const Fs = require('fs');
    const { format } = require('path');
    const dict = { };
    const CsvReadableStream = require('csv-reader');
    let inputStream = Fs.createReadStream('src/oneTimeScripts/Recheck - संकीर्ण.csv', 'utf8');
    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            let nameString = csvArrayToString(row[0]);
            let firstChar = nameString[0];
            if(dict[firstChar] && dict[firstChar].length) {
                if(dict[firstChar].indexOf(nameString) === -1)
                    dict[firstChar].push(nameString);
            } 
            else {
                dict[firstChar] = [nameString];
            }
        })
        .on('end', async function(data) {
            
            //Uncomment to write to Firebase
            writeToFirebase(dict);

            //Uncomment to write to CSV
            //writeToCSV(dict);
        })
    return;
}

main();