import React from "react";
import { useState, useEffect } from "react";

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

// Import Context
import { useApiData } from "./../hooks/api_data_provider.jsx";

// Import styles
import "./../styles/_reset.scss";
import "./../styles/style.scss";

function App() {
  // Context Hooks
  const { fetchApiData, getApiData, apiData } = useApiData();

  // State Hooks
  const [coordinates, setCoordinates] = useState([32.69922, -117.11281]); // [51.505, -0.09]

  // Fetch the data once
  useEffect(() => {
    try {
      const data = fetchApiData();
    } finally {
      return;
    }
  }, []);

  // Effect to get new coordinates
  useEffect(() => {
    const data = getApiData();
    if (!data) return;
    setCoordinates([data.location.lat, data.location.lng]);
  }, [apiData]);

  return (
    <div id="app-container" className="app-container">
      {/* Banner Container */}
      <BannerContainer>
        <h1>IP Address Tracker</h1>
        <SearchBar></SearchBar>
        <InfoModal></InfoModal>
      </BannerContainer>
      {/* Map Container */}
      <MapContainer
        className="map-container"
        center={coordinates}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            <span>Latitude:</span> <code>{coordinates[0]}</code>
            <br />
            <span>Longitude:</span> <code>{coordinates[1]}</code>
          </Popup>
        </Marker>
        <UpdateMapView coordinates={coordinates} />
      </MapContainer>
      {/* Attribution */}
      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/lucksei">@lucksei</a>.
      </div>
    </div>
  );
}

export default App;

/**
 * Updates the map view when the coordinates change
 *
 * @param {{ coordinates: [number, number] }} - Coordinates to center the map [lat, lng]
 * @returns {void}
 */
const UpdateMapView = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, 13);
  }, [coordinates, map]);

  return null;
};
