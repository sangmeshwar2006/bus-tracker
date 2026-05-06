import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Gauge, Users, RotateCw, BellRing, ChevronRight, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMAGES, MOCK_BUSES } from '../constants';

// Helper to recenter map
function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// Custom Bus Icon
const busIcon = (color: string) => L.divIcon({
  className: 'custom-bus-tracking-icon',
  html: `
    <div class="p-2 rounded-lg flex flex-col items-center shadow-xl ${color === 'red' ? 'bg-[#dc3545]' : 'bg-[#0056b3]'}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1.33 1-3c0-4.67-3.67-8-8-8H7c-4.33 0-8 3.33-8 8 0 1.67 1 3 1 3h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      <div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#198754] rounded-full border-2 border-white animate-pulse"></div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

export default function TrackingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialBus = MOCK_BUSES.find(b => b.id === id) || MOCK_BUSES[0];
  const [bus, setBus] = useState(() => ({
    ...initialBus,
    heading: Math.random() * 360
  }));
  const [alertEnabled, setAlertEnabled] = useState(false);

  // Simulate movement for this specific bus
  useEffect(() => {
    const interval = setInterval(() => {
      setBus((prev) => {
        const speed = 0.00008;
        const angleRad = (prev.heading * Math.PI) / 180;
        
        const newLat = prev.position.lat + Math.cos(angleRad) * speed;
        const newLng = prev.position.lng + Math.sin(angleRad) * speed;
        const newHeading = prev.heading + (Math.random() - 0.5) * 5;

        return {
          ...prev,
          position: { lat: newLat, lng: newLng },
          heading: newHeading
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-20 px-4 max-w-4xl mx-auto space-y-4 pb-32 bg-surface-dim min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 px-1">
        <button 
          className="text-primary hover:bg-white p-2 rounded-full border border-outline bg-white shadow-sm active:scale-95 transition-all"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-on-surface">Live Tracking</h1>
      </div>

      {/* Map Section */}
      <section className="relative h-64 w-full rounded-lg overflow-hidden border border-outline shadow-md bg-surface">
        <MapContainer
          center={[bus.position.lat, bus.position.lng]}
          zoom={15}
          zoomControl={false}
          style={{ width: '100%', height: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={[bus.position.lat, bus.position.lng]} 
            icon={busIcon(bus.color)}
          />
          <RecenterMap center={[bus.position.lat, bus.position.lng]} />
        </MapContainer>
      </section>

      {/* Bus Header */}
      <div className="bg-white border border-outline rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Vehicle No</span>
            <h2 className="text-2xl font-black text-on-surface">{bus.plate}</h2>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-bold text-sm">
              <span>Bus Stand</span>
              <ChevronRight className="w-4 h-4" />
              <span>Bidar Fort</span>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-right">
            <p className="text-[9px] font-bold text-primary uppercase tracking-tighter">Status</p>
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <span className="pulse-dot bg-primary"></span>
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-primary text-white rounded-lg p-6 flex flex-col justify-center relative overflow-hidden shadow-md">
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">Next Stop Arrival</p>
          <h3 className="text-5xl font-black leading-none mb-3">08 MIN</h3>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="text-base font-bold">Guru Nanak Gate</span>
          </div>
        </div>

        <div className="bg-white border border-outline rounded-lg p-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <InfoRow icon={<Gauge className="w-4 h-4 text-tertiary" />} label="Speed" value="42 km/h" />
            <InfoRow icon={<Users className="w-4 h-4 text-blue-600" />} label="Occupancy" value="MEDIUM" />
            <InfoRow icon={<RotateCw className="w-4 h-4 text-on-surface-variant" />} label="Updated" value="30s ago" />
          </div>
          <button 
            onClick={() => setAlertEnabled(!alertEnabled)}
            className={`w-full py-2.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-4 border ${alertEnabled ? 'bg-tertiary text-white border-tertiary' : 'bg-white text-primary border-primary hover:bg-primary-container'}`}
          >
            <BellRing className="w-4 h-4" />
            {alertEnabled ? 'Alert Set' : 'Set Arrival Alert'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border border-outline rounded-lg p-6 shadow-sm">
        <h4 className="text-base font-bold text-on-surface mb-6 border-b border-outline pb-2">Route Progress</h4>
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-1 bg-surface-container-high rounded-full" />
          <div className="absolute left-[11px] top-2 h-[45%] w-1 bg-primary rounded-full z-10" />
          <div className="space-y-10 relative pb-2">
            <StopItem label="Bidar Depo" sub="Departed 14:10" passed />
            <StopItem label="Central Bus Stand" sub="Departed 14:22" passed />
            
            <div className="absolute left-[-5px] top-[45%] z-30 flex items-center gap-4">
              <div className="w-9 h-9 bg-primary shadow-md rounded-full border-2 border-white flex items-center justify-center">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <span className="bg-white py-1 px-3 border border-outline rounded-md text-[10px] font-bold text-primary shadow-sm uppercase tracking-tight">Between Stops</span>
            </div>

            <StopItem label="Guru Nanak Gate" sub="14:38 Expected" next />
            <StopItem label="Bidar Fort" sub="Scheduled 14:45" />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-on-surface-variant font-medium">{label}</span>
      </div>
      <span className="font-bold text-on-surface">{value}</span>
    </div>
  );
}

function StopItem({ label, sub, passed = false, next = false }: { label: string, sub: string, passed?: boolean, next?: boolean }) {
  return (
    <div className={`flex items-start gap-6 ${passed ? 'opacity-40' : 'opacity-100'}`}>
      <div className={`w-5.5 h-5.5 rounded-full border-2 border-white flex-shrink-0 z-20 shadow-sm ${passed ? 'bg-primary' : next ? 'bg-white ring-2 ring-primary' : 'bg-surface-container-high'}`} />
      <div className="flex-grow pb-1 border-b border-outline/30">
        <div className="flex justify-between items-center">
          <span className={`font-bold text-xs ${next ? 'text-primary' : 'text-on-surface'}`}>{label}</span>
          <span className="text-[10px] font-medium text-on-surface-variant">{sub}</span>
        </div>
      </div>
    </div>
  );
}
