const sendLogToBackend = async (level, message) => {
    try {
      await fetch("http://localhost:3000/api/v1/logs", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, message }),
      });
    } catch (error) {
      console.error("The Log couldn't be sent to Backend", error);
    }
  };
  
  export default sendLogToBackend;