import React from "react";
import { useRef } from "react";
import { useApiData } from "./../hooks/api_data_provider.jsx";

const SearchBar = () => {
  const { fetchApiData, fetchApiDataDummy, getApiData } = useApiData();
  const searchBarRef = useRef();

  // TODO: modify so that errors are displayed instead
  const handleSearch = async (event) => {
    event.preventDefault();
    const inputValue = searchBarRef.current.value;

    if (inputValue === "") {
      console.log("IP, domain or email required"); // TODO: Display error message, remove this log
      return;
    }

    switch (process.env.NODE_ENV) {
      case "production":
        if (isIP(inputValue)) {
          inputData = { ipAddress: inputValue };
        } else if (isDomain(inputValue)) {
          inputData = { domain: inputValue };
        } else if (isEmail(inputValue)) {
          inputData = { email: inputValue };
        } else {
          throw new Error("Invalid input"); // TODO: Display error message instead, remove this later
        }
        data = await fetchApiData(inputData);
        console.log(process.env.NODE_ENV, data); // TODO: Remove log, only for testing
        break;
      default:
        const data = await fetchApiDataDummy();
        console.log(process.env.NODE_ENV, data); // TODO: Remove log, only for testing
        break;
    }

    searchBarRef.current.value = "";
  };

  const iconArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
      <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
    </svg>
  );

  return (
    <div className="search-bar">
      <input
        className="search-bar--input"
        type="text"
        placeholder="Search for any IP address or domain"
        required
        ref={searchBarRef}
      ></input>
      <button type="submit" className="search-bar--btn" onClick={handleSearch}>
        {iconArrow}
      </button>
    </div>
  );
};

export default SearchBar;

// Helper functions

const isIP = (ip) => {
  const re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
  if (re.test(ip) === false) {
    return false;
  }
  ip.split(".").forEach((octect) => {
    if (!(octect >= 0 || octect <= 255)) {
      return false;
    }
  });
  return true;
};

const isDomain = (domain) => {
  const re = /^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$/;
  if (re.test(domain) === false) {
    return false;
  }
  return true;
};

const isEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(email) === false) {
    return false;
  }
  return true;
};
