import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { calculateHeatingCurveAndEnergyBalance } from "../utils/calculations";
import * as s3Service from "../api/services/s3Service";
import { useHomes } from "./HomeContext";
import { useClimate } from "./ClimateContext";
import { useWeather } from "./WeatherContext";

const CalculationContext = createContext();

export const CalculationProvider = ({ children }) => {
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
    }
  }, [climateControl, energyCertificate, outdoorTemperature, waterFlowTemperature]);

  useEffect(() => {
    performCalculations();
  }, [performCalculations]);

  return (
    <CalculationContext.Provider
      value={{
        heatingCurve,
        energyBalance,
        waterFlowTemperature,
        performCalculations,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculations = () => useContext(CalculationContext);
