// import React, { useEffect } from 'react';
// import { useEnergy } from '../../context/EnergyContext';

// const EnergyComponent = () => {
//   const { energyData, loading, error, fetchEnergyData } = useEnergy();

//   useEffect(() => {
//     fetchEnergyData(); // HomeContext'teki selectedHome'dan alıyor
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h3>Energy Data</h3>
//       <pre>{JSON.stringify(energyData, null, 2)}</pre>
//     </div>
//   );
// };

// export default EnergyComponent;
