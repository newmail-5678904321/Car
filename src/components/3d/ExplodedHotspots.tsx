import React, { useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle } from '../../types';
import { getVehicleExplodedParts, ExplodedComponentData } from '../../data/explodedParts';

interface ExplodedHotspotsProps {
  vehicle: Vehicle;
  visible: boolean;
  activePartId?: string | null;
  onSelectPart: (part: ExplodedComponentData) => void;
}

export const ExplodedHotspots: React.FC<ExplodedHotspotsProps> = ({
  vehicle,
  visible,
  activePartId,
  onSelectPart,
}) => {
  const parts = useMemo(() => getVehicleExplodedParts(vehicle), [vehicle]);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <group>
      {parts.map((part) => {
        const isSelected = activePartId === part.id;
        const isHovered = hoveredPartId === part.id;

        return (
          <group key={part.id} position={part.position}>
            <Html center distanceFactor={8.0} zIndexRange={[100, 0]}>
              <div
                id={`exploded-hotspot-${part.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart(part);
                }}
                onMouseEnter={() => setHoveredPartId(part.id)}
                onMouseLeave={() => setHoveredPartId(null)}
                className="group relative cursor-pointer select-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ width: '28px', height: '28px' }}
                title={part.name}
              >
                {/* Subtle Concentric Pulse Ring (14-18px) */}
                <span
                  className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? 'w-6 h-6 bg-cyan-400/30 ring-1.5 ring-cyan-400 scale-110'
                      : isHovered
                      ? 'w-5 h-5 bg-cyan-400/20 ring-1 ring-cyan-400/60 scale-105'
                      : 'w-4 h-4 bg-white/10 ring-1 ring-white/25'
                  }`}
                />

                {/* Core Glass Indicator Dot (14px) */}
                <div
                  className={`relative flex items-center justify-center w-3.5 h-3.5 rounded-full border backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-400 border-white text-black scale-110'
                      : 'bg-neutral-950/80 border-white/40 hover:border-cyan-400 group-hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-black'
                        : isHovered
                        ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Minimalist Hover Tooltip (Tiny, non-intrusive) */}
                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.94 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none px-2 py-0.5 rounded-md bg-neutral-950/90 backdrop-blur-lg border border-white/20 shadow-xl"
                    >
                      <span className="text-[8.5px] font-mono tracking-wider text-cyan-300 font-semibold uppercase">
                        {part.name}
                      </span>
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
