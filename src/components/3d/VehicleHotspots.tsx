import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Zap, 
  Wind, 
  Shield, 
  Disc, 
  Eye, 
  Gauge, 
  Sparkles, 
  Compass, 
  BatteryCharging, 
  Layers 
} from 'lucide-react';
import { Vehicle } from '../../types';
import { getVehicleHotspots } from '../../data/vehicle3DRegistry';

interface VehicleHotspotsProps {
  vehicle: Vehicle;
  visible?: boolean;
}

const ICON_MAP = {
  wind: Wind,
  zap: Zap,
  shield: Shield,
  disc: Disc,
  eye: Eye,
  gauge: Gauge,
  sparkles: Sparkles,
  compass: Compass,
  battery: BatteryCharging,
  layers: Layers,
};

export const VehicleHotspots: React.FC<VehicleHotspotsProps> = ({ vehicle, visible = true }) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  if (!visible) return null;

  const hotspots = getVehicleHotspots(vehicle);

  return (
    <group>
      {hotspots.map((hotspot) => {
        const isSelected = activeHotspotId === hotspot.id;
        const Icon = ICON_MAP[hotspot.iconName] || Zap;
        const isHighAnchor = hotspot.position[1] > 0.8;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html
              center
              distanceFactor={7.5}
              zIndexRange={[50, 0]}
              className="select-none pointer-events-auto"
            >
              <div className="relative flex items-center justify-center">
                {/* Compact 3D Hotspot Trigger Button (18px diameter) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspotId(isSelected ? null : hotspot.id);
                  }}
                  aria-label={`Inspect ${hotspot.title}`}
                  className="group relative flex items-center justify-center w-6 h-6 rounded-full focus:outline-none"
                >
                  {/* Subtle Concentric Pulse Ring */}
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-cyan-400/30 scale-125 ring-1.5 ring-cyan-400'
                        : 'bg-white/10 group-hover:bg-cyan-400/20 group-hover:scale-110'
                    }`}
                  />
                  {/* Outer Glass Capsule */}
                  <span className="relative flex items-center justify-center w-4.5 h-4.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:border-cyan-400 transition-colors">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]' : 'bg-white'
                      }`}
                    />
                  </span>
                </button>

                {/* Compact Floating Tooltip (Positioned intelligently offset from vehicle center) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94, y: isHighAnchor ? -6 : 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: isHighAnchor ? -6 : 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute ${
                        isHighAnchor ? 'bottom-8' : 'top-8'
                      } left-1/2 -translate-x-1/2 z-50 w-60 p-3 bg-neutral-950/90 backdrop-blur-xl border border-white/[0.12] rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.8)] text-left font-sans`}
                    >
                      {/* Tooltip Header */}
                      <div className="flex items-start justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-1">
                          <Icon className="w-3 h-3 text-cyan-400" />
                          <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                            {hotspot.category}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(null);
                          }}
                          aria-label="Close Hotspot"
                          className="p-0.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <h4 className="text-[10.5px] font-mono font-medium tracking-wide text-white uppercase mb-1.5">
                        {hotspot.title}
                      </h4>

                      <p className="text-[9.5px] text-neutral-300 leading-relaxed font-sans mb-2">
                        {hotspot.description}
                      </p>

                      {/* Technical Metric Highlight */}
                      <div className="flex items-center justify-between px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md font-mono">
                        <span className="text-[8px] tracking-wider text-neutral-400 uppercase">
                          {hotspot.metricLabel}
                        </span>
                        <span className="text-[9px] tracking-wider font-semibold text-cyan-300">
                          {hotspot.metricValue}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
