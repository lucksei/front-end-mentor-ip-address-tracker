import React from "react";
import { useState, useEffect, useRef, forwardRef } from "react";

import { useApiData } from "./../hooks/api_data_provider.jsx";

const InfoModal = forwardRef(({}, bannerContainerRef) => {
  // Context hooks
  const { fetchApiData, getApiData, apiData } = useApiData();

  // Ref
  const infoModalRef = useRef();

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
    const updateInfoModal = () => {
      const data = getApiData();
      if (data) {
        // TODO: add logic to update the info modal
        console.log(data);
        setIpString(getIpString(data));
        setLocationString(getLocationString(data));
        setTimezoneString(getTimezoneString(data));
        setIspString(getIspString(data));
      }
    };

    updateInfoModal();
  }, [apiData]);

  return (
    <div className="info-modal" ref={infoModalRef}>
      <div className="info-modal--ip-address">
        <span className="title">IP ADDRESS</span>
        <span className="value">{ipString}</span>
      </div>
      <div className="info-modal--location">
        <span className="title">LOCATION</span>
        <span className="value">{locationString}</span>
      </div>
      <div className="info-modal--timezone">
        {/* <!-- TODO add offset value dynamically using the API --> */}
        <span className="title">TIMEZONE</span>
        <span className="value">{timezoneString}</span>
      </div>
      <div className="info-modal--isp">
        <span className="title">ISP</span>
        <span className="value">{ispString}</span>
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
