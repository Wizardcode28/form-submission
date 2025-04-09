import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import "./App.css"

function MapView() {
  const [locations, setLocations] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    // iconUrl: `https://flagcdn.com/w40/${countryCode}.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Failed to fetch locations:", err));
  }, []);

  return (
    <div className='map'>
    <MapContainer center={[20, 77]} zoom={4} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {locations.map((loc, i) => (
        <Marker
          key={loc._id || i}
          position={[loc.latitude, loc.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{loc.city}, {loc.country}</strong><br />
            Submitted by: {loc.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}

export default MapView;
