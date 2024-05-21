import React, { createContext, useState, useEffect, useContext } from "react";
import { useHomes } from "./HomeContext";
import { useClimate } from "./ClimateContext";
import { useWeather } from "./WeatherContext";
import { calculateHeatingCurve } from "../utils/heatingCalculations";
import * as s3Service from '../api/services/s3Service';

const EnergyContext = createContext();

export const EnergyProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const { climateControl } = useClimate();
  const { outdoorTemperature } = useWeather();
  const [energyCertificate, setEnergyCertificate] = useState(null);
  const [heatingCurve, setHeatingCurve] = useState(null);
  const [energyBalance, setEnergyBalance] = useState(null);
  const [waterFlowTemperature, setWaterFlowTemperature] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      setEnergyCertificate(selectedHome.EnergyCertificate);
    }
  }, [selectedHome]);

  useEffect(() => {
    const fetchWaterFlowTemperature = async () => {
      if (selectedHome) {
        try {
          const temperature = await s3Service.getWaterFlowTemperature(selectedHome.id);
          setWaterFlowTemperature(temperature);
        } catch (error) {
          console.error(`Failed to fetch water flow temperature for home with ID: ${selectedHome.id}`, error);
        }
      }
    };

    fetchWaterFlowTemperature();
  }, [selectedHome]);

  useEffect(() => {
    if (climateControl && energyCertificate && outdoorTemperature !== null && waterFlowTemperature !== null) {
      const data = {
        Te: outdoorTemperature,
        Ti: climateControl.currentTemperature,
        Tw: waterFlowTemperature, 
        G: energyCertificate.heatLossCoefficient,
        V: energyCertificate.buildingVolume,
        K: energyCertificate.heatLossCoefficient,
        Ag: 0, 
      };

      const { heatingCurve: calculatedHeatingCurve, energyBalance: calculatedEnergyBalance } = calculateHeatingCurve(data);

      setHeatingCurve(calculatedHeatingCurve);
      setEnergyBalance(calculatedEnergyBalance);
    }
  }, [climateControl, energyCertificate, outdoorTemperature, waterFlowTemperature]);

  return (
    <EnergyContext.Provider
      value={{
        energyCertificate,
        heatingCurve,
        energyBalance,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => useContext(EnergyContext);


