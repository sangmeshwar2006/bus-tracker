import { Menu, Map as MapIcon, Bus, Bell, Bookmark, Route, LocateFixed } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { IMAGES } from '../constants';

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 gov-header h-16 flex justify-between items-center px-4">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold tracking-tight">Bidar Transit</span>
        <div className="h-6 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>
        <h1 className="text-lg font-medium hidden sm:block">Where is My Bus</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95 text-white">
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-outline h-20 px-4 pb-safe flex justify-around items-center shadow-lg">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? 'text-primary border-t-4 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <MapIcon className="w-6 h-6" />
        <span className="text-[11px] font-bold mt-1">Live Map</span>
      </NavLink>
      <NavLink 
        to="/routes" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? 'text-primary border-t-4 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <Bus className="w-6 h-6" />
        <span className="text-[11px] font-bold mt-1">Routes</span>
      </NavLink>
      <NavLink 
        to="/alerts" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? 'text-primary border-t-4 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <Bell className="w-6 h-6" />
        <span className="text-[11px] font-bold mt-1">Alerts</span>
      </NavLink>
      <NavLink 
        to="/saved" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? 'text-primary border-t-4 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <Bookmark className="w-6 h-6" />
        <span className="text-[11px] font-bold mt-1">Saved</span>
      </NavLink>
    </nav>
  );
}

export function FloatingActionButton() {
  return (
    <NavLink 
      to="/routes"
      className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-all hover:brightness-110"
    >
      <Route className="w-8 h-8" />
    </NavLink>
  );
}
