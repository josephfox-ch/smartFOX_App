const SPECIFIC_HEAT_CAPACITY_WATER = 4.18; // kJ/kg°C
const FUEL_LOWER_HEATING_VALUES = {
  naturalGas: 35.8, // MJ/m³
  electricity: 3.6, // MJ/kWh (as a comparison unit)
  coal: 24, // MJ/kg
  oil: 42.6 // MJ/kg
};

export const calculateHeatingEnergy = (wallUValue, windowUValue, wallArea, windowArea, insideTemp, outsideTemp) => {
  const deltaT = insideTemp - outsideTemp;
  const wallHeatLoss = wallArea * wallUValue * deltaT; // W
  const windowHeatLoss = windowArea * windowUValue * deltaT; // W
  const totalHeatLoss = wallHeatLoss + windowHeatLoss; // W
  return totalHeatLoss; // W
};


export const calculateEnergyRequirement = (totalHeatLoss, heatingHours) => {
  return totalHeatLoss * heatingHours; // Wh
};

export const calculateFuelConsumption = (energyRequirement, fuelType, boilerEfficiency) => {
  const fuelEnergyContent = FUEL_LOWER_HEATING_VALUES[fuelType]; // MJ
  const energyRequirementMJ = energyRequirement / 1000 * 3.6; // Convert Wh to MJ
  return energyRequirementMJ / (fuelEnergyContent * boilerEfficiency / 100); // fuel quantity
};

export const calculateWaterTargetTemperature = (energyRequirement, waterMass, currentWaterTemp) => {
  const energyRequirementKJ = energyRequirement * 3.6; // Convert Wh to kJ
  return energyRequirementKJ / (waterMass * SPECIFIC_HEAT_CAPACITY_WATER) + currentWaterTemp; // °C
};

export const calculateEnergyBalance = (energyInput, energyOutput) => {
  return energyInput - energyOutput; // Balance value
};

