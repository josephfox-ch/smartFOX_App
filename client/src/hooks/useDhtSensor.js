import { useState, useEffect } from 'react';
import { getDht22Data } from '../api/services/sensorService';

const useDhtSensor = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDhtData = async () => {
      try {
        const data = await getDht22Data();
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch DHT22 data:', err);
      }
    };

    fetchDhtData();

    const intervalId = setInterval(fetchDhtData, 120000); // Fetch data every 2 minutes (120000 ms)

    return () => clearInterval(intervalId);
  }, []);

  return { temperature, humidity, error };
};

export default useDhtSensor;
