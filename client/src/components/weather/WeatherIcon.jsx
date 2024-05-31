import React from "react";
import Lottie from "react-lottie";
import clearDayAnimation from "../animations/clear-day.json";
import scatteredCloudsAnimation from "../animations/scattered-clouds.json";
import rainAnimation from "../animations/rain.json";
import thunderstormAnimation from "../animations/thunderstorm.json";
import drizzleAnimation from "../animations/drizzle.json";
import brokenCloudsAnimation from "../animations/broken-clouds-day.json";
import brokenCloudsNightAnimation from "../animations/broken-clouds-night.json";

const weatherAnimations = {

  "01d": clearDayAnimation,
  "01n": clearDayAnimation,
  "03d": scatteredCloudsAnimation,
  "03n": scatteredCloudsAnimation,
  "04d": brokenCloudsAnimation,
  "04n": brokenCloudsNightAnimation,
  "09d": drizzleAnimation,
  "09n": drizzleAnimation,
  "10d": rainAnimation,
  "10n": rainAnimation,
  "11d": thunderstormAnimation,
  "11n": thunderstormAnimation,
 

};

const WeatherIcon = ({ weatherIcon }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: weatherAnimations[weatherIcon] || clearDayAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={120} width={120} />;
};

export default WeatherIcon;
