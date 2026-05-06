import React, { useEffect, useState } from 'react';
import { Search, Mic, Layers, Navigation, Bus, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_BUSES } from '../constants';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

// Custom Bus Icon Creator
const createBusIcon = (color: string, plate: string) => {
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `
      <div class="p-1.5 rounded-lg flex flex-col items-center shadow-lg transition-transform hover:scale-110 ${color === 'red' ? 'bg-[#dc3545]' : 'bg-[#0056b3]'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1.33 1-3c0-4.67-3.67-8-8-8H7c-4.33 0-8 3.33-8 8 0 1.67 1 3 1 3h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
        <div class="bg-white/90 px-1 rounded-sm mt-1 border border-black/10 leading-none">
          <span style="font-size: 8px; font-weight: 800; text-transform: uppercase; color: ${color === 'red' ? '#dc3545' : '#0056b3'}">
            ${plate}
          </span>
        </div>
        <div class="absolute -bottom-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${color === 'red' ? 'border-t-[#dc3545]' : 'border-t-[#0056b3]'}"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

export default function MapScreen() {
  const navigate = useNavigate();
  // Initialize heading for each bus
  const [buses, setBuses] = useState(() => 
    MOCK_BUSES.map(bus => ({
      ...bus,
      heading: Math.random() * 360
    }))
  );

  // Simulate bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((currentBuses) =>
        currentBuses.map((bus) => {
          // Calculate movement based on heading
          const speed = 0.0001; // Movement speed
          const angleRad = (bus.heading * Math.PI) / 180;
          
          const newLat = bus.position.lat + Math.cos(angleRad) * speed;
          const newLng = bus.position.lng + Math.sin(angleRad) * speed;
          
          // Randomly change heading slightly
          const newHeading = bus.heading + (Math.random() - 0.5) * 10;

          return {
            ...bus,
            position: { lat: newLat, lng: newLng },
            heading: newHeading
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="absolute inset-0 z-0 overflow-hidden bg-surface">
      <div className="relative w-full h-full">
        <MapContainer
          center={[17.9143, 77.5042]}
          zoom={14}
          zoomControl={false}
          style={{ width: '100%', height: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {buses.map((bus) => (
            <Marker
              key={bus.id}
              position={[bus.position.lat, bus.position.lng]}
              icon={createBusIcon(bus.color, bus.plate)}
              eventHandlers={{
                click: () => navigate(`/tracking/${bus.id}`),
              }}
            />
          ))}
          <ZoomControl position="bottomright" />
        </MapContainer>

        {/* Search Bar */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md z-[1000]">
          <div className="bg-white p-1 rounded-lg flex items-center shadow-lg border border-outline/50 backdrop-blur-sm bg-white/95">
            <Search className="text-on-surface-variant ml-3 w-5 h-5" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full px-3 py-2 text-sm font-medium" 
              placeholder="Search route or stop" 
              type="text" 
              defaultValue="Central Bus Stand"
            />
            <button className="p-2 text-primary hover:bg-surface-container rounded-md">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Chip */}
        <div className="absolute top-36 right-4 z-[1000]">
          <div className="bg-white/90 backdrop-blur-sm border border-outline/50 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
            <span className="pulse-dot bg-tertiary"></span>
            <span className="text-tertiary text-[10px] font-bold tracking-wider">LIVE FEED</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 bottom-48 flex flex-col gap-2 z-[1000]">
          <button className="w-11 h-11 rounded-full flex items-center justify-center bg-white text-on-surface border border-outline shadow-lg active:scale-95 transition-all">
            <Layers className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full flex items-center justify-center bg-white text-primary border border-outline shadow-lg active:scale-95 transition-all">
            <Navigation className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Bottom Stop Info */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-24 left-0 w-full px-4 z-[1000] md:left-4 md:w-[360px]"
        >
          <div className="gov-card p-4 shadow-2xl">
            <div 
              className="flex justify-between items-start mb-3 cursor-pointer hover:bg-surface-container rounded-md p-1 -m-1 transition-colors"
              onClick={() => navigate('/stop/BDR-1')}
            >
              <div>
                <h3 className="text-base font-bold text-primary">Guru Nanak Gate</h3>
                <p className="text-on-surface-variant text-[11px] font-medium uppercase tracking-tight">320m away • Towards Bidar Fort</p>
              </div>
              <ChevronRight className="text-on-surface-variant w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              {buses.map(bus => (
                <div 
                  key={bus.id} 
                  className="flex items-center justify-between p-2.5 bg-surface-container rounded-md border border-outline/50 hover:border-primary cursor-pointer transition-all group"
                  onClick={() => navigate(`/tracking/${bus.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${bus.color === 'red' ? 'bg-secondary' : 'bg-primary'} text-white w-10 h-8 flex items-center justify-center rounded font-bold text-xs shadow-sm`}>
                      {bus.route}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{bus.destination}</p>
                      <p className="text-[10px] font-medium text-on-surface-variant">
                        {bus.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-black tracking-tighter ${bus.color === 'red' ? 'text-secondary' : 'text-primary'}`}>{bus.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
