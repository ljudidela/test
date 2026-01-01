import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Camera } from '../types';
import L from 'leaflet';
import { Video } from 'lucide-react';

// Fix for default Leaflet markers in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CameraMapProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera) => void;
}

// Component to fly to selected camera
function MapController({ selectedCamera }: { selectedCamera: Camera | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCamera) {
      map.flyTo(selectedCamera.coordinates, 14, {
        duration: 1.5
      });
    }
  }, [selectedCamera, map]);

  return null;
}

export const CameraMap: React.FC<CameraMapProps> = ({ cameras, selectedCamera, onSelectCamera }) => {
  return (
    <div className="h-full w-full z-0">
      <MapContainer 
        center={[43.5853, 39.7203]} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedCamera={selectedCamera} />
        
        {cameras.map((camera) => (
          <Marker 
            key={camera.id} 
            position={camera.coordinates}
            eventHandlers={{
              click: () => onSelectCamera(camera),
            }}
          >
            <Popup className="custom-popup">
              <div 
                className="w-48 cursor-pointer"
                onClick={() => onSelectCamera(camera)}
              >
                <div className="relative h-28 w-full mb-2 overflow-hidden rounded-lg">
                   <img src={camera.thumbnail} alt={camera.title} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Video className="text-white w-8 h-8 opacity-80" />
                   </div>
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{camera.title}</h3>
                <p className="text-xs text-gray-500">{camera.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};