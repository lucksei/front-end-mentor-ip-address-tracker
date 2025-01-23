import React from "react";

const BannerContainer = ({ children, style }) => {
  return (
    <>
      <div id="banner-container" className="banner-container" style={style}>
        {children}
      </div>
    </>
  );
};

export default BannerContainer;
