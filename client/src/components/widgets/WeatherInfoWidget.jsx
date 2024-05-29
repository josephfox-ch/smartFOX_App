import React from "react";
import { useWeather } from "../../context/WeatherContext";
import { FaTemperatureHigh } from "react-icons/fa";
import Lottie from "react-lottie";
import clearDayAnimation from "../animations/clear-day.json";
import scatteredCloudsAnimation from "../animations/scattered-clouds.json";
import humidityAnimation from "../animations/humidity.json";
import windAnimation from "../animations/wind.json";
import sunriseAnimation from "../animations/sunrise.json";
import sunsetAnimation from "../animations/sunset.json";
import thermometerCelciusAnimation from "../animations/thermometer-celcius.json";

const WeatherInfoWidget = () => {
  const {
    outdoorTemperature,
    windSpeed,
    humidity,
    weatherDescription,
    weatherIcon,
    sunrise,
    sunset,
  } = useWeather();

  if (outdoorTemperature === null) {
    return <div>Loading...</div>;
  }

  const weatherAnimations = {
    "01d": clearDayAnimation,
    "03d": scatteredCloudsAnimation,
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: weatherAnimations[weatherIcon] || clearDayAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const windOptions = {
    loop: true,
    autoplay: true,
    animationData: windAnimation,
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

  const humidityOptions = {
    loop: true,
    autoplay: true,
    animationData: humidityAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },

  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow-lg flex flex-col items-center text-white transition-transform transform hover:scale-105 h-full">
      <div className="flex items-center justify-between space-x-3 mb-4">
        <Lottie options={defaultOptions} height={120} width={120} />
        <div>
          <p className="text-2xl font-semibold">{weatherDescription}</p>
        </div>
        <div className="flex items-center space-x-2 text-4xl font-bold">
        <Lottie options={thermometerCelciusOptions} height={100} width={90} />
        {outdoorTemperature}
      </div>
      </div>
    
      <div className="flex justify-between items-center w-full text-lg">
        <div className="flex  items-center">
        <Lottie options={windOptions} height={70} width={70} />
          <p>{windSpeed} m/s</p>
        </div>
        <div className="flex  items-center">
          <Lottie
            options={humidityOptions}
            height={70}
            width={70}
            className="mb-2"
          />
          <p>{humidity}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full text-lg mt-4">
        <div className="flex items-center">
        <Lottie
            options={sunriseOptions}
            height={70}
            width={70}
            className="mb-2"
          />
          <p>{sunrise}</p>
        </div>
        <div className="flex items-center">
          <Lottie
            options={sunsetOptions}
            height={70}
            width={70}
            className="mb-2"/>
          <p>{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WeatherInfoWidget);
