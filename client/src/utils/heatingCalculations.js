export function calculateHeatingCurve(data) {
  const { Te, Ti, Tw, G, V, K, Ag } = data;

  const energyBalance = K * (Ti - Te) + Ag - (G * V * (Ti - Te));
  const heatingCurve = (-G * V / K) * Te + ((G * V + K) / K) * Ti - Ag / K;

  return {
    energyBalance: energyBalance.toFixed(2),
    heatingCurve: heatingCurve.toFixed(2),
  };
}

  