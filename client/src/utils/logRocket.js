import LogRocket from "logrocket";
import sendLogToBackend from "./logService";

/**
 * Initializes LogRocket for session tracking and error logging.
 * Also captures global errors and unhandled promise rejections.
 */
const initLogRocket = () => {
  LogRocket.init("g5kgqm/smartfox-home");

  // Capture LogRocket session URL and send it to the backend
  LogRocket.getSessionURL((sessionURL) => {
    console.log("LogRocket session:", sessionURL);
    sendLogToBackend("info", `LogRocket session started: ${sessionURL}`);
  });

  // Capture global errors (window.onerror)
  window.onerror = (message, source, lineno, colno, error) => {
    console.error("Global error caught:", message);

    // Log to LogRocket
    LogRocket.captureException(error || new Error(message));

    // Send log to backend
    sendLogToBackend("error", `Unhandled error: ${message} at ${source}:${lineno}:${colno}`);
  };

  // Capture unhandled promise rejections
  window.onunhandledrejection = (event) => {
    console.error("Unhandled Promise Rejection:", event.reason);

    // Log to LogRocket
    LogRocket.captureException(event.reason);

    // Send log to backend
    sendLogToBackend("error", `Unhandled Promise Rejection: ${event.reason}`);
  };
};

export default initLogRocket;