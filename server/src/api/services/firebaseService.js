import { db } from '../../config/firebase.js';

export const getDht22Data = async () => {
  try {
    const tempSnapshot = await db.ref('/temperature').once('value');
    const humiditySnapshot = await db.ref('/humidity').once('value');

    const temperature = tempSnapshot.val();
    const humidity = humiditySnapshot.val();

    return { temperature, humidity };
  } catch (error) {
    logger.error(`Error fetching DHT22 data: ${error.message}`);
    throw new Error("Could not fetch DHT22 data");
  }
};