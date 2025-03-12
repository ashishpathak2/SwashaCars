import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 22.532298731281696,
  lng: 88.32600854548087
};

export default function SwashaGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDY6z52v56uJGl-SuiHFZjQwF9n7eUM14w" // Use env variable
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMap>
  );
}
