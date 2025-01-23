import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: require("../../images/icon-location.svg").default,
  iconRetinaUrl: require("../../images/icon-location.svg").default,
  iconAnchor: null,
  popupAnchor: new L.Point(0, -5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(30, 40),
  // className: "leaflet-div-icon",
});

export default customIcon;
