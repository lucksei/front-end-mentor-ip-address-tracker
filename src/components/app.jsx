import React from "react";

// Import leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  SVGOverlay,
} from "react-leaflet";
import customIcon from "./../leaflet/custom_icon.js";

// Import components
import SearchBar from "./../components/search_bar.jsx";
import InfoModal from "./../components/info_modal.jsx";
import BannerContainer from "./../components/banner_container.jsx";

// Import styles
import "./../styles/_reset.scss";
import "./../styles/style.scss";

function App() {
  return (
    <div id="app-container" className="app-container">
      <BannerContainer>
        <h1>IP Address Tracker</h1>
        <SearchBar></SearchBar>
        <InfoModal></InfoModal>
      </BannerContainer>
      <MapContainer
        className="map-container"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
