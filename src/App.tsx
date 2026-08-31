import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { FeaturedVehicles } from './components/home/FeaturedVehicles';
import { VehicleDiscovery } from './components/discovery/VehicleDiscovery';
import { LoadingSequence } from './components/ui/LoadingSequence';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="bg-obsidian min-h-screen text-platinum selection:bg-accent selection:text-obsidian">
      <LoadingSequence onComplete={() => setIsReady(true)} />
      
      <Navbar />
      
      <main>
        <Hero isReady={isReady} />
        
        {/* Transitional divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        
        <FeaturedVehicles />

        {/* Transitional divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        
        <VehicleDiscovery />
      </main>

      <Footer />
    </div>
  );
};

export default App;
