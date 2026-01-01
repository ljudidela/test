import React from 'react';
import { Camera } from '../types';
import { X, Maximize2, Share2 } from 'lucide-react';

interface VideoModalProps {
  camera: Camera | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ camera, onClose }) => {
  if (!camera) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
          <div>
            <h2 className="text-white font-bold text-lg drop-shadow-md">{camera.title}</h2>
            <p className="text-white/80 text-sm drop-shadow-md">{camera.location}</p>
          </div>
          <button 
            onClick={onClose} 
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Placeholder */}
        <div className="aspect-video w-full bg-gray-900 relative group">
          <img 
            src={camera.thumbnail} 
            alt={camera.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center pl-1 animate-pulse">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent"></div>
             </div>
          </div>
          
          {/* Live Indicator */}
          {camera.isLive && (
             <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                В ЭФИРЕ
             </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="text-white/80 text-xs">Сигнал стабильный • 1080p</div>
             <div className="flex gap-3">
                <button className="text-white hover:text-blue-400 transition-colors"><Share2 size={20} /></button>
                <button className="text-white hover:text-blue-400 transition-colors"><Maximize2 size={20} /></button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};