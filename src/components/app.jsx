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

  useEffect(() => {
    const data = fetchApiData();
  }, []);

  // Effect to get new coordinates
  useEffect(() => {
    const data = getApiData();
    if (!data) return;
    setCoordinates([data.location.lat, data.location.lng]);
  }, [apiData]);

  return (
    <div id="app-container" className="app-container">
      <BannerContainer>
        <h1>IP Address Tracker</h1>
        <SearchBar></SearchBar>
        <InfoModal></InfoModal>
      </BannerContainer>
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
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <UpdateMapView coordinates={coordinates} />
      </MapContainer>
    </div>
  );
}

export default App;

/**
 * Updates the map view
 *
 * @param {{ coordinates: [number, number] }} - Coordinates to center the map [lat, lng]
 * @returns {void}
 */
const UpdateMapView = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, map.getZoom());
  }, [coordinates, map]);

  return null;
};
