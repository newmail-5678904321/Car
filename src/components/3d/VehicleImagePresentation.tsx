import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle } from '../../types';
import { ExplodedComponentData } from '../../data/explodedParts';
import { ArrowLeft, ArrowRight, View, Package } from 'lucide-react';

interface VehicleImagePresentationProps {
  vehicle: Vehicle;
  images: string[];
  activePart?: ExplodedComponentData | null;
}

export const VehicleImagePresentation: React.FC<VehicleImagePresentationProps> = ({ vehicle, images, activePart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If we have an active part selected in "exploded mode", we can show a targeted view or just standard.
  // For now, we cycle through the images. If no images are provided, we use a generic placeholder generator based on vehicle details.

  const renderImages = images && images.length > 0 ? images : [
    `https://placehold.co/1600x900/10141a/ffffff?text=${encodeURIComponent(vehicle.brand + ' ' + vehicle.model)}`,
    `https://placehold.co/1600x900/0a0c10/ffffff?text=${encodeURIComponent(vehicle.brand + ' ' + vehicle.model + ' (Rear)')}`,
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % renderImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? renderImages.length - 1 : prev - 1));
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={renderImages[currentIndex]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </AnimatePresence>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

      {activePart && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md p-6 rounded-xl border border-neutral-800"
        >
          <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-accent">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-display text-xl uppercase tracking-wider">{activePart.name}</h3>
            <p className="text-neutral-400 text-sm">{activePart.category} isolation mode.</p>
          </div>
        </motion.div>
      )}

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-neutral-800 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {renderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'bg-neutral-600 hover:bg-neutral-400'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-neutral-800 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* High-Resolution Presentation Label */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
          <View className="w-4 h-4" />
        </div>
        <span className="text-technical text-neutral-500 uppercase tracking-widest text-[10px]">High-Resolution Interactive Presentation</span>
      </div>
    </div>
  );
};
