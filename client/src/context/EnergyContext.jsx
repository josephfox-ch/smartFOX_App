import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { calculateHeatingCurveAndEnergyBalance } from "../utils/calculations";
import * as s3Service from "../api/services/s3Service";
import { useHomes } from "./HomeContext";
import { useClimate } from "./ClimateContext";
import { useWeather } from "./WeatherContext";

const EnergyContext = createContext();

export const EnergyProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const { climateControl } = useClimate();
  const { outdoorTemperature } = useWeather();
  const [energyCertificate, setEnergyCertificate] = useState(null);
  const [heatingCurve, setHeatingCurve] = useState("N/A");
  const [energyBalance, setEnergyBalance] = useState("N/A");
  const [waterFlowTemperature, setWaterFlowTemperature] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      setEnergyCertificate(selectedHome.EnergyCertificate);
    }
  }, [selectedHome]);

  const fetchWaterFlowTemperature = useCallback(async () => {
    if (selectedHome) {
      try {
        const temperature = await s3Service.getWaterFlowTemperature(selectedHome.id);
        setWaterFlowTemperature(parseFloat(temperature));
      } catch (error) {
        console.error(`Failed to fetch water flow temperature for home with ID: ${selectedHome.id}`, error);
      }
    }
  }, [selectedHome]);

  useEffect(() => {
    fetchWaterFlowTemperature();
  }, [fetchWaterFlowTemperature]);

  const performCalculations = useCallback(() => {
    if (
      climateControl &&
      climateControl.status === 'on' && // Only perform calculations when the heating system is on
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

      setHeatingCurve(calculatedHeatingCurve);
      setEnergyBalance(calculatedEnergyBalance);
    } else {
      setHeatingCurve("N/A");
      setEnergyBalance("N/A");
    }
  }, [climateControl, energyCertificate, outdoorTemperature, waterFlowTemperature]);

  useEffect(() => {
    performCalculations();
  }, [performCalculations]);

  return (
    <EnergyContext.Provider
      value={{
        heatingCurve,
        setHeatingCurve,
        energyBalance,
        setEnergyBalance,
        waterFlowTemperature,
        performCalculations,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => useContext(EnergyContext);


