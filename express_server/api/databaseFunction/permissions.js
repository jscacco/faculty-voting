var admin = require("firebase-admin");

var serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://faculty-voting-9ad15.firebaseio.com"
});

const firestore = admin.firestore();
const firebase = admin.firebase;
const fireauth = admin.auth();

module.exports = { firebase, firestore, fireauth, admin };