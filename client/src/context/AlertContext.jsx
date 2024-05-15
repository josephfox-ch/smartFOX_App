import React, { createContext, useContext, useState } from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const Alert = ({ type, title, message, onClose }) => {
  let bgColor, textColor, borderColor, Icon;

  switch (type) {
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      borderColor = "border-red-300";
      Icon = FaExclamationCircle;
      break;
    case "warning":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      borderColor = "border-yellow-300";
      Icon = FaInfoCircle;
      break;
    case "info":
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      borderColor = "border-blue-300";
      Icon = FaInfoCircle;
      break;
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      borderColor = "border-green-300";
      Icon = FaCheckCircle;
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-700";
      borderColor = "border-gray-300";
      Icon = FaInfoCircle;
      break;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 m-4 p-2 flex items-center justify-center border ${bgColor} ${textColor} ${borderColor} z-9999`}
    >
      <div className="flex items-center">
        <Icon className="w-5 h-5 mx-2" />
        <div className="flex flex-col">
          <div className="text-md font-bold">{title}</div>
          <div className="text-sm">{message}</div>
        </div>
      </div>
      <div className="flex-auto"></div>
      <div className="flex flex-row-reverse ml-4">
        <FaTimesCircle
          className="w-5 h-5 cursor-pointer hover:text-opacity-70"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};
