export function calculateHeatingCurveAndEnergyBalance(data) {
  const { Te, Ti, Tc, Tw, G, V, K, Ag } = data;

  if (
    [Te, Ti, Tc, Tw, G, V, K, Ag].some(
      (value) => value === null || value === undefined || isNaN(value)
    )
  ) {
    return {
      energyBalance: "n/a",
      heatingCurve: "n/a",
    };
  }


  const Q_loss = G * V * (Tc - Te);
  const Q_gain = Ag;
  const energyBalance = Q_gain - Q_loss;

 
  const m = -G * V / K;
  const b = ((G * V + K) / K) * Tc - Ag / K;

  const heatingCurve = (Te) => m * Te + b;

  return {
    energyBalance: energyBalance.toFixed(2),
    heatingCurve: heatingCurve(Te).toFixed(2),
  };
}



  