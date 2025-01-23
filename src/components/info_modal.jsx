import React from "react";
import { useRef, useEffect } from "react";

const InfoModal = () => {
  // Get the width of the elemetn dinamically using JS
  const infoModalRef = useRef();

  // Set the height of the info modal dynamically
  useEffect(() => {
    const height = infoModalRef.current.clientHeight;
    // Set CSS variable
    document.documentElement.style.setProperty(
      "--info-modal-height",
      `${height}px`
    );
  });

  return (
    <div className="info-modal" ref={infoModalRef}>
      <div className="info-modal--ip-address">
        <span className="title">IP ADDRESS</span>
        <span className="value">192.212.174.101</span>
      </div>
      <div className="info-modal--location">
        <span className="title">LOCATION</span>
        <span className="value">Brooklyn, NY 10001</span>
      </div>
      <div className="info-modal--timezone">
        {/* <!-- TODO add offset value dynamically using the API --> */}
        <span className="title">TIMEZONE</span>
        <span className="value">UTC -05:00</span>
      </div>
      <div className="info-modal--isp">
        <span className="title">ISP</span>
        <span className="value">SpaceX Starlink</span>
      </div>
    </div>
  );
};

export default InfoModal;
