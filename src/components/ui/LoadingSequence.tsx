import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Fast, non-blocking sequence to minimize artificial delay
    const t1 = setTimeout(() => setStage(1), 100); 
    const t2 = setTimeout(() => setStage(2), 500); 
    const t3 = setTimeout(() => {
      setStage(3); 
    }, 1000);
    const t4 = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="w-full max-w-[240px] flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: stage >= 1 ? 1 : 0, filter: stage >= 1 ? "blur(0px)" : "blur(4px)" }}
              transition={{ duration: 0.6 }}
              className="text-technical text-neutral-500 mb-4 tracking-[0.2em] text-[10px]"
            >
              INITIALIZING SYSTEMS
            </motion.div>
            
            <div className="w-full h-[1px] bg-neutral-900 relative overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: stage >= 2 ? "100%" : stage >= 1 ? "30%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
