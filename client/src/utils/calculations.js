const SPECIFIC_HEAT_CAPACITY_WATER = 4.18; // kJ/kg°C
const SPECIFIC_HEAT_CAPACITY_AIR = 1005; // J/(kg · K)
const FLOW_RATE_OF_WATER = 0.5; // kg/s
const FUEL_LOWER_HEATING_VALUES = {
  naturalGas: 35.8, // MJ/m³
  electricity: 3.6, // MJ/kWh (as a comparison unit)
  coal: 24, // MJ/kg
  oil: 42.6, // MJ/kg
};

// 1. Heat Loss Calculation
export const calculateHeatingEnergy = (
  wallUValue,
  windowUValue,
  wallArea,
  windowArea,
  targetTemp,
  outsideTemp
) => {
  const deltaT = targetTemp - outsideTemp;
  const wallHeatLoss = wallArea * wallUValue * deltaT; // W
  const windowHeatLoss = windowArea * windowUValue * deltaT; // W
  const totalHeatLoss = wallHeatLoss + windowHeatLoss; // W
  return totalHeatLoss; // W
};

// 2. Energy Requirement (to reach target temperature)
export const calculateEnergyRequirementToTarget = (
  totalHeatLoss,
  currentTemp,
  targetTemp,
  outsideTemp
) => {
  return (
    (totalHeatLoss * (targetTemp - currentTemp)) / (targetTemp - outsideTemp)
  ); // Wh
};

// 3. Daily Energy Requirement
export const calculateDailyEnergyRequirement = (
  totalHeatLoss,
  heatingHours
) => {
  return totalHeatLoss * heatingHours; // Wh
};

// 4. Target Water Temperature to Reach Desired Indoor Temperature
export const calculateWaterTargetTemperatureToReachTargetTemp = (
  energyRequirement,
  waterMass,
  currentWaterTemp
) => {
  const energyRequirementKJ = energyRequirement * 3.6; // Convert Wh to kJ
  return (
    energyRequirementKJ / (waterMass * SPECIFIC_HEAT_CAPACITY_WATER) +
    currentWaterTemp
  ); // °C
};

// 5. Fuel Consumption to Reach Target Temperature
export const calculateFuelConsumptionToReachTargetTemp = (
  energyRequirement,
  fuelType,
  boilerEfficiency
) => {
  const fuelEnergyContent = FUEL_LOWER_HEATING_VALUES[fuelType]; // MJ
  const energyRequirementMJ = (energyRequirement / 1000) * 3.6; // Convert Wh to MJ
  return energyRequirementMJ / ((fuelEnergyContent * boilerEfficiency) / 100); // fuel quantity
};

// 6. Daily Fuel Consumption Calculation
export const calculateDailyFuelConsumption = (fuelConsumptionRecords) => {
  return fuelConsumptionRecords.reduce(
    (total, consumption) => total + consumption,
    0
  );
};

// 7. Daily Energy Consumption Calculation
export const calculateDailyEnergyConsumption = (energyConsumptionRecords) => {
  return energyConsumptionRecords.reduce(
    (total, consumption) => total + consumption,
    0
  );
};

// 8. Energy Balance
export const calculateEnergyBalance = (energyInput, energyOutput) => {
  return energyInput - energyOutput; // Balance value
};

// Additional function to check if boiler capacity can meet daily energy requirement
export const checkBoilerCapacity = (boilerCapacity, dailyEnergyRequirement) => {
  // Boiler capacity is in kW, so we need to convert to Wh
  const boilerCapacityWh = boilerCapacity * 1000 * 24; // Daily Wh
  return dailyEnergyRequirement <= boilerCapacityWh;
};

// 9. Water Temperature Increases per second
export const calculateWaterTemperatureIncrease = (boilerCapacity, boilerEfficiency) => {
  const powerOutput = (boilerCapacity * 1000) * (boilerEfficiency / 100); // Boiler output in J/s
  const temperatureIncrease =
    powerOutput / (FLOW_RATE_OF_WATER * SPECIFIC_HEAT_CAPACITY_WATER * 1000); // Convert kJ to J
  console.log('Water-temp-increase:', temperatureIncrease)
  return temperatureIncrease;
};

// 10. Indoor Temperature Increases per second
export const calculateIndoorTemperatureIncrease = (volume, boilerCapacity) => {
  const airDensity = 1.2; // kg/m³

  // Convert boiler power to joules (boilerCapacity is in kW)
  const boilerPowerInJoules = boilerCapacity * 1000; // W = J/s 

  // Calculate the mass of air in the house
  const airMass = volume * airDensity; // kg
  
  // Calculate the temperature increase per second
  const temperatureIncrease = boilerPowerInJoules / (airMass * SPECIFIC_HEAT_CAPACITY_AIR); // K/s
  
  console.log('Indoor-temp-increase:', temperatureIncrease);
  return temperatureIncrease;
};
// // Example Usage:
// const wallUValue = 0.5; // W/m²°C
// const windowUValue = 2.0; // W/m²°C
// const wallArea = 100; // m²
// const windowArea = 20; // m²
// const currentTemp = 19; // °C
// const targetTemp = 21; // °C
// const outsideTemp = 0; // °C
// const heatingHours = 24; // hours
// const waterMass = 20; // kg
// const currentWaterTemp = 30; // °C
// const boilerEfficiency = 90; // %
// const boilerCapacity = 10; // kW
// const fuelType = 'naturalGas';

// // Heat Loss Calculation
// const totalHeatLoss = calculateHeatingEnergy(wallUValue, windowUValue, wallArea, windowArea, targetTemp, outsideTemp);

// // Energy Requirement (to reach target temperature)
// const energyRequirementToTarget = calculateEnergyRequirementToTarget(totalHeatLoss, currentTemp, targetTemp, outsideTemp);

// // Daily Energy Requirement
// const dailyEnergyRequirement = calculateDailyEnergyRequirement(totalHeatLoss, heatingHours);

// // Target Water Temperature to Reach Desired Indoor Temperature
// const targetWaterTemperature = calculateWaterTargetTemperatureToReachTargetTemp(energyRequirementToTarget, waterMass, currentWaterTemp);

// // Fuel Consumption to Reach Target Temperature
// const fuelConsumptionToTarget = calculateFuelConsumptionToReachTargetTemp(energyRequirementToTarget, fuelType, boilerEfficiency);

// // Example data for Daily Fuel Consumption Calculation
// const fuelConsumptionRecords = [5, 6, 7, 8]; // Example fuel consumption records (in m³ or kg per activation)
// const dailyFuelConsumption = calculateDailyFuelConsumption(fuelConsumptionRecords);

// // Example data for Daily Energy Consumption Calculation
// const energyConsumptionRecords = [1000, 1200, 1100, 1300]; // Example energy consumption records (in Wh per activation)
// const dailyEnergyConsumption = calculateDailyEnergyConsumption(energyConsumptionRecords);

// // Energy Balance (based on example energy input and output data)
// const energyInput = dailyEnergyRequirement; // In this example, we use daily energy requirement as energy input
// const energyOutput = totalHeatLoss * heatingHours; // In this example, we use total heat loss as energy output
// const energyBalance = calculateEnergyBalance(energyInput, energyOutput);

// // Boiler Capacity Check
// const isBoilerCapacitySufficient = checkBoilerCapacity(boilerCapacity, dailyEnergyRequirement);

// console.log("Heat Loss:", totalHeatLoss, "W");
// console.log("Energy Requirement to Reach Target Temperature:", energyRequirementToTarget, "Wh");
// console.log("Daily Energy Requirement:", dailyEnergyRequirement, "Wh");
// console.log("Target Water Temperature:", targetWaterTemperature, "°C");
// console.log("Fuel Consumption to Reach Target Temperature:", fuelConsumptionToTarget, "m³ or kg");
// console.log("Daily Fuel Consumption:", dailyFuelConsumption, "m³ or kg");
// console.log("Daily Energy Consumption:", dailyEnergyConsumption, "Wh");
// console.log("Energy Balance:", energyBalance, "Wh");
// console.log("Is Boiler Capacity Sufficient?:", isBoilerCapacitySufficient);
