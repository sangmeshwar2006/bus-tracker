import React from 'react';
import { ArrowRight, Bus, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-primary opacity-[0.03] transit-pattern"></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Government Emblem or Logo Placeholder */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-xl mb-4">
            <Bus className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-1">
              Bidar Transit
            </h1>
            <h2 className="text-xl font-bold text-primary uppercase tracking-widest">
              Where is My Bus
            </h2>
          </div>
        </div>

        <div className="bg-white border border-outline rounded-xl p-6 shadow-sm space-y-4">
          <p className="text-on-surface-variant font-medium leading-relaxed">
            Get real-time tracking for Bidar's public transport.
          </p>
          
          <div className="grid grid-cols-3 gap-2">
            <FeatureIcon icon={<MapPin className="w-5 h-5" />} label="Live" />
            <FeatureIcon icon={<Search className="w-5 h-5" />} label="Search" />
            <FeatureIcon icon={<Bus className="w-5 h-5" />} label="Routes" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Username / Phone" 
              className="w-full bg-white border border-outline rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white border border-outline rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-md group"
          >
            Enter App
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
            A government of karnataka initiative
          </p>
        </div>
      </motion.div>

      {/* Version Tag */}
      <div className="absolute bottom-6 text-[10px] font-bold text-on-surface-variant/40">
        VERSION 2.4.0 • KSRTC OFFICIAL
      </div>
    </main>
  );
}

function FeatureIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-primary border border-outline/50">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{label}</span>
    </div>
  );
}
