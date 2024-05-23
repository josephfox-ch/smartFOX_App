import React, { createContext, useState, useEffect, useContext } from "react";
import { useHomes } from "./HomeContext";
import { useClimate } from "./ClimateContext";
import { useWeather } from "./WeatherContext";
import { calculateHeatingCurveAndEnergyBalance } from "../utils/calculations";
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
          setWaterFlowTemperature(parseFloat(temperature));
        } catch (error) {
          console.error(`Failed to fetch water flow temperature for home with ID: ${selectedHome.id}`, error);
        }
      }
    };
  
    fetchWaterFlowTemperature();
  }, [selectedHome]);
  
  useEffect(() => {
    if (
      climateControl && 
      energyCertificate && 
      outdoorTemperature !== null && 
      waterFlowTemperature !== null
    ) {
      const data = {
        Te: parseFloat(outdoorTemperature),
        Ti: parseFloat(climateControl.currentTemperature),
        Tc: parseFloat(climateControl.desiredTemperature),
        Tw: parseFloat(waterFlowTemperature), 
        G: parseFloat(energyCertificate.globalHeatLossCoefficient),
        V: parseFloat(energyCertificate.volumeOfHeatedZone),
        K: parseFloat(energyCertificate.heatEmissionCoefficient),
        Ag: parseFloat(energyCertificate.freeHeatGains), 
      };
  
      const { heatingCurve: calculatedHeatingCurve, energyBalance: calculatedEnergyBalance } = calculateHeatingCurveAndEnergyBalance(data);

      console.log(data);
  
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


