import React from "react";
import { useState, useRef, useEffect } from "react";
import { useApiData } from "./../hooks/api_data_provider.jsx";
import { useError } from "./../hooks/error_provider.jsx";

const SearchBar = () => {
  // Context hooks
  const { fetchApiData, getApiData } = useApiData();
  const { setNewError } = useError();

  // States
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Refs
  const searchBarRef = useRef();
  const searchBarInputRef = useRef();

  // Functions
  const onPopupClose = () => {
    setShowPopup(false);
  };

  const openPopup = (messageString) => {
    setPopupMessage(messageString);
    setShowPopup(true);
  };

  /**
   * Handles the search event when the form is submitted
   * @param {Event} event - The submit event
   * @returns {void} - Nothing
   */
  const handleSearch = async (event) => {
    event.preventDefault();
    const inputValue = searchBarInputRef.current.value;

    if (inputValue === "") {
      openPopup("Input field is required");
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
      openPopup("Invalid input, should be IP, domain or email");
      return;
    }
    try {
      const data = await fetchApiData(inputData);
    } catch (err) {
      openPopup(err.message);
      setNewError(err.message);
    }

    // Clear input
    searchBarInputRef.current.value = "";
  };

  // Get the coordinates of the search bar and store them on variables
  // This is needed to calculate the position of the popup in css
  useEffect(() => {
    const coordinates = searchBarRef.current.getBoundingClientRect();
    const { top, right, bottom, left, height, width } = coordinates;
    searchBarRef.current.style.setProperty("--left", `${left}px`);
    searchBarRef.current.style.setProperty("--bottom", `${bottom}px`);
  });

  // When pressing enter on the input field, submit the form
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch(event);
      }
    };
    searchBarRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      searchBarRef.current.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Icons
  const iconArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
      <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
    </svg>
  );

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        className="search-bar--input"
        type="text"
        placeholder="Search for any IP address or domain"
        ref={searchBarInputRef}
        required
      ></input>
      <button type="submit" className="search-bar--btn" onClick={handleSearch}>
        {iconArrow}
      </button>
      {showPopup && (
        <SearchBarPopup
          messageString={popupMessage}
          onClose={onPopupClose}
        ></SearchBarPopup>
      )}
    </div>
  );
};

const SearchBarPopup = ({ messageString, onClose }) => {
  const timeoutHide = 50 * 1000;
  const timeoutAnimation = 500;

  const popupRef = useRef();
  // Start the fade out animation after 10 seconds
  useEffect(() => {
    // remove the fade-in class
    const fadeInTimer = setTimeout(() => {
      popupRef.current.classList.remove("fade-in");
    }, timeoutAnimation);

    // Start the fading out animation
    const fadeOutTimer = setTimeout(() => {
      popupRef.current.classList.add("fade-out");
    }, timeoutHide);

    // Close the popup
    const cleanUpTimer = setTimeout(() => {
      if (onClose) onClose();
    }, timeoutHide + timeoutAnimation);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(cleanUpTimer);
    };
  }, [onClose]);

  // Fade out if the popup is clicked
  const handlePopupClick = () => {
    popupRef.current.classList.add("fade-out");
    const cleanUpTimer = setTimeout(() => {
      if (onClose) onClose();
    }, timeoutAnimation);

    return () => {
      clearTimeout(cleanUpTimer);
    };
  };

  return (
    <div
      className="search-bar--popup fade-in"
      onClick={handlePopupClick}
      ref={popupRef}
    >
      <span>{messageString}</span>
    </div>
  );
};

export default SearchBar;

const isIP = (ip) => {
  const re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (re.test(ip) === false) {
    return false;
  }
  return ip.split(".").every((octect) => {
    try {
      const octectInt = parseInt(octect);
      return octectInt >= 0 && octectInt <= 255;
    } catch {
      return false;
    }
  });
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
