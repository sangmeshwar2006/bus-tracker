import { useState, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header, BottomNav, FloatingActionButton } from './components/Navigation';
import MapScreen from './screens/MapScreen';
import RoutesScreen from './screens/RoutesScreen';
import TrackingScreen from './screens/TrackingScreen';
import StopScreen from './screens/StopScreen';
import LoginScreen from './screens/LoginScreen';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <div className="flex-1 relative">
        {children}
      </div>
      <BottomNav />
      <FloatingActionButton />
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MapScreen />} />
          <Route path="/routes" element={<RoutesScreen />} />
          <Route path="/tracking/:id" element={<TrackingScreen />} />
          <Route path="/stop/:id" element={<StopScreen />} />
          {/* Placeholder for other routes */}
          <Route path="/alerts" element={<div className="pt-24 px-4 text-center text-on-surface-variant uppercase font-black tracking-widest opacity-50">No Active Alerts</div>} />
          <Route path="/saved" element={<div className="pt-24 px-4 text-center text-on-surface-variant uppercase font-black tracking-widest opacity-50">Saved Content Empty</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
