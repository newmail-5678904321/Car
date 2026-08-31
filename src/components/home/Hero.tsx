import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VEHICLES_DATABASE } from '../../data/vehicles';
import { VehicleShowroom } from '../showroom/VehicleShowroom';

export const Hero: React.FC<{ isReady: boolean }> = ({ isReady }) => {
  const [showShowroom, setShowShowroom] = useState(false);
  
  // Featured hero vehicle (Apex Valkyrie AMR)
  const featuredVehicle = VEHICLES_DATABASE[0];

  return (
    <>
      <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-obsidian">
        
        {/* Deep Studio Background Environment */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-obsidian to-obsidian" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-radial from-neutral-800/30 via-neutral-900/10 to-transparent blur-[120px]" />
        </div>

        {/* Studio Floor & Horizon */}
        <div className="absolute bottom-[10%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent z-[2]" />
        
        {/* Real Vehicle Visual Presentation (Premium Studio Shot Fallback structure) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mt-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={isReady ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl aspect-[2/1] relative flex flex-col items-center justify-center"
          >
             {/* Studio Lighting Sweep */}
             <motion.div 
                initial={{ left: '-100%' }}
                animate={isReady ? { left: '200%' } : {}}
                transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-30deg] z-20"
             />

             {/* Vehicle Silhouette representing the Real Car in a Studio */}
             <svg viewBox="0 0 1000 400" className="w-[90%] h-full drop-shadow-2xl">
                {/* Core Body */}
                <path 
                  d="M 120 280 C 140 260, 220 230, 280 230 C 360 230, 450 180, 580 170 C 700 160, 780 180, 840 200 C 880 215, 920 240, 940 260 C 960 280, 960 300, 940 310 C 880 320, 180 320, 120 310 Z"
                  fill="#030303"
                  stroke="#222"
                  strokeWidth="2"
                />
                {/* Glasshouse/Canopy */}
                <path 
                  d="M 380 200 C 450 175, 540 170, 630 185" 
                  fill="none" 
                  stroke="#C5A880" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  className="opacity-70"
                />
                {/* Wheels */}
                <circle cx="260" cy="280" r="42" fill="#020202" stroke="#111" strokeWidth="6" />
                <circle cx="760" cy="280" r="42" fill="#020202" stroke="#111" strokeWidth="6" />
                {/* Subtle Highlights */}
                <path d="M 120 280 C 140 260, 220 230, 280 230" fill="none" stroke="#fff" strokeWidth="1" className="opacity-20" />
             </svg>
             
             {/* Studio Floor Reflection */}
             <div className="absolute top-[80%] left-0 w-full scale-y-[-1] blur-[4px] opacity-30 pointer-events-none flex justify-center"
                  style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)' }}>
                <svg viewBox="0 0 1000 400" className="w-[90%] h-full">
                   <path 
                     d="M 120 280 C 140 260, 220 230, 280 230 C 360 230, 450 180, 580 170 C 700 160, 780 180, 840 200 C 880 215, 920 240, 940 260 C 960 280, 960 300, 940 310 Z"
                     fill="#000"
                   />
                </svg>
             </div>
          </motion.div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-end">
          
          {/* Typography Block */}
          <div className="flex flex-col mb-20 lg:mb-24 mix-blend-difference">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-technical text-neutral-400 mb-6 block tracking-[0.2em]">
                ENGINEERED FOR MOTION.
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-editorial text-white leading-none tracking-tight drop-shadow-2xl">
                {featuredVehicle.brand.toUpperCase()}
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-editorial text-neutral-400 leading-none tracking-tight">
                {featuredVehicle.model.toUpperCase()}
              </h2>
            </motion.div>
          </div>
          
          {/* Specs and CTAs */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 border-t border-neutral-800/50 pt-8 pb-8 backdrop-blur-sm">
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 w-full lg:w-auto"
            >
              <div>
                <span className="text-technical block mb-2 text-neutral-500">HORSEPOWER</span>
                <div className="flex items-baseline">
                  <span className="text-spec-value text-white">{featuredVehicle.specs.horsepower}</span>
                  <span className="text-spec-unit">BHP</span>
                </div>
              </div>
              <div>
                <span className="text-technical block mb-2 text-neutral-500">TORQUE</span>
                <div className="flex items-baseline">
                  <span className="text-spec-value text-white">{featuredVehicle.specs.torqueNm}</span>
                  <span className="text-spec-unit">NM</span>
                </div>
              </div>
              <div>
                <span className="text-technical block mb-2 text-neutral-500">0–100 KM/H</span>
                <div className="flex items-baseline">
                  <span className="text-spec-value text-white">{featuredVehicle.specs.zeroToHundredKmh}</span>
                  <span className="text-spec-unit">SEC</span>
                </div>
              </div>
              <div>
                <span className="text-technical block mb-2 text-neutral-500">TOP SPEED</span>
                <div className="flex items-baseline">
                  <span className="text-spec-value text-white">{featuredVehicle.specs.topSpeedKmh}</span>
                  <span className="text-spec-unit">KM/H</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
              animate={isReady ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 w-full lg:w-auto z-30"
            >
              <button 
                onClick={() => setShowShowroom(true)}
                className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-mono tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-neutral-200"
              >
                <span>EXPLORE VEHICLE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-neutral-500"
        >
          <span className="text-[10px] tracking-widest font-mono">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* 3D Showroom Modal Overlay */}
      <AnimatePresence>
        {showShowroom && (
          <VehicleShowroom vehicle={featuredVehicle} onClose={() => setShowShowroom(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
