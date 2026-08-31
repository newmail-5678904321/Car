import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VEHICLES_DATABASE } from '../../data/vehicles';
import { VehicleCard } from './VehicleCard';
import { VehicleShowroom } from '../showroom/VehicleShowroom';
import { Vehicle } from '../../types';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

export const VehicleDiscovery: React.FC = () => {
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPowertrain, setSelectedPowertrain] = useState<string | null>(null);
  const [selectedDrivetrain, setSelectedDrivetrain] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  
  // Range Filters
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedHp, setSelectedHp] = useState<string | null>(null);
  const [selectedZeroToHundred, setSelectedZeroToHundred] = useState<string | null>(null);
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique filter options from data
  const brands = useMemo(() => Array.from(new Set(VEHICLES_DATABASE.map(v => v.brand))).sort(), []);
  const categories = useMemo(() => Array.from(new Set(VEHICLES_DATABASE.map(v => v.category))).sort(), []);
  const powertrains = useMemo(() => Array.from(new Set(VEHICLES_DATABASE.map(v => v.powertrain))).sort(), []);
  const drivetrains = useMemo(() => Array.from(new Set(VEHICLES_DATABASE.map(v => v.drivetrain))).sort(), []);
  const useCases = useMemo(() => Array.from(new Set(VEHICLES_DATABASE.map(v => v.useCase))).sort(), []);

  const priceRanges = [
    { label: 'Under $150,000', match: (p: number) => p < 150000 },
    { label: '$150,000 - $300,000', match: (p: number) => p >= 150000 && p <= 300000 },
    { label: '$300,000 - $1,000,000', match: (p: number) => p >= 300000 && p <= 1000000 },
    { label: 'Over $1,000,000', match: (p: number) => p > 1000000 }
  ];

  const hpRanges = [
    { label: 'Under 500 BHP', match: (hp: number) => hp < 500 },
    { label: '500 - 750 BHP', match: (hp: number) => hp >= 500 && hp <= 750 },
    { label: '750 - 1000 BHP', match: (hp: number) => hp >= 750 && hp <= 1000 },
    { label: 'Over 1000 BHP', match: (hp: number) => hp > 1000 }
  ];

  const accelRanges = [
    { label: 'Sub 2.5s', match: (t: number) => t < 2.5 },
    { label: '2.5s - 3.5s', match: (t: number) => t >= 2.5 && t <= 3.5 },
    { label: '3.5s - 4.5s', match: (t: number) => t > 3.5 && t <= 4.5 },
    { label: 'Over 4.5s', match: (t: number) => t > 4.5 }
  ];

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATABASE.filter(vehicle => {
      if (selectedBrand && vehicle.brand !== selectedBrand) return false;
      if (selectedCategory && vehicle.category !== selectedCategory) return false;
      if (selectedPowertrain && vehicle.powertrain !== selectedPowertrain) return false;
      if (selectedDrivetrain && vehicle.drivetrain !== selectedDrivetrain) return false;
      if (selectedUseCase && vehicle.useCase !== selectedUseCase) return false;
      
      if (selectedPrice) {
        const range = priceRanges.find(r => r.label === selectedPrice);
        if (range && !range.match(vehicle.basePrice.USD)) return false;
      }
      if (selectedHp) {
        const range = hpRanges.find(r => r.label === selectedHp);
        if (range && !range.match(vehicle.specs.horsepower)) return false;
      }
      if (selectedZeroToHundred) {
        const range = accelRanges.find(r => r.label === selectedZeroToHundred);
        if (range && !range.match(vehicle.specs.zeroToHundredKmh)) return false;
      }
      
      return true;
    });
  }, [selectedBrand, selectedCategory, selectedPowertrain, selectedDrivetrain, selectedUseCase, selectedPrice, selectedHp, selectedZeroToHundred]);

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedPowertrain(null);
    setSelectedDrivetrain(null);
    setSelectedUseCase(null);
    setSelectedPrice(null);
    setSelectedHp(null);
    setSelectedZeroToHundred(null);
  };

  // Helper for filter sections
  const FilterSection = ({ title, options, selected, onSelect }: { title: string, options: string[], selected: string | null, onSelect: (v: string | null) => void }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="border-b border-neutral-900 pb-6">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full flex items-center justify-between text-technical text-white mb-4"
        >
          {title}
          {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-600" /> : <ChevronDown className="w-4 h-4 text-neutral-600" />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto hide-scrollbar">
                <button 
                  onClick={() => onSelect(null)}
                  className={`text-left text-sm transition-colors ${!selected ? 'text-accent' : 'text-neutral-500 hover:text-white'}`}
                >
                  All
                </button>
                {options.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`text-left text-sm transition-colors ${selected === opt ? 'text-accent' : 'text-neutral-500 hover:text-white'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const FilterSidebar = () => (
    <div className="flex flex-col gap-6">
      
      <FilterSection title="BRANDS A-Z" options={brands} selected={selectedBrand} onSelect={setSelectedBrand} />
      <FilterSection title="CATEGORY / BODY TYPE" options={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <FilterSection title="PRICE RANGE" options={priceRanges.map(r => r.label)} selected={selectedPrice} onSelect={setSelectedPrice} />
      <FilterSection title="HORSEPOWER" options={hpRanges.map(r => r.label)} selected={selectedHp} onSelect={setSelectedHp} />
      <FilterSection title="0-100 KM/H" options={accelRanges.map(r => r.label)} selected={selectedZeroToHundred} onSelect={setSelectedZeroToHundred} />
      <FilterSection title="POWERTRAIN" options={powertrains} selected={selectedPowertrain} onSelect={setSelectedPowertrain} />
      <FilterSection title="DRIVETRAIN" options={drivetrains} selected={selectedDrivetrain} onSelect={setSelectedDrivetrain} />
      <FilterSection title="USE CASE" options={useCases} selected={selectedUseCase} onSelect={setSelectedUseCase} />

      {(selectedBrand || selectedCategory || selectedPowertrain || selectedDrivetrain || selectedUseCase || selectedPrice || selectedHp || selectedZeroToHundred) && (
        <button 
          onClick={clearFilters}
          className="text-technical text-neutral-500 hover:text-white text-left transition-colors flex items-center gap-2 mt-2 py-4"
        >
          <X className="w-3 h-3" /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <section id="discovery" className="py-24 px-6 lg:px-12 bg-obsidian min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 pb-8 border-b border-neutral-900">
          <div>
            <span className="text-technical text-accent mb-4 block">Archive</span>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">
              Vehicle Discovery
            </h2>
          </div>
          
          <button 
            className="md:hidden flex items-center gap-2 text-technical text-white border border-neutral-800 px-4 py-2 rounded-full"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-32 h-fit">
            <FilterSidebar />
          </aside>

          {/* Results Grid */}
          <div className="flex-grow">
            <div className="mb-8 flex justify-between items-center">
              <span className="text-technical text-neutral-500">
                Showing {filteredVehicles.length} result{filteredVehicles.length !== 1 ? 's' : ''}
              </span>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    onClick={() => setActiveVehicle(vehicle)} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredVehicles.length === 0 && (
              <div className="py-24 text-center">
                <span className="text-technical text-neutral-600 block mb-4">NO VEHICLES FOUND</span>
                <p className="text-neutral-500">Please adjust your filter criteria.</p>
                <button onClick={clearFilters} className="mt-8 text-accent text-sm hover:text-white transition-colors">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVehicle && (
          <VehicleShowroom 
            vehicle={activeVehicle} 
            onClose={() => setActiveVehicle(null)} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 mt-6">
              <h3 className="text-technical text-white">Filters</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <FilterSidebar />
            
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="mt-16 w-full bg-white text-black py-4 font-mono text-[11px] tracking-[0.15em] uppercase font-bold"
            >
              Show {filteredVehicles.length} Results
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
