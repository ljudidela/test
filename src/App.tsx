import { useState } from 'react';
import { CameraMap } from './components/CameraMap';
import { CameraList } from './components/CameraList';
import { VideoModal } from './components/VideoModal';
import { cameras } from './data/cameras';
import { Camera } from './types';
import { Menu, Map as MapIcon } from 'lucide-react';

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map'); // For mobile

  const handleSelectCamera = (camera: Camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden relative">
      
      {/* Mobile Toggle Buttons */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] flex bg-white rounded-full shadow-xl p-1 border border-gray-200">
        <button 
          onClick={() => setViewMode('map')} 
          className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          <MapIcon size={18} /> Карта
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          <Menu size={18} /> Список
        </button>
      </div>

      {/* Sidebar - Desktop: Always visible (toggleable), Mobile: Conditional */}
      <div className={`
        fixed md:relative z-[400] h-full transition-transform duration-300 ease-in-out
        ${viewMode === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${!isSidebarOpen && 'md:-translate-x-full md:absolute'}
      `}>
        <CameraList 
          cameras={cameras} 
          selectedCamera={selectedCamera} 
          onSelectCamera={handleSelectCamera} 
        />
        
        {/* Desktop Collapse Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex absolute -right-10 top-6 bg-white p-2 rounded-r-lg shadow-md border-y border-r border-gray-100 text-gray-600 hover:text-blue-600"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative h-full w-full">
        <CameraMap 
          cameras={cameras} 
          selectedCamera={selectedCamera} 
          onSelectCamera={handleSelectCamera}
        />
      </div>

      {/* Video Modal Overlay */}
      {selectedCamera && (
        <VideoModal 
          camera={selectedCamera} 
          onClose={() => setSelectedCamera(null)} 
        />
      )}
    </div>
  );
}

export default App;