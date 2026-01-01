import { useState } from 'react';
import { cameras } from './data/cameras';
import { Camera } from './types';
import { Map } from './components/Map';
import { CameraCard } from './components/CameraCard';
import { Webcam, Menu, X } from 'lucide-react';

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          absolute z-20 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col
          md:relative md:translate-x-0 w-full md:w-96
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:opacity-0 md:overflow-hidden'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 text-blue-600">
            <Webcam className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">Sochi<span className="text-gray-800">Cams</span></h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Camera List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cameras.map((camera) => (
            <CameraCard
              key={camera.id}
              camera={camera}
              isActive={selectedCamera?.id === camera.id}
              onClick={() => {
                setSelectedCamera(camera);
                // On mobile, close sidebar after selection to see map
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
            />
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t text-xs text-center text-gray-400">
          © 2024 Sochi Webcams Project
        </div>
      </aside>

      {/* Main Content (Map) */}
      <main className="flex-1 relative h-full">
        {/* Mobile Toggle Button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 text-blue-600 transition-transform hover:scale-105"
          >
            <Menu size={24} />
          </button>
        )}

        <Map 
          cameras={cameras} 
          selectedCamera={selectedCamera} 
          onSelect={setSelectedCamera} 
        />

        {/* Overlay for selected camera stream (Simulation) */}
        {selectedCamera && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 animate-in slide-in-from-bottom-10 fade-in duration-300">
             <div className="flex justify-between items-start mb-2">
               <div>
                 <h2 className="font-bold text-lg">{selectedCamera.name}</h2>
                 <p className="text-sm text-gray-500">{selectedCamera.location}</p>
               </div>
               <button 
                 onClick={() => setSelectedCamera(null)}
                 className="p-1 hover:bg-gray-200 rounded-full"
               >
                 <X size={18} />
               </button>
             </div>
             <div className="aspect-video bg-black rounded-lg overflow-hidden relative group">
                <img 
                  src={selectedCamera.previewUrl} 
                  alt="Live View" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE STREAM
                  </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;