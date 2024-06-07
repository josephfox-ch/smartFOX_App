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
  calculateIndoorTemperatureIncrease,
  calculateWaterTemperatureIncrease
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
  const [waterTemperatureIncreasePerSecond,setWaterTemperatureIncreasePerSecond] = useState("N/A");
  const [indoorTemperatureIncreasePerSecond,setIndoorTemperatureIncreasePerSecond] = useState("N/A");

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
        buildingArea: parseFloat(energyCertificate.buildingArea),
        buildingHeight: parseFloat(energyCertificate.buildingHeight),
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
      console.log("Total Heat Loss:", totalHeatLoss);

      const energyRequirementToTarget = calculateEnergyRequirementToTarget(
        totalHeatLoss,
        data.Ti,
        data.Tc,
        data.Te
      );
      console.log("Energy Requirement to Target:", energyRequirementToTarget);

      const targetWaterTemperature =
        calculateWaterTargetTemperatureToReachTargetTemp(
          energyRequirementToTarget,
          data.waterMass,
          data.Tw
        );
      console.log("Target Water Temperature:", targetWaterTemperature);

      const fuelConsumptionToTarget = calculateFuelConsumptionToReachTargetTemp(
        energyRequirementToTarget,
        data.fuelType,
        data.boilerEfficiency
      );
      console.log("Fuel Consumption to Target:", fuelConsumptionToTarget);

      const energyBalance = calculateEnergyBalance(
        energyRequirementToTarget,
        totalHeatLoss
      );

      const heatedVolumeOfBuilding = data.buildingArea*data.buildingHeight

      const waterTemperatureIncreasePerSecond = calculateWaterTemperatureIncrease(data.boilerCapacity, data.boilerEfficiency)

      const indoorTemperatureIncreasePerSecond = calculateIndoorTemperatureIncrease(heatedVolumeOfBuilding, data.boilerCapacity); 
 


      setHeatingCurve(targetWaterTemperature);
      setEnergyRequirementToTarget(energyRequirementToTarget);
      setFuelConsumptionToTarget(fuelConsumptionToTarget);
      setEnergyBalance(energyBalance);
      setWaterTemperatureIncreasePerSecond(waterTemperatureIncreasePerSecond);
      setIndoorTemperatureIncreasePerSecond(indoorTemperatureIncreasePerSecond);
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
        waterTemperatureIncreasePerSecond,
        indoorTemperatureIncreasePerSecond,
      }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => useContext(EnergyContext);
