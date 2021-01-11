const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const honorifics = ['श्री', 'सौ', 'प्रा', 'ऍड', 'डॉ', 'सीए', 'अनु', 'dr', 'संग्रा'/*row 92*/, 'प्रो', 'संपा'/*4 word arrays*/, 'आचार्य', 'कॅ', 'संक', 'कौ', 'स्वा', 'गुरु', 'कै', 'पं'];    //

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

let inputStream = Fs.createReadStream('One Time Scripts/Recheck - संकीर्ण.csv', 'utf8');
 
const dict = {

}

let count = 0;
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        
        count++;
        if(dict[row[0][0]] && dict[row[0][0]].length) {
            if(dict[row[0][0]].indexOf(row[0]) === -1)
                dict[row[0][0]].push(csvArrayToString(row[0]));
                //dict[row[0][0]].push(row[0]);
        } 
        else {
            dict[row[0][0]] = [csvArrayToString(row[0])]
        }

    })
    .on('end', function (data) {
        console.log(Object.keys(dict));
    });

