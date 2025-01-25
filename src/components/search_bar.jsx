import React from "react";
import { useRef } from "react";
import { useApiData } from "./../hooks/api_data_provider.jsx";
import { useError } from "./../hooks/error_provider.jsx";

const SearchBar = () => {
  // Context hooks
  const { fetchApiData, fetchApiDataDummy, getApiData } = useApiData();
  const { setNewError } = useError();

  // Refs
  const searchBarRef = useRef();
  const popupContainerRef = useRef();

  // Icons
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
      <button
        type="submit"
        className="search-bar--btn"
        onClick={() => {
          handleSearch(searchBarRef);
        }}
      >
        {iconArrow}
      </button>
      <div className="search-bar--popup-container" ref={popupContainerRef}>
        <SearchBarPopup
          messageString={
            "Custom error message that would be too large to fit on the screen if it were to be displayed on mobile to test out the styles"
          }
        ></SearchBarPopup>
      </div>
    </div>
  );
};

const SearchBarPopup = ({ messageString }) => {
  return (
    <div className="search-bar--popup-wrapper">
      <div className="search-bar--popup">
        <p>{messageString}</p>
      </div>
    </div>
  );
};

export default SearchBar;

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

/**
 * Handles the search event when the form is submitted
 * @param {Event} event - The submit event
 * @returns
 */
const handleSearch = async (event, searchBarRef) => {
  event.preventDefault();
  const inputValue = searchBarRef.current.value;

  if (inputValue === "") {
    setNewError("Input field is required");
    return;
  }

  // Sanitize input
  let inputData = null;
  if (isIP(inputValue)) {
    inputData = { ipAddress: inputValue };
  } else if (isDomain(inputValue)) {
    inputData = { domain: inputValue };
  } else if (isEmail(inputValue)) {
    inputData = { email: inputValue };
  } else {
    setNewError("Invalid input, should be IP, domain or email");
    return;
  }
  try {
    const data = await fetchApiData(inputData);
  } catch (err) {
    // TODO: also display any input error on a CSS popup in the search bar in the search bar
  }
  console.log(process.env.NODE_ENV, data); // TODO: Remove log, only for testing

  // Clear input
  searchBarRef.current.value = "";
};
