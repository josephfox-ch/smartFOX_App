import { db } from '../../config/firebase.js';

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
