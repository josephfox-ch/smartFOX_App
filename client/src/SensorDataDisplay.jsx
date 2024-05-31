import React from 'react';
import useDhtSensor from './hooks/useDhtSensor';

const SensorDataDisplay = () => {
  const { temperature, humidity, error } = useDhtSensor();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (temperature === null || humidity === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Sensor Data</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
};

export default SensorDataDisplay;
