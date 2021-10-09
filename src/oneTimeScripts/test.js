const { firestore } = require("firebase-admin");
var admin = require("firebase-admin");

var serviceAccount = require("./rajgurunagarlibrary-firebase-adminsdk-3vky0-b99f62ae0b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rajgurunagarlibrary.firebaseio.com"
});

const test = async function(){

    try {


    let bulkWriter = admin.firestore().bulkWriter();

    const ref = firestore().doc('bookList/001VW5vHRD0mAVSYMhlv')
    bulkWriter.update(ref, {foo: 'bar'});
    await bulkWriter.close().then(() => {
      console.log('Executed all writes');
    });
}catch(e){
    console.log(e)
}
}


test();