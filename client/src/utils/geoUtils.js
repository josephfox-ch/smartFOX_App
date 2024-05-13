export const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;   
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
            alert("Failed to fetch coordinates. Please enable location services.");
            reject(error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation not supported"));
      }
    });
  };
  