import React from "react";
import { useRef, cloneElement } from "react";

const BannerContainer = ({ children, style }) => {
  const bannerContainerRef = useRef();
  return (
    <>
      <div
        id="banner-container"
        className="banner-container"
        style={style}
        ref={bannerContainerRef}
      >
        {React.Children.map(children, (child) => {
          return React.isValidElement(child)
            ? cloneElement(child, { ref: bannerContainerRef })
            : child;
        })}
      </div>
    </>
  );
};

export default BannerContainer;
