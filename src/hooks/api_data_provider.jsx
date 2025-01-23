import React from "react";
import { createContext, useContext, useState } from "react";
import dummyData from "./../raw_api_response.json";

export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null); // Holds the API data

  /**
   * Fetches IP data from the IP Geolocation API by IPify.
   * @param {string} [ipAddress=null] - (optional) IP address to query.
   * @param {string} [domain=null] - (optional) Domain to query.
   * @param {string} [email=null] - (optional) Email to query.
   * @returns {Promise<void>}
   */
  const fetchApiData = async ({
    ipAddress = null,
    domain = null,
    email = null,
  }) => {
    // Build the URL with query parameters
    let urlParams = new URLSearchParams();
    urlParams.append("apiKey", process.env.IPIFY_API_KEY);
    if (email) {
      urlParams.append("email", email);
    }
    if (domain) {
      urlParams.append("domain", domain);
    }
    if (ipAddress) {
      urlParams.append("ipAddress", ipAddress);
    }
    const url = "https://geo.ipify.org/api/v2/country?" + urlParams.toString();

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch IP data");
      const data = await response.json();

      // Set the API data
      setApiData(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /**
   * Simulates fetching IP data by using a dummy data response.
   * Sets loading state during the operation and updates the API data state with dummy data.
   * In case of an error, sets the error state.
   * This function is useful for testing purposes without calling the actual API.
   */
  const fetchApiDataDummy = async () => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => resolve(dummyData), 1000);
      });
      setApiData(data);
      return data;
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
        fetchApiDataDummy,
        getApiData,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => useContext(ApiDataContext);
