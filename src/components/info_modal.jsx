import React from "react";
import { useState, useEffect, useRef, forwardRef } from "react";

import { useApiData } from "./../hooks/api_data_provider.jsx";

const InfoModal = forwardRef(({}, bannerContainerRef) => {
  // Context hooks
  const { fetchApiData, getApiData, apiData } = useApiData();

  // Ref
  const infoModalRef = useRef();
  const ipAddressValueRef = useRef();
  const locationValueRef = useRef();
  const timezoneValueRef = useRef();
  const ispValueRef = useRef();

  let [ipString, setIpString] = useState("192.212.174.101");
  let [locationString, setLocationString] = useState("Brooklyn, NY 10001");
  let [timezoneString, setTimezoneString] = useState("UTC -05:00");
  let [ispString, setIspString] = useState("SpaceX Starlink");

  // Set the height of the info modal dynamically
  useEffect(() => {
    const updateHeight = () => {
      const height = infoModalRef.current.getBoundingClientRect().height;
      bannerContainerRef.current.style.setProperty(
        "--info-modal-height",
        `${height}px`
      );
    };
    updateHeight();

    addEventListener("resize", updateHeight);

    // Clean up the event listener
    return () => {
      removeEventListener("resize", updateHeight);
    };
  }, []);

  // Recalculate the contents of the info modal when the api data changes
  useEffect(() => {
    const updateInfoModal = async () => {
      const data = getApiData();
      if (data) {
        console.log(data); // TODO: For debugging, delete later
        // Clear out old values
        setIpString("");
        setLocationString("");
        setTimezoneString("");
        setIspString("");

        // Animate the ip address
        animateValueFadeIn(
          ipAddressValueRef,
          data,
          setIpString,
          getIpString,
          0
        );

        // Animate the location
        animateValueFadeIn(
          locationValueRef,
          data,
          setLocationString,
          getLocationString,
          100
        );

        // Animate the timezone
        animateValueFadeIn(
          timezoneValueRef,
          data,
          setTimezoneString,
          getTimezoneString,
          200
        );

        // Animate the isp
        animateValueFadeIn(ispValueRef, data, setIspString, getIspString, 300);
      }
    };

    updateInfoModal();
  }, [apiData]);

  return (
    <div className="info-modal" ref={infoModalRef}>
      <div className="info-modal--ip-address">
        <span className="title">IP ADDRESS</span>
        <span className="value" ref={ipAddressValueRef}>
          {ipString}
        </span>
      </div>
      <div className="info-modal--location">
        <span className="title">LOCATION</span>
        <span className="value" ref={locationValueRef}>
          {locationString}
        </span>
      </div>
      <div className="info-modal--timezone">
        {/* <!-- TODO add offset value dynamically using the API --> */}
        <span className="title">TIMEZONE</span>
        <span className="value" ref={timezoneValueRef}>
          {timezoneString}
        </span>
      </div>
      <div className="info-modal--isp">
        <span className="title">ISP</span>
        <span className="value" ref={ispValueRef}>
          {ispString}
        </span>
      </div>
    </div>
  );
});

export default InfoModal;

// Helpers

const getIpString = (data) => {
  if (data) {
    return data.ip.toString();
  }
};

const getLocationString = (data) => {
  if (data) {
    return `${data.location.region}, ${data.location.city}, ${data.location.country}\n ${data.location.postalCode}`;
  }
};

const getTimezoneString = (data) => {
  if (data) {
    return `UTC ${data.location.timezone}`;
  }
};

const getIspString = (data) => {
  if (data) {
    return data.isp.toString();
  }
};

/**
 * Animates the fade-in effect for a value within a specified reference.
 *
 * @param {Object} ref - The reference to the DOM element to apply the fade-in animation.
 * @param {Object} data - The data used to retrieve the new value.
 * @param {Function} setCallback - The function to set the new value.
 * @param {Function} getCallback - The function to get the new value from the data.
 * @param {number} timeBeforeAnimation - The delay in milliseconds before starting the fade-in animation.
 */
const animateValueFadeIn = async (
  ref,
  data,
  setCallback,
  getCallback,
  timeBeforeAnimation
) => {
  // Wait for a specified amount of time
  await new Promise((resolve) =>
    setTimeout(() => resolve(), timeBeforeAnimation)
  );
  // Add the fade in class
  ref.current.classList.add("fade-in");
  // Change the value
  setCallback(getCallback(data));
  // Remove the fade in class
  new Promise((resolve) =>
    setTimeout(() => {
      ref.current.classList.remove("fade-in");
      return resolve();
    }, 1500)
  );
};
