import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccount)) {
  throw new Error('Service account key file not found: ' + serviceAccount);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dht22-af3b2-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database();

export const getDht22Data = async (req, res) => {
  try {
    const tempSnapshot = await db.ref('/temperature').once('value');
    const humiditySnapshot = await db.ref('/humidity').once('value');

    const temperature = tempSnapshot.val();
    const humidity = humiditySnapshot.val();

    res.json({ temperature, humidity });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
