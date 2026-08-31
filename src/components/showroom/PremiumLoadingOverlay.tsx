import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle } from '../../types';

interface PremiumLoadingOverlayProps {
  vehicle: Vehicle;
  isVisible: boolean;
  progress?: number;
}

export const PremiumLoadingOverlay: React.FC<PremiumLoadingOverlayProps> = ({ vehicle, isVisible, progress = 0 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="flex flex-col items-center max-w-md w-full px-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex flex-col items-center"
            >
              <span className="text-technical text-neutral-500 mb-2 tracking-[0.3em]">LOADING VEHICLE</span>
              <h2 className="text-2xl font-display text-white tracking-widest uppercase text-center">{vehicle.brand} {vehicle.model}</h2>
            </motion.div>
            
            <div className="w-full h-[1px] bg-neutral-900 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.max(10, progress)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
