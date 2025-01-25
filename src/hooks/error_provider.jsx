import React from "react";
import { createContext, useContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  /**
   * Sets a new error
   * @param {string} errorString - Error message
   */
  const setNewError = (errorString) => {
    console.log(errorString);
    // TODO: Create a new error object
  };

  return (
    <ErrorContext.Provider value={{ setNewError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
