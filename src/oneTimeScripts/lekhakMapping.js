const Fs = require('fs');
const { format } = require('path');


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


const honorifics = ['श्री', 'सौ', 'प्रा', 'ऍड', 'डॉ', 'सीए', 'अनु', 'dr', 'संग्रा'/*row 92*/, 'प्रो', 'संपा'/*4 word arrays*/, 'आचार्य', 'कॅ', 'संक', 'कौ', 'स्वा', 'गुरु', 'कै', 'पं', 'ऍडव्होकेट'];    //

//Return String of lekhakName after removing honorifics from array.
function csvArrayToString(csvString) {
    let array = csvString.split(',');
    let i, j;
    for(i = 0; i < array.length; i++) {
        for(j = 0; j < honorifics.length; j++) {
            if(array[i] === honorifics[j]) {
                array.splice(i, 1);
                i--;
            }
        }
    }
    let string = array.join(" ");
    //if(array.length > 3)
    //    console.log('A row arrived: ', string, count);
    return string;
}

const CsvReadableStream = require('csv-reader');
let inputStream = Fs.createReadStream('src/oneTimeScripts/Recheck - संकीर्ण.csv', 'utf8'); 

const dict = {

}
const dictToWrite = {

}

let count = 0;
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        
        count++;
        let firstChar = csvArrayToString(row[0])[0];

        if(dict[firstChar] && dict[firstChar].length) {
            if(dict[firstChar].indexOf(csvArrayToString(row[0])) === -1)
                dict[firstChar].push(csvArrayToString(row[0]));
                //dict[firstChar].push(csvArrayToString(row[0]));
        } 
        else {
            dict[firstChar] = [csvArrayToString(row[0])]
        }

    })
    .on('end', function (data) {
        //console.log(Object.keys(dict));
        
        for (const [key, value] of Object.entries(dict)) {

            dictToWrite[key] = value.toString();              //Dict for writing csv
            //console.log(key + " " + value.length);
            const dataTemp = {
                char: key,
                names: value
            }
            //console.log(dataTemp.char, dataTemp.names.length);
            if(dataTemp.char === 'r') {         //Remove condition if you want to write to firebase all characters
                db.collection('lekhakMapping').doc(dataTemp.char).set(dataTemp).then(console.log("Written to Firebase"));
            }
        }
        //console.log(dictToWrite);

        /*
        //Writing to CSV File
        console.log("Start write");

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
        //CSV Writer end
        */
        
    });

//head : ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ऌ', 'ऍ', 'ऎ', 'ए', 'ऐ', 'ऑ', 'ऒ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'ऩ', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ऱ', 'ल', 'ळ', 'ऴ', 'व', 'श', 'ष', 'स', 'ह', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']