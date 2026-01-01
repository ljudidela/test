import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Camera } from '../types';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet markers in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const activeIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [1, -40],
  shadowSize: [50, 50],
  className: 'hue-rotate-180 brightness-125' // CSS filter to change color to red/orange
});

interface Props {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelect: (camera: Camera) => void;
}

// Component to handle map movement
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, {
      duration: 1.5
    });
  }, [center, map]);
  return null;
};

export const Map: React.FC<Props> = ({ cameras, selectedCamera, onSelect }) => {
  return (
    <MapContainer 
      center={[43.5855, 39.7231]} 
      zoom={11} 
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {selectedCamera && (
        <MapUpdater center={[selectedCamera.lat, selectedCamera.lng]} />
      )}

      {cameras.map((camera) => (
        <Marker 
          key={camera.id} 
          position={[camera.lat, camera.lng]}
          icon={selectedCamera?.id === camera.id ? activeIcon : defaultIcon}
          eventHandlers={{
            click: () => onSelect(camera),
          }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">{camera.name}</h3>
              <img src={camera.previewUrl} alt={camera.name} className="w-32 h-20 object-cover rounded mt-2" />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};