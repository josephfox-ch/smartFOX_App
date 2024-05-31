import React from "react";
import Lottie from "react-lottie";
import windAnimation from "../animations/wind.json";
import humidityAnimation from "../animations/humidity.json";
import sunriseAnimation from "../animations/sunrise.json";
import sunsetAnimation from "../animations/sunset.json";
import thermometerCelciusAnimation from "../animations/thermometer-celcius.json";

const Animation = ({ options, height, width }) => (
  <Lottie options={options} height={height} width={width} />
);

const WeatherDetail = ({ windSpeed, humidity, sunrise, sunset, outdoorTemperature }) => {
  const windOptions = {
    loop: true,
    autoplay: true,
    animationData: windAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const humidityOptions = {
    loop: true,
    autoplay: true,
    animationData: humidityAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sunriseOptions = {
    loop: true,
    autoplay: true,
    animationData: sunriseAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sunsetOptions = {
    loop: true,
    autoplay: true,
    animationData: sunsetAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const thermometerCelciusOptions = {
    loop: true,
    autoplay: true,
    animationData: thermometerCelciusAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className="flex items-center space-x-2 text-4xl font-bold">
        <Animation options={thermometerCelciusOptions} height={100} width={90} />
        {outdoorTemperature}
      </div>
      <div className="flex justify-between items-center text-lg">
        <div className="flex items-center">
          <Animation options={windOptions} height={70} width={70} />
          <p>{windSpeed} m/s</p>
        </div>
        <div className="flex items-center">
          <Animation options={humidityOptions} height={70} width={70} />
          <p>{humidity}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full text-lg">
        <div className="flex items-center">
          <Animation options={sunriseOptions} height={70} width={70} />
          <p>{sunrise}</p>
        </div>
        <div className="flex items-center">
          <Animation options={sunsetOptions} height={70} width={70} />
          <p>{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
