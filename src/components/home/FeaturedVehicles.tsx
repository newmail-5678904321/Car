import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { VEHICLES_DATABASE } from '../../data/vehicles';
import { VehicleShowroom } from '../showroom/VehicleShowroom';
import { Vehicle } from '../../types';

export const FeaturedVehicles: React.FC = () => {
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);

  const scrollToDiscovery = () => {
    const el = document.getElementById('discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="models" className="py-32 px-6 lg:px-12 bg-obsidian relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-technical text-accent mb-4 block">The Lineup</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">
                Engineering Excellence
              </h2>
            </div>
            <Button variant="outline" onClick={scrollToDiscovery}>
              View All Models ({VEHICLES_DATABASE.length})
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VEHICLES_DATABASE.slice(0, 3).map((vehicle, index) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setActiveVehicle(vehicle)}
                className="group relative cursor-pointer"
              >
                {/* Card Container */}
                <div className="relative aspect-[4/5] bg-neutral-950 rounded-lg overflow-hidden border border-neutral-900 transition-colors duration-500 group-hover:border-neutral-700">
                  
                  {/* Visual Background Accent */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                     <div 
                       className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full blur-3xl"
                       style={{ background: `radial-gradient(circle, ${vehicle.accentColor} 0%, transparent 70%)` }}
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-technical text-neutral-600 rotate-90 tracking-[0.3em] opacity-50">
                          {vehicle.brand.toUpperCase()} {vehicle.model.toUpperCase()}
                        </span>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-technical text-accent block mb-1">{vehicle.category}</span>
                        <h3 className="text-2xl font-display text-white mb-1">{vehicle.brand} {vehicle.model}</h3>
                        <p className="text-sm text-neutral-500">{vehicle.bodyType} • {vehicle.powertrain}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="glass-panel-subtle p-4 rounded backdrop-blur-md">
                      <div className="flex justify-between items-center text-xs text-neutral-400 font-mono mb-2">
                        <span>POWER</span>
                        <span className="text-white">{vehicle.specs.horsepower} BHP</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                        <span>0-100 KM/H</span>
                        <span className="text-white">{vehicle.specs.zeroToHundredKmh}S</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic 3D Showroom Modal for Selected Lineup Vehicle */}
      <AnimatePresence>
        {activeVehicle && (
          <VehicleShowroom
            vehicle={activeVehicle}
            onClose={() => setActiveVehicle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
