import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';
import { ExplodedComponentData } from '../../data/explodedParts';
import { Vehicle } from '../../types';

interface ExplodedComponentModalProps {
  part: ExplodedComponentData | null;
  vehicle: Vehicle;
  onClose: () => void;
  onShowFullVehicle?: () => void;
}

export const ExplodedComponentModal: React.FC<ExplodedComponentModalProps> = ({
  part,
  vehicle,
  onClose,
  onShowFullVehicle,
}) => {
  if (!part) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={part.id}
        initial={{ opacity: 0, x: 20, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        id={`inspection-panel-${part.id}`}
        className="absolute top-20 right-4 md:right-6 w-[290px] sm:w-[320px] max-w-[calc(100vw-2rem)] z-40 bg-neutral-950/85 backdrop-blur-xl border border-white/15 rounded-xl p-4 shadow-[0_16px_36px_rgba(0,0,0,0.75)] text-white select-none"
      >
        {/* Top Minimal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-2.5 mb-3">
          <div>
            <span className="text-[9.5px] font-mono tracking-[0.2em] text-cyan-400 font-semibold uppercase block mb-0.5">
              {part.category} SUBSYSTEM
            </span>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase leading-snug">
              {part.name}
            </h3>
          </div>
          <button
            id="close-inspection-panel-btn"
            onClick={onClose}
            title="Close Panel"
            className="p-1 text-neutral-400 hover:text-white rounded-md bg-white/5 hover:bg-white/10 transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1-2 Sentence Concise Explanation */}
        <p className="text-[11.5px] leading-relaxed text-neutral-300 mb-3.5 font-sans">
          {part.description}
        </p>

        {/* Technical Specifications Section */}
        <div className="space-y-2 pt-2.5 border-t border-white/10">
          <span className="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block font-semibold">
            TECHNICAL SPECIFICATIONS
          </span>

          {/* Material */}
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2">
            <span className="text-[9px] font-mono tracking-[0.16em] text-neutral-400 uppercase block mb-0.5">
              MATERIAL
            </span>
            <span className="text-[11px] font-mono text-cyan-300 font-medium leading-tight block">
              {part.material}
            </span>
          </div>

          {/* Function */}
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2">
            <span className="text-[9px] font-mono tracking-[0.16em] text-neutral-400 uppercase block mb-0.5">
              FUNCTION
            </span>
            <span className="text-[11px] text-neutral-200 leading-snug block font-sans">
              {part.functionSummary}
            </span>
          </div>

          {/* Performance Measurement */}
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-mono tracking-[0.16em] text-neutral-400 uppercase">
                {part.metricLabel || 'PERFORMANCE'}
              </span>
              <span className="text-[10.5px] font-mono text-emerald-400 font-semibold">
                {part.metricValue}
              </span>
            </div>
            <span className="text-[10.5px] text-neutral-300 leading-tight block font-sans">
              {part.performanceMetric}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-[9px] font-mono text-neutral-500 truncate max-w-[120px]">
            {vehicle.brand} {vehicle.model}
          </span>
          {onShowFullVehicle && (
            <button
              id="inspection-show-full-vehicle-btn"
              onClick={onShowFullVehicle}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-cyan-500 hover:text-black text-white text-[10px] font-mono tracking-wider uppercase font-semibold transition-all shadow-sm"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Full Vehicle</span>
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
