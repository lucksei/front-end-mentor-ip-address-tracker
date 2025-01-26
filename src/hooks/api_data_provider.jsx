import React from "react";
import { createContext, useContext, useState } from "react";
import dummyData from "./../raw_api_response.json";

import { useError } from "./error_provider.jsx";

export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null); // Holds the API data
  const { setNewError } = useError();

  /**
   * Fetches IP data from the IP Geolocation API by IPify.
   * @param {{ ipAddress: string, domain: string, email: string }} params
   * @returns {Promise} - A promise that resolves to the fetched IP data.
   */
  const fetchApiData = async ({ ipAddress, domain, email }) => {
    const urlParams = new URLSearchParams();
    urlParams.append("apiKey", process.env.IPIFY_API_KEY);
    if (email) urlParams.append("email", email);
    if (domain) urlParams.append("domain", domain);
    if (ipAddress) urlParams.append("ipAddress", ipAddress);
    const url = `https://geo.ipify.org/api/v2/country,city?${urlParams.toString()}`;

    switch (process.env.REAL_API_DATA) {
      case "true":
        console.log(`fetching real data, env: ${process.env.REAL_API_DATA}`);
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          setNewError("Failed to fetch IP data");
          throw new Error("Failed to fetch IP data");
        }

        const data = await response.json();
        setApiData(data);
        return data;

      case "false": // Same as default
        console.log(`fetching fake data, env: ${process.env.REAL_API_DATA}`);
      default:
        try {
          const data = await _fetchDummyData();
          setApiData(data);
          return data;
        } catch (err) {
          setNewError(err.message);
          throw new Error(err.message);
        }
    }
  };

  /**
   * Simulates fetching IP data by using a dummy data response.
   * Sets loading state during the operation and updates the API data state with dummy data.
   * In case of an error, sets the error state.
   * This function is useful for testing purposes without calling the actual API.
   */
  const _fetchDummyData = async () => {
    try {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          // reject(new Error("Failed to fetch IP data"));
          resolve(dummyData);
        }, 1000);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Getters
  const getApiData = () => apiData;

  return (
    <ApiDataContext.Provider
      value={{
        fetchApiData,
        getApiData,
        apiData,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => useContext(ApiDataContext);
