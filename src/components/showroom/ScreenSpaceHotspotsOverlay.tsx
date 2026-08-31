import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Zap, Wind, Shield, Disc, Eye, Gauge, Compass, BatteryCharging, Layers } from 'lucide-react';
import { ProjectedScreenHotspot } from '../3d/ScreenSpaceHotspotTracker';
import { ExplodedComponentData } from '../../data/explodedParts';

interface ScreenSpaceHotspotsOverlayProps {
  hotspots: ProjectedScreenHotspot[];
  activeExplodedPartId?: string | null;
  onSelectExplodedPart?: (part: ExplodedComponentData) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

export const ScreenSpaceHotspotsOverlay: React.FC<ScreenSpaceHotspotsOverlayProps> = ({
  hotspots,
  activeExplodedPartId,
  onSelectExplodedPart,
}) => {
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [selectedFeatureHotspotId, setSelectedFeatureHotspotId] = useState<string | null>(null);

  if (!hotspots || hotspots.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {hotspots.map((hotspot) => {
        if (!hotspot.isVisible) return null;

        const isHovered = hoveredHotspotId === hotspot.id;
        const isSelected =
          hotspot.type === 'EXPLODED'
            ? activeExplodedPartId === hotspot.id
            : selectedFeatureHotspotId === hotspot.id;

        const IconComponent =
          hotspot.data?.iconName && ICON_MAP[hotspot.data.iconName]
            ? ICON_MAP[hotspot.data.iconName]
            : Sparkles;

        return (
          <div
            key={hotspot.id}
            style={{
              left: `${hotspot.screenX}%`,
              top: `${hotspot.screenY}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {/* Fixed-Size 14px Circular Hotspot Trigger (Never scales with 3D camera zoom) */}
            <button
              id={`screen-hotspot-${hotspot.id}`}
              onClick={(e) => {
                e.stopPropagation();
                if (hotspot.type === 'EXPLODED') {
                  if (onSelectExplodedPart && hotspot.data) {
                    onSelectExplodedPart(hotspot.data as ExplodedComponentData);
                  }
                } else {
                  setSelectedFeatureHotspotId(isSelected ? null : hotspot.id);
                }
              }}
              onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
              onMouseLeave={() => setHoveredHotspotId(null)}
              aria-label={`Select ${hotspot.name}`}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer"
            >
              {/* Subtle Concentric Pulse Ring (18px) */}
              <span
                className={`absolute rounded-full transition-all duration-200 pointer-events-none ${
                  isSelected
                    ? 'w-5 h-5 bg-cyan-400/30 ring-1.5 ring-cyan-400 scale-110'
                    : isHovered
                    ? 'w-4.5 h-4.5 bg-cyan-400/20 ring-1 ring-cyan-400/60 scale-105'
                    : 'w-3.5 h-3.5 bg-white/10 ring-1 ring-white/20'
                }`}
              />

              {/* Core Glass Indicator Dot (14px) */}
              <span
                className={`relative flex items-center justify-center w-3.5 h-3.5 rounded-full border shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-400 border-white scale-110'
                    : 'bg-neutral-950/90 border-white/40 group-hover:border-cyan-400 group-hover:scale-105'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-black'
                      : isHovered
                      ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]'
                      : 'bg-white'
                  }`}
                />
              </span>
            </button>

            {/* Minimalist Hover Label (Fixed 10px font size) */}
            <AnimatePresence>
              {isHovered && !isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.94 }}
                  transition={{ duration: 0.12 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none px-2 py-0.5 rounded-md bg-neutral-950/90 backdrop-blur-md border border-white/20 shadow-xl"
                >
                  <span className="text-[9px] font-mono tracking-wider text-cyan-300 font-semibold uppercase">
                    {hotspot.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Standard Feature Tooltip (Fixed 240px width screen-space card) */}
            <AnimatePresence>
              {hotspot.type === 'FEATURE' && isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: hotspot.screenY > 60 ? -8 : 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: hotspot.screenY > 60 ? -8 : 8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute ${
                    hotspot.screenY > 60 ? 'bottom-8' : 'top-8'
                  } left-1/2 -translate-x-1/2 z-50 w-60 p-3 bg-neutral-950/92 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.85)] text-left font-sans pointer-events-auto`}
                >
                  <div className="flex items-start justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1">
                      <IconComponent className="w-3 h-3 text-cyan-400" />
                      <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                        {hotspot.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeatureHotspotId(null);
                      }}
                      aria-label="Close Hotspot"
                      className="p-0.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  <h4 className="text-[11px] font-mono font-semibold tracking-wide text-white uppercase mb-1">
                    {hotspot.name}
                  </h4>

                  <p className="text-[10px] text-neutral-300 leading-relaxed font-sans mb-2">
                    {hotspot.description}
                  </p>

                  <div className="flex items-center justify-between px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md font-mono">
                    <span className="text-[8px] tracking-wider text-neutral-400 uppercase">
                      {hotspot.metricLabel}
                    </span>
                    <span className="text-[9.5px] tracking-wider font-semibold text-cyan-300">
                      {hotspot.metricValue}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
