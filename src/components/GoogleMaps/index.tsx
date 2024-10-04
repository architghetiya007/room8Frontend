import { GoogleMap, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "400px",
};
interface GoogleMapsProps {
  lat?: number;
  lng?: number;
}
const center = {
  lat: -3.745,
  lng: -38.523,
};
const GoogleMaps: React.FC<GoogleMapsProps> = ({
  lat = center.lat,
  lng = center.lng,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: lat, lng: lng }}
      zoom={10}
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
};

export default GoogleMaps;
