import React from 'react';
import { Camera } from '../types';
import { MapPin, Eye, Radio } from 'lucide-react';
import { cn } from '../utils/cn'; // We'll create a utility or use clsx directly here if utils not preferred, let's use clsx inline or simple helper

interface CameraListProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera) => void;
}

export const CameraList: React.FC<CameraListProps> = ({ cameras, selectedCamera, onSelectCamera }) => {
  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-md shadow-2xl md:w-96 w-full">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          Сочи Онлайн
        </h1>
        <p className="text-sm text-gray-500 mt-1">Выберите камеру для просмотра</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            onClick={() => onSelectCamera(camera)}
            className={`group relative flex gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer border hover:shadow-lg ${selectedCamera?.id === camera.id ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-transparent hover:border-gray-200'}`}
          >
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
              <img 
                src={camera.thumbnail} 
                alt={camera.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {camera.isLive && (
                <div className="absolute top-1 left-1 bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                  <Radio size={8} /> LIVE
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                {camera.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <MapPin size={12} />
                {camera.location}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                <Eye size={12} />
                {camera.views} зрителей
              </div>
            </div>

            {selectedCamera?.id === camera.id && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
        © 2024 Sochi Cams Project
      </div>
    </div>
  );
};