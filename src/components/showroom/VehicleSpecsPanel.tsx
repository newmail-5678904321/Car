import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Gauge, Zap, Timer, Flame, Shield, Info } from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleSpecsPanelProps {
  vehicle: Vehicle;
  isMobile?: boolean;
}

export const VehicleSpecsPanel: React.FC<VehicleSpecsPanelProps> = ({ vehicle, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (priceUSD?: number) => {
    if (!priceUSD) return '$2,450,000';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(priceUSD);
  };

  const basePriceUSD = vehicle.basePrice?.USD || 2450000;

  return (
    <div className="absolute bottom-6 left-5 sm:left-7 z-20 pointer-events-auto">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="w-[270px] sm:w-[290px] bg-neutral-950/65 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.65)] overflow-hidden"
      >
        {/* Compact Header */}
        <div className="p-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[8.5px] font-mono tracking-[0.2em] text-neutral-400 uppercase truncate">
              {vehicle.category || 'HYPERCAR'} • {vehicle.drivetrain || 'AWD'}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[8.5px] font-mono tracking-widest text-neutral-400 hover:text-white uppercase px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            >
              <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
              {isExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronUp className="w-2.5 h-2.5" />}
            </button>
          </div>

          <h3 className="text-xs font-mono font-medium tracking-wide text-white uppercase truncate mb-2">
            {vehicle.brand} {vehicle.model}
          </h3>

          {/* Primary 4-Metric Grid (Always visible, compact) */}
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px]">
            {/* Power */}
            <div className="flex items-center justify-between px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg">
              <div className="flex items-center gap-1 text-neutral-400">
                <Zap className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-[8px] uppercase">PWR</span>
              </div>
              <span className="text-neutral-100 font-medium">{vehicle.specs?.horsepower || 800} HP</span>
            </div>

            {/* 0-100 */}
            <div className="flex items-center justify-between px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg">
              <div className="flex items-center gap-1 text-neutral-400">
                <Timer className="w-2.5 h-2.5 text-cyan-400" />
                <span className="text-[8px] uppercase">0–100</span>
              </div>
              <span className="text-neutral-100 font-medium">{vehicle.specs?.zeroToHundredKmh || 2.8}s</span>
            </div>

            {/* Top Speed */}
            <div className="flex items-center justify-between px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg">
              <div className="flex items-center gap-1 text-neutral-400">
                <Gauge className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-[8px] uppercase">V-MAX</span>
              </div>
              <span className="text-neutral-100 font-medium">{vehicle.specs?.topSpeedKmh || 340} KM/H</span>
            </div>

            {/* Torque */}
            <div className="flex items-center justify-between px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg">
              <div className="flex items-center gap-1 text-neutral-400">
                <Flame className="w-2.5 h-2.5 text-rose-400" />
                <span className="text-[8px] uppercase">TRQ</span>
              </div>
              <span className="text-neutral-100 font-medium">{vehicle.specs?.torqueNm || 850} NM</span>
            </div>
          </div>
        </div>

        {/* Progressive Expansion Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="px-3 pb-3 pt-2 border-t border-white/[0.06] space-y-1.5 font-mono text-[9px]"
            >
              <div className="flex items-center justify-between text-neutral-400">
                <span className="tracking-wider">POWERTRAIN</span>
                <span className="text-neutral-200 truncate max-w-[140px] text-right font-medium">
                  {vehicle.powertrain || 'V12 HYBRID'}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span className="tracking-wider">STRUCTURE</span>
                <span className="text-neutral-200 truncate max-w-[140px] text-right">
                  {vehicle.specs?.chassisStructure || 'CARBON TUB'}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span className="tracking-wider">DOWNFORCE</span>
                <span className="text-neutral-200">
                  {vehicle.specs?.downforceAt250KmhKg || 450} KG @ 250KM/H
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span className="tracking-wider">CURB WEIGHT</span>
                <span className="text-neutral-200">
                  {vehicle.specs?.weightKg || 1420} KG
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.06] text-amber-400/90">
                <span className="tracking-wider uppercase text-[8px]">EST. BASE MSRP</span>
                <span className="text-[10px] font-semibold text-white">
                  {formatPrice(basePriceUSD)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
