import React from 'react';
import { Camera } from '../types';
import { MapPin, Video, WifiOff } from 'lucide-react';

interface Props {
  camera: Camera;
  isActive: boolean;
  onClick: () => void;
}

export const CameraCard: React.FC<Props> = ({ camera, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border
        ${isActive 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20' 
          : 'border-transparent hover:border-gray-200 hover:shadow-md bg-white'}
      `}
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={camera.previewUrl} 
          alt={camera.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          {camera.status === 'online' ? (
            <span className="flex items-center gap-1 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <Video size={12} /> LIVE
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-red-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <WifiOff size={12} /> OFF
            </span>
          )}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{camera.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} />
          <span>{camera.location}</span>
        </div>
      </div>
    </div>
  );
};