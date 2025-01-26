import React from "react";
import { useRef, forwardRef, useEffect } from "react";

const InfoModal = forwardRef(({}, bannerContainerRef) => {
  // Ref
  const infoModalRef = useRef();

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
});

export default InfoModal;
