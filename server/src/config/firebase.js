import admin from 'firebase-admin';
import dotenv from 'dotenv';


dotenv.config();

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS in .env file");
}


const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dht22-af3b2-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

export { admin, db };