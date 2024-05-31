import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as s3Service from "../api/services/s3Service";
import { useHomes } from "./HomeContext";
import { useClimate } from "./ClimateContext";
import { useWeather } from "./WeatherContext";
import {
  calculateHeatingEnergy,
  calculateEnergyRequirementToTarget,
  calculateWaterTargetTemperatureToReachTargetTemp,
  calculateFuelConsumptionToReachTargetTemp,
  calculateEnergyBalance,
} from "../utils/calculations";

const EnergyContext = createContext();

export const EnergyProvider = ({ children }) => {
  const { selectedHome } = useHomes();
  const { climateControl } = useClimate();
  const { outdoorTemperature } = useWeather();
  const [energyCertificate, setEnergyCertificate] = useState(null);
  const [heatingCurve, setHeatingCurve] = useState("N/A");
  const [energyBalance, setEnergyBalance] = useState("N/A");
  const [energyRequirementToTarget, setEnergyRequirementToTarget] =
    useState("N/A");
  const [fuelConsumptionToTarget, setFuelConsumptionToTarget] = useState("N/A");
  const [waterFlowTemperature, setWaterFlowTemperature] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      setEnergyCertificate(selectedHome.EnergyCertificate);
    }
  }, [selectedHome]);

  const fetchWaterFlowTemperature = useCallback(async () => {
    if (selectedHome) {
      try {
        const temperature = await s3Service.getWaterFlowTemperature(
          selectedHome.id
        );
        setWaterFlowTemperature(parseFloat(temperature));
      } catch (error) {
        console.error(
          `Failed to fetch water flow temperature for home with ID: ${selectedHome.id}`,
          error
        );
      }
    }
  }, [selectedHome]);

  useEffect(() => {
    fetchWaterFlowTemperature();
  }, [fetchWaterFlowTemperature]);

  const performCalculations = useCallback(() => {
    if (
      climateControl &&
      climateControl.status === "on" &&
      energyCertificate &&
      outdoorTemperature !== null &&
      waterFlowTemperature !== null
    ) {
      const data = {
        Te: parseFloat(outdoorTemperature),
        Ti: parseFloat(climateControl.currentTemperature),
        Tc: parseFloat(climateControl.desiredTemperature),
        Tw: parseFloat(waterFlowTemperature),
        wallArea: parseFloat(energyCertificate.wallArea),
        wallUValue: parseFloat(energyCertificate.wallUValue),
        windowArea: parseFloat(energyCertificate.windowArea),
        windowUValue: parseFloat(energyCertificate.windowUValue),
        boilerEfficiency: parseFloat(energyCertificate.boilerEfficiency),
        boilerCapacity: parseFloat(energyCertificate.boilerCapacity),
        waterMass: parseFloat(energyCertificate.waterMass),
        fuelType: energyCertificate.fuelType,
      };

      console.log("Calculation data:", data);

      const totalHeatLoss = calculateHeatingEnergy(
        data.wallUValue,
        data.windowUValue,
        data.wallArea,
        data.windowArea,
        data.Tc,
        data.Te
      );

      const energyRequirementToTarget = calculateEnergyRequirementToTarget(
        totalHeatLoss,
        data.Ti,
        data.Tc,
        data.Te
      );

      const targetWaterTemperature =
        calculateWaterTargetTemperatureToReachTargetTemp(
          energyRequirementToTarget,
          data.waterMass,
          data.Tw
        );

      const fuelConsumptionToTarget = calculateFuelConsumptionToReachTargetTemp(
        energyRequirementToTarget,
        data.fuelType,
        data.boilerEfficiency
      );

      const energyBalance = calculateEnergyBalance(
        energyRequirementToTarget,
        totalHeatLoss
      );

      setHeatingCurve(targetWaterTemperature);
      setEnergyRequirementToTarget(energyRequirementToTarget);
      setFuelConsumptionToTarget(fuelConsumptionToTarget);
      setEnergyBalance(energyBalance);
    } else {
      setHeatingCurve("N/A");
      setEnergyRequirementToTarget("N/A");
      setFuelConsumptionToTarget("N/A");
      setEnergyBalance("N/A");
    }
  }, [
    climateControl,
    energyCertificate,
    outdoorTemperature,
    waterFlowTemperature,
  ]);

  useEffect(() => {
    performCalculations();
  }, [
    performCalculations,
    climateControl,
    energyCertificate,
    outdoorTemperature,
    waterFlowTemperature,
  ]);

  return (
    <EnergyContext.Provider
      value={{
        heatingCurve,
        setHeatingCurve,
        energyBalance,
        setEnergyBalance,
        waterFlowTemperature,
        performCalculations,
        energyRequirementToTarget,
        fuelConsumptionToTarget,
      }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => useContext(EnergyContext);
