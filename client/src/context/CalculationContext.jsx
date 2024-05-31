// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import * as s3Service from "../api/services/s3Service";
// import { useHomes } from "./HomeContext";
// import { useClimate } from "./ClimateContext";
// import { useWeather } from "./WeatherContext";
// import {
//   calculateHeatingEnergy,
//   calculateEnergyRequirementToTarget,
//   calculateDailyEnergyRequirement,
//   calculateWaterTargetTemperatureToReachTargetTemp,
//   calculateFuelConsumptionToReachTargetTemp,
//   calculateDailyFuelConsumption,
//   calculateDailyEnergyConsumption,
//   calculateEnergyBalance,
//   checkBoilerCapacity
// } from "../utils/calculations";

// const CalculationContext = createContext();

// export const CalculationProvider = ({ children }) => {
//   const { selectedHome } = useHomes();
//   const { climateControl } = useClimate();
//   const { outdoorTemperature } = useWeather();
//   const [energyCertificate, setEnergyCertificate] = useState(null);
//   const [heatingCurve, setHeatingCurve] = useState(null);
//   const [energyBalance, setEnergyBalance] = useState(null);
//   const [waterFlowTemperature, setWaterFlowTemperature] = useState(null);

//   useEffect(() => {
//     if (selectedHome) {
//       setEnergyCertificate(selectedHome.EnergyCertificate);
//     }
//   }, [selectedHome]);

//   const fetchWaterFlowTemperature = useCallback(async () => {
//     if (selectedHome) {
//       try {
//         const temperature = await s3Service.getWaterFlowTemperature(selectedHome.id);
//         setWaterFlowTemperature(parseFloat(temperature));
//       } catch (error) {
//         console.error(`Failed to fetch water flow temperature for home with ID: ${selectedHome.id}`, error);
//       }
//     }
//   }, [selectedHome]);

//   useEffect(() => {
//     fetchWaterFlowTemperature();
//   }, [fetchWaterFlowTemperature]);

//   const performCalculations = useCallback(() => {
//     if (
//       climateControl &&
//       climateControl.status === 'on' && // Only perform calculations when the heating system is on
//       energyCertificate &&
//       outdoorTemperature !== null &&
//       waterFlowTemperature !== null
//     ) {
//       const data = {
//         Te: parseFloat(outdoorTemperature),
//         Ti: parseFloat(climateControl.currentTemperature),
//         Tc: parseFloat(climateControl.desiredTemperature),
//         Tw: parseFloat(waterFlowTemperature),
//         wallArea: parseFloat(energyCertificate.wallArea),
//         wallUValue: parseFloat(energyCertificate.wallUValue),
//         windowArea: parseFloat(energyCertificate.windowArea),
//         windowUValue: parseFloat(energyCertificate.windowUValue),
//         boilerEfficiency: parseFloat(energyCertificate.boilerEfficiency),
//         boilerCapacity: parseFloat(energyCertificate.boilerCapacity),
//         waterMass: parseFloat(energyCertificate.waterMass),
//         fuelType: energyCertificate.fuelType,
//       };

//       // Perform calculations based on calculations.js functions
//       const totalHeatLoss = calculateHeatingEnergy(data.wallUValue, data.windowUValue, data.wallArea, data.windowArea, data.Tc, data.Te);
//       const energyRequirementToTarget = calculateEnergyRequirementToTarget(totalHeatLoss, data.Ti, data.Tc, data.Te);
//       const dailyEnergyRequirement = calculateDailyEnergyRequirement(totalHeatLoss, 24); // Assuming 24 hours heating
//       const targetWaterTemperature = calculateWaterTargetTemperatureToReachTargetTemp(energyRequirementToTarget, data.waterMass, data.Tw);
//       const fuelConsumptionToTarget = calculateFuelConsumptionToReachTargetTemp(energyRequirementToTarget, data.fuelType, data.boilerEfficiency);
//       const dailyFuelConsumption = calculateDailyFuelConsumption([fuelConsumptionToTarget]); // Example daily fuel consumption
//       const dailyEnergyConsumption = calculateDailyEnergyConsumption([dailyEnergyRequirement]); // Example daily energy consumption
//       const energyBalance = calculateEnergyBalance(energyRequirementToTarget, totalHeatLoss ); // Example energy balance calculation

//       // Set the calculated values
//       setHeatingCurve(targetWaterTemperature);
//       setEnergyBalance(energyBalance);
//     }
//   }, [climateControl, energyCertificate, outdoorTemperature, waterFlowTemperature]);

//   useEffect(() => {
//     performCalculations();
//   }, [performCalculations]);

//   return (
//     <CalculationContext.Provider
//       value={{
//         heatingCurve,
//         energyBalance,
//         waterFlowTemperature,
//         performCalculations,
//       }}
//     >
//       {children}
//     </CalculationContext.Provider>
//   );
// };

// export const useCalculations = () => useContext(CalculationContext);
