import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 px-6 lg:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
        <div className="md:col-span-1">
          <span className="text-xl tracking-widest font-light block mb-6">AETHER</span>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
            Pushing the boundaries of automotive engineering and uncompromising luxury.
          </p>
        </div>
        
        <div>
          <h4 className="text-technical mb-6 text-white">Models</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Apex Valkyrie</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Nebula GT</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Stratos SUV</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-technical mb-6 text-white">Experience</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Bespoke Atelier</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Engineering</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Motorsport</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-technical mb-6 text-white">Legal</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">Cookie Settings</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-600 text-xs">
          © {new Date().getFullYear()} Aether Automotive. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-neutral-600 text-xs">
          <span>Global / English</span>
        </div>
      </div>
    </footer>
  );
};
