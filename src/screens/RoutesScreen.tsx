import { Search, History, Bus, Briefcase, MapPin, MoveRight, ChevronRight, Navigation } from 'lucide-react';
import { RECENT_SEARCHES, NEARBY_ROUTES, IMAGES } from '../constants';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function RoutesScreen() {
  const navigate = useNavigate();

  return (
    <main className="pt-20 pb-24 px-4 max-w-5xl mx-auto min-h-screen bg-surface-dim">
      {/* Search Header */}
      <section className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
            <Search className="w-5 h-5" />
          </div>
          <input 
            className="w-full h-12 bg-white border border-outline rounded-lg pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium" 
            placeholder="Search Route No or Place" 
            type="text" 
          />
        </div>
      </section>

      {/* Grid of Options */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4 px-1">Recent Searches</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RECENT_SEARCHES.map((search, idx) => (
            <motion.div 
              key={idx}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-3 rounded-lg flex items-center gap-3 border border-outline shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className={`w-9 h-9 rounded-md flex items-center justify-center ${search.color === 'primary-container' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {search.icon === 'history' && <History className="w-5 h-5" />}
                {search.icon === 'directions_bus' && <Bus className="w-5 h-5" />}
                {search.icon === 'near_me' && <Navigation className="w-5 h-5 fill-current" />}
                {search.icon === 'work' && <Briefcase className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">{search.route}</p>
                <p className="text-[10px] text-on-surface-variant truncate font-medium">{search.path}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Lists Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-lg font-bold text-on-surface">Nearby Routes</h2>
          </div>

          {NEARBY_ROUTES.map((route) => (
            <motion.div 
              key={route.id}
              whileTap={{ scale: 0.99 }}
              className={`bg-white p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-outline shadow-sm group cursor-pointer hover:border-primary transition-all`}
              onClick={() => navigate(`/stop/SB-04`)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${route.color === 'primary-container' ? 'bg-primary' : 'bg-surface-container-high'} rounded-lg flex flex-col items-center justify-center text-white`}>
                  <span className={`font-bold text-base ${route.color === 'primary-container' ? 'text-white' : 'text-on-surface'}`}>{route.id === 'V335E' ? 'V-335E' : route.route}</span>
                  <span className={`text-[8px] uppercase font-bold tracking-tight ${route.color === 'primary-container' ? 'text-white/80' : 'text-on-surface-variant'}`}>{route.type || 'Route'}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-on-surface font-bold">{route.from}</span>
                    <MoveRight className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-on-surface font-bold">{route.to}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {route.live !== 'No live tracking' && <span className="pulse-dot bg-tertiary"></span>}
                      <span className={`text-[11px] font-bold ${route.live !== 'No live tracking' ? 'text-tertiary' : 'text-on-surface-variant italic'}`}>
                        {route.live}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant">{route.frequency}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <p className="text-[9px] text-on-surface-variant uppercase font-bold">Arrival (Next)</p>
                  <p className="text-base font-bold text-primary">{route.next}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Help/Info */}
        <div className="hidden lg:block space-y-4">
          <div className="bg-white rounded-lg border border-outline shadow-sm p-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Latest Info</h3>
            <div className="aspect-video rounded-lg overflow-hidden relative mb-4 border border-outline">
              <img className="w-full h-full object-cover grayscale opacity-80" src={IMAGES.mapPreview} alt="Map preview" />
            </div>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              Minor delays on several routes due to traffic at Bidar Depo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
