import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Zap, Gauge } from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer flex flex-col h-full bg-[#050505] border border-neutral-900 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors duration-500"
    >
      {/* Visual Header */}
      <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-8">
        <div className="w-full h-full opacity-20 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br from-neutral-800 to-transparent rounded-full blur-3xl absolute" />
        <span className="text-technical text-neutral-700 rotate-0 tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 relative z-10 text-center uppercase text-sm">
          {vehicle.brand}<br/><span className="text-xl text-neutral-300">{vehicle.model}</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-technical text-accent block mb-1">{vehicle.category}</span>
            <h3 className="text-xl font-display text-white">{vehicle.brand} {vehicle.model}</h3>
          </div>
          <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1 flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> Power
            </span>
            <span className="text-sm font-mono text-neutral-300">{vehicle.specs.horsepower} BHP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1 flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> Torque
            </span>
            <span className="text-sm font-mono text-neutral-300">{vehicle.specs.torqueNm} NM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1 flex items-center gap-1.5">
              <Gauge className="w-3 h-3" /> 0-100
            </span>
            <span className="text-sm font-mono text-neutral-300">{vehicle.specs.zeroToHundredKmh}s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1 flex items-center gap-1.5">
              <ArrowRight className="w-3 h-3" /> Top Speed
            </span>
            <span className="text-sm font-mono text-neutral-300">{vehicle.specs.topSpeedKmh} km/h</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-900 flex justify-between items-center">
          <span className="text-[10px] tracking-widest uppercase text-neutral-500">MSRP</span>
          <span className="text-sm font-mono text-white">{formatPrice(vehicle.basePrice.USD)}</span>
        </div>
      </div>
    </motion.div>
  );
};
