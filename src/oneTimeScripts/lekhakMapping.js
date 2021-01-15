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

//Reading Input from the CSV using csv-reader package
const Fs = require('fs');
const { format } = require('path');
const dict = { }
const dictToWrite = { }
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
    .on('end', function (data) {
        for (const [key, value] of Object.entries(dict)) {
            //-----------Uncomment for writing into CSV----------------
            //dictToWrite[key] = value.toString();              //Dict for writing to csv, has different format from our dict

            //Writing to Firebase
            const dataTemp = {
                char: key,
                names: value
            }
            if(dataTemp.char === 'r') {         //Remove condition if you want to write to firebase all characters
                db.collection('lekhakMapping').doc(dataTemp.char).set(dataTemp).then(console.log("Written to Firebase"));
                //const unionRes = await washingtonRef.update({
                //    regions: firebase.firestore.FieldValue.arrayUnion('greater_virginia')
                //});                  
            }
        }
        /*-----------Uncomment for writing into CSV----------------
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            path: 'src/oneTimeScripts/Write - संकीर्ण.csv',
            header: ['र', 'उ', 'श', 'ग', 'क', 'ज', 'म', 'भ', 'ड', 'व', 'स', 'प', 'इ', 'अ', 'आ', 'ह', 'ए', 'द', 'ब', 'न', 'ख', 'त', 'च', 'ल', 'छ', 'य', 'फ', 'ओ', 'घ', 'ध', 'ऍ', 'n', 'd']
        });
        records = [dictToWrite]
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });
        */
    });