import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Star, Share2, MapPin, Route as RouteIcon, Info, User } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMAGES, STOP_ARRIVALS } from '../constants';

// Custom Pin Icon
const pinIcon = L.divIcon({
  className: 'custom-stop-icon',
  html: `
    <div class="bg-white p-2 rounded-full shadow-lg border-2 border-[#0056b3]">
      <div class="bg-[#0056b3] p-1.5 rounded-full text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function StopScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  // Central Bus Stand location
  const stopPosition: [number, number] = [17.9143, 77.5042];

  return (
    <main className="pt-20 px-4 max-w-4xl mx-auto space-y-6 pb-32 bg-surface-dim min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-3">
          <button 
            className="text-primary hover:bg-white p-2 rounded-full border border-outline bg-white shadow-sm active:scale-95 transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-on-surface">Stop Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full border transition-all ${isSaved ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline shadow-sm'}`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stop Branding */}
      <section className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black text-on-surface leading-tight">Bidar Central Bus Stand</h2>
            <p className="text-on-surface-variant font-bold text-base flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-tertiary" />
              Towards Bidar Fort
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-outline shadow-sm flex flex-col items-center">
            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest opacity-60">ID</span>
            <span className="text-xl font-black text-primary">{id || 'BDR-1'}</span>
          </div>
        </div>

        {/* Map Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-64 rounded-lg overflow-hidden border border-outline relative shadow-md bg-white">
            <MapContainer
              center={stopPosition}
              zoom={16}
              zoomControl={false}
              style={{ width: '100%', height: '100%', zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={stopPosition} icon={pinIcon} />
            </MapContainer>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-[1000]"></div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none z-[1000]">
              <div className="bg-primary p-2 rounded-md shadow-md border border-white/20">
                <RouteIcon className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-white text-xs font-bold drop-shadow-md">Verified Location</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex-1 flex items-center justify-center gap-3 rounded-lg font-bold text-base shadow-sm border transition-all ${isSaved ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline hover:bg-surface-container'}`}
            >
              <Star className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save Stop'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-white text-on-surface rounded-lg font-bold text-base border border-outline hover:bg-surface-container transition-all shadow-sm">
              <Share2 className="w-5 h-5 text-on-surface-variant" />
              Share ETA
            </button>
          </div>
        </div>
      </section>

      {/* Arrival List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold text-on-surface">Upcoming Arrivals</h3>
          <div className="flex items-center gap-2 text-tertiary">
            <span className="pulse-dot bg-tertiary"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">LIVE</span>
          </div>
        </div>
        <div className="space-y-2">
          {STOP_ARRIVALS.map((arrival) => (
            <div 
              key={arrival.id}
              onClick={() => navigate(`/tracking/${arrival.id}`)}
              className="bg-white rounded-lg p-3.5 flex items-center justify-between border border-outline shadow-sm hover:border-primary cursor-pointer transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${arrival.color === 'primary-container' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface'} flex items-center justify-center rounded-lg font-bold text-lg border border-black/5`}>
                  {arrival.id}
                </div>
                <div>
                  <h4 className="text-base font-bold text-on-surface leading-tight mb-1">{arrival.destination}</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant text-[11px] font-medium">
                    {arrival.distance}
                    <span className="w-1 h-1 bg-outline rounded-full"></span>
                    <span className={arrival.traffic === 'Heavy Traffic' ? 'text-secondary font-bold' : 'text-tertiary font-bold'}>{arrival.traffic}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-primary leading-none">{arrival.eta}</div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-70 leading-none mt-0.5">{arrival.etaUnit}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
