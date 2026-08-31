import React, { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { VehicleScene } from '../3d/VehicleScene';
import { CINEMATIC_SHOTS } from '../3d/CinematicCameraManager';
import { ThirdPersonPreset } from '../3d/ThirdPersonCameraManager';
import { AutomotiveFinishType } from '../../types';
import { VehicleSpecsPanel } from './VehicleSpecsPanel';
import { ExplodedComponentModal } from './ExplodedComponentModal';
import { ExplodedComponentData, getVehicleExplodedParts } from '../../data/explodedParts';
import { Vehicle, OutdoorLocation, PerspectivePreset } from '../../types';
import { getVehicle3DConfig } from '../../data/vehicle3DRegistry';
import { ScreenSpaceHotspotsOverlay } from './ScreenSpaceHotspotsOverlay';
import { PremiumLoadingOverlay } from './PremiumLoadingOverlay';
import { VehicleImagePresentation } from '../3d/VehicleImagePresentation';
import { ProjectedScreenHotspot } from '../3d/ScreenSpaceHotspotTracker';
import {
  RefreshCw,
  RotateCcw,
  X,
  AlertCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Video,
  Compass,
  Eye,
  Zap,
  Gauge,
  Timer,
  Building2,
  Sun,
  Sparkles,
  Palette,
  Layers,
  Mountain,
  Sunset,
  Waves,
  Moon,
  Trees,
  SlidersHorizontal,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VehicleShowroomProps {
  vehicle: Vehicle;
  onClose?: () => void;
}

// Error Boundary for Three.js Canvas
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; onRetry: () => void; onClose?: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; onRetry: () => void; onClose?: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Viewer WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-[#070a12] flex flex-col items-center justify-center p-6 text-center z-30">
          <AlertCircle className="w-8 h-8 text-neutral-400 mb-4" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-1">
            VEHICLE 3D EXPERIENCE
          </span>
          <h3 className="text-sm font-mono tracking-[0.2em] text-white font-medium mb-5 uppercase">
            CALIBRATION STREAM RECONNECTED
          </h3>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onRetry();
            }}
            className="px-5 py-2 bg-white text-black font-mono text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
          >
            REINITIALIZE 3D TWIN
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const VehicleShowroom: React.FC<VehicleShowroomProps> = ({ vehicle, onClose }) => {
  const [activeTab, setActiveTab] = useState<'STANDARD' | 'CINEMATIC' | 'TRACKING'>('STANDARD');
  const [environmentMode, setEnvironmentMode] = useState<'SHOWROOM' | 'OUTDOOR'>('SHOWROOM');
  const [outdoorLocation, setOutdoorLocation] = useState<OutdoorLocation>('ALPINE');
  const [isTransitioningEnv, setIsTransitioningEnv] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [selectedExplodedPart, setSelectedExplodedPart] = useState<ExplodedComponentData | null>(null);
  const [projectedHotspots, setProjectedHotspots] = useState<ProjectedScreenHotspot[]>([]);
  const [perspectivePreset, setPerspectivePreset] = useState<PerspectivePreset>('DEFAULT');
  const [showAnglesMenu, setShowAnglesMenu] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [customModelUrlInput, setCustomModelUrlInput] = useState('');
  const [activeModelUrl, setActiveModelUrl] = useState<string | undefined>(undefined);

  // Paint Finish Mode (Gloss, Metallic, Matte, Carbon)
  const [finishType, setFinishType] = useState<AutomotiveFinishType>('METALLIC');

  const [resetTrigger, setResetTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasSeparableComponents, setHasSeparableComponents] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [modelError, setModelError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPaintMenu, setShowPaintMenu] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const vehicle3DConfig = getVehicle3DConfig(vehicle);
  const allExplodedParts = useMemo(() => getVehicleExplodedParts(vehicle), [vehicle]);

  // Active Vehicle Paint Finish
  const [selectedColorHex, setSelectedColorHex] = useState<string>(
    vehicle.paintOptions?.[0]?.hex || vehicle.accentColor || '#d40000'
  );

  // Sync color & states when vehicle changes
  useEffect(() => {
    setSelectedColorHex(vehicle.paintOptions?.[0]?.hex || vehicle.accentColor || '#d40000');
    setIsLoading(true);
    setIsExploded(false);
    setSelectedExplodedPart(null);
    setPerspectivePreset('DEFAULT');
    setActiveModelUrl(vehicle3DConfig.modelUrl || vehicle.model3D);
  }, [vehicle, vehicle3DConfig.modelUrl]);

  // Cinematic View State
  const [isCinematicPaused, setIsCinematicPaused] = useState(false);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);

  // Third-Person Preset State
  const [thirdPersonPreset, setThirdPersonPreset] = useState<ThirdPersonPreset>('REAR');

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body & document scrolling cleanly when showroom is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fast smooth entrance without blocking screens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [retryKey, vehicle.id]);

  const handleResetCamera = () => {
    setPerspectivePreset('DEFAULT');
    setIsExploded(false);
    setSelectedExplodedPart(null);
    setShowPaintMenu(false);
    setShowAnglesMenu(false);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSelectComponent = (part: ExplodedComponentData) => {
    setIsExploded(true);
    setSelectedExplodedPart(part);
  };

  const handleShowFullVehicle = () => {
    setSelectedExplodedPart(null);
    setIsExploded(false);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSwitchTab = (tab: 'STANDARD' | 'CINEMATIC' | 'TRACKING') => {
    setActiveTab(tab);
    if (tab === 'CINEMATIC') {
      setIsCinematicPaused(false);
    }
  };

  const handleSwitchEnvironment = (env: 'SHOWROOM' | 'OUTDOOR') => {
    if (env === environmentMode) return;
    setIsTransitioningEnv(true);
    setTimeout(() => {
      setEnvironmentMode(env);
      setTimeout(() => {
        setIsTransitioningEnv(false);
      }, 300);
    }, 180);
  };

  const handleSelectOutdoorLocation = (loc: OutdoorLocation) => {
    if (loc === outdoorLocation) return;
    setIsTransitioningEnv(true);
    setTimeout(() => {
      setOutdoorLocation(loc);
      setTimeout(() => {
        setIsTransitioningEnv(false);
      }, 250);
    }, 150);
  };

  const handleNextShot = useCallback(() => {
    setCurrentShotIndex((prev) => (prev + 1) % CINEMATIC_SHOTS.length);
  }, []);

  const handlePrevShot = useCallback(() => {
    setCurrentShotIndex((prev) => (prev - 1 + CINEMATIC_SHOTS.length) % CINEMATIC_SHOTS.length);
  }, []);

  const togglePauseCinematic = useCallback(() => {
    setIsCinematicPaused((prev) => !prev);
  }, []);

  const handleToggleExploded = () => {
    if (selectedExplodedPart) {
      setSelectedExplodedPart(null);
      setIsExploded(true);
    } else {
      setIsExploded((prev) => !prev);
      setSelectedExplodedPart(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setActiveModelUrl(blobUrl);
      setShowAssetModal(false);
      setIsLoading(true);
      setNoticeMessage(`Loaded 3D asset: ${file.name}`);
      setTimeout(() => setNoticeMessage(null), 3500);
    }
  };

  const handleLoadCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customModelUrlInput.trim()) {
      setActiveModelUrl(customModelUrlInput.trim());
      setShowAssetModal(false);
      setIsLoading(true);
      setNoticeMessage('Connecting 3D GLTF asset stream...');
      setTimeout(() => setNoticeMessage(null), 3500);
    }
  };

  const currentShot = CINEMATIC_SHOTS[currentShotIndex] || CINEMATIC_SHOTS[0];

  const presets: { id: ThirdPersonPreset; label: string }[] = [
    { id: 'REAR', label: 'REAR' },
    { id: 'REAR_34', label: 'REAR 3/4' },
    { id: 'SIDE', label: 'SIDE' },
    { id: 'FRONT', label: 'FRONT' },
  ];

  const anglePresets: { id: PerspectivePreset; label: string }[] = [
    { id: 'DEFAULT', label: 'HERO 3/4' },
    { id: 'FRONT_3_4', label: 'FRONT 3/4' },
    { id: 'REAR_3_4', label: 'REAR 3/4' },
    { id: 'SIDE', label: 'SIDE PROFILE' },
    { id: 'FRONT', label: 'FRONT' },
    { id: 'REAR', label: 'REAR' },
    { id: 'TOP', label: 'TOP DOWN' },
    { id: 'LOW_ANGLE', label: 'LOW ANGLE' },
  ];

  const outdoorLocationsList: { id: OutdoorLocation; label: string; icon: React.ReactNode }[] = [
    { id: 'ALPINE', label: 'ALPINE', icon: <Mountain className="w-2.5 h-2.5" /> },
    { id: 'SUNSET', label: 'SUNSET', icon: <Sunset className="w-2.5 h-2.5" /> },
    { id: 'COASTAL', label: 'COASTAL', icon: <Waves className="w-2.5 h-2.5" /> },
    { id: 'CITY_NIGHT', label: 'CITY NIGHT', icon: <Moon className="w-2.5 h-2.5" /> },
    { id: 'FOREST', label: 'FOREST', icon: <Trees className="w-2.5 h-2.5" /> },
  ];

  const finishOptions: { id: AutomotiveFinishType; label: string }[] = [
    { id: 'GLOSS', label: 'GLOSS' },
    { id: 'METALLIC', label: 'METALLIC' },
    { id: 'MATTE', label: 'MATTE' },
    { id: 'CARBON', label: 'CARBON' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#070a12] flex flex-col overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. TOP COMPACT LIQUID GLASS NAVIGATION BAR                   */}
      {/* ============================================================ */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 py-4 pointer-events-none">
        {/* Left: Brand & Vehicle Floating Capsule */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 bg-neutral-950/50 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-white/[0.2] transition-colors"
        >
          <div
            className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]"
            style={{ backgroundColor: selectedColorHex, color: selectedColorHex }}
          />
          <span className="font-mono text-[10px] tracking-[0.22em] text-white font-medium">AETHER</span>
          <span className="text-white/20 font-light text-[10px]">|</span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-300 uppercase truncate max-w-[120px] sm:max-w-[200px]">
            {vehicle.brand} {vehicle.model}
          </span>
        </motion.div>

        {/* Center: Environment & View Modes Switcher */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Environment Mode Switcher (SHOWROOM ↔ OUTDOOR) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center p-0.5 bg-neutral-950/50 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-lg relative"
          >
            <button
              id="showroom-env-btn"
              onClick={() => handleSwitchEnvironment('SHOWROOM')}
              className={`relative px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors z-10 flex items-center gap-1.5 ${
                environmentMode === 'SHOWROOM' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {environmentMode === 'SHOWROOM' && (
                <motion.div
                  layoutId="activeEnvTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Building2 className="w-2.5 h-2.5" />
              <span>SHOWROOM</span>
            </button>

            <button
              id="outdoor-env-btn"
              onClick={() => handleSwitchEnvironment('OUTDOOR')}
              className={`relative px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors z-10 flex items-center gap-1.5 ${
                environmentMode === 'OUTDOOR' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {environmentMode === 'OUTDOOR' && (
                <motion.div
                  layoutId="activeEnvTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Sun className="w-2.5 h-2.5" />
              <span>OUTDOOR</span>
            </button>
          </motion.div>

          {/* View Mode Switcher (STANDARD | CINEMATIC | 3RD PERSON) */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center p-0.5 bg-neutral-950/50 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-lg relative"
          >
            <button
              id="standard-view-btn"
              onClick={() => handleSwitchTab('STANDARD')}
              className={`relative px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors z-10 flex items-center gap-1 ${
                activeTab === 'STANDARD' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'STANDARD' && (
                <motion.div
                  layoutId="activeViewTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Eye className="w-2.5 h-2.5" />
              <span>STANDARD</span>
            </button>

            <button
              id="cinematic-view-btn"
              onClick={() => handleSwitchTab('CINEMATIC')}
              className={`relative px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors z-10 flex items-center gap-1 ${
                activeTab === 'CINEMATIC' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'CINEMATIC' && (
                <motion.div
                  layoutId="activeViewTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Video className="w-2.5 h-2.5" />
              <span>CINEMATIC</span>
            </button>

            <button
              id="tracking-view-btn"
              onClick={() => handleSwitchTab('TRACKING')}
              className={`relative px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-colors z-10 flex items-center gap-1 ${
                activeTab === 'TRACKING' ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'TRACKING' && (
                <motion.div
                  layoutId="activeViewTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Compass className="w-2.5 h-2.5" />
              <span>3RD PERSON</span>
            </button>
          </motion.nav>
        </div>

        {/* Right: Bespoke Finish & Palette Capsule + Close Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Finish & Color Pill */}
          <div className="relative">
            <button
              id="paint-finish-btn"
              onClick={() => setShowPaintMenu(!showPaintMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-950/50 hover:bg-neutral-900/70 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-lg text-neutral-300 hover:text-white font-mono text-[9px] tracking-wider uppercase transition-colors"
            >
              <Palette className="w-3 h-3 text-cyan-400" />
              <span className="text-white font-medium">{finishType}</span>
              <div
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{ backgroundColor: selectedColorHex }}
              />
            </button>

            {/* Finish & Palette Dropdown */}
            <AnimatePresence>
              {showPaintMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute top-10 right-0 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-xl p-3 shadow-2xl w-60 z-50 text-left font-mono"
                >
                  <span className="text-[8px] uppercase tracking-widest text-neutral-400 block mb-2">
                    FINISH TYPE
                  </span>
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {finishOptions.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFinishType(f.id)}
                        className={`px-2 py-1 rounded text-[8.5px] uppercase tracking-wider transition-colors ${
                          finishType === f.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                            : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-[8px] uppercase tracking-widest text-neutral-400 block mb-2">
                    BESPOKE COLOR
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {vehicle.paintOptions?.map((paint) => {
                      const isSelected = paint.hex.toLowerCase() === selectedColorHex.toLowerCase();
                      return (
                        <button
                          key={paint.id}
                          onClick={() => {
                            setSelectedColorHex(paint.hex);
                          }}
                          title={paint.name}
                          className={`relative w-5 h-5 rounded-full transition-transform active:scale-90 flex items-center justify-center ${
                            isSelected
                              ? 'scale-115 ring-2 ring-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                              : 'hover:scale-110 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: paint.hex }}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Model Asset Manager Trigger */}
          <button
            id="cad-asset-pipeline-btn"
            onClick={() => setShowAssetModal(true)}
            className="p-1.5 rounded-full bg-neutral-950/50 hover:bg-neutral-800/80 text-cyan-400 hover:text-white transition-all backdrop-blur-xl border border-white/[0.1] shadow-lg active:scale-95"
            title="3D CAD Asset Pipeline (Load custom GLTF/GLB)"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          {onClose && (
            <button
              id="close-showroom-btn"
              onClick={onClose}
              aria-label="Close Showroom (Esc)"
              className="p-1.5 rounded-full bg-neutral-950/50 hover:bg-neutral-800/80 text-neutral-300 hover:text-white transition-all backdrop-blur-xl border border-white/[0.1] shadow-lg active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Outdoor Location Sub-Bar (When in Outdoor mode) */}
      <AnimatePresence>
        {environmentMode === 'OUTDOOR' && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 left-0 right-0 z-25 flex justify-center pointer-events-none px-4"
          >
            <div className="pointer-events-auto flex items-center gap-1 p-1 bg-neutral-950/60 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-xl">
              {outdoorLocationsList.map((loc) => {
                const isActive = outdoorLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectOutdoorLocation(loc.id)}
                    className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[8.5px] tracking-wider uppercase transition-colors ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {loc.icon}
                    <span>{loc.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Banner */}
      <AnimatePresence>
        {noticeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="px-3.5 py-1.5 bg-neutral-900/90 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 rounded-full text-[10px] font-mono tracking-wider shadow-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{noticeMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Environment Transition Veil */}
      <AnimatePresence>
        {isTransitioningEnv && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#070a12] pointer-events-none z-25 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. 3D WEBGL VIEWPORT (HERO VEHICLE ~60-65% OF SCREEN)         */}
      {/* ============================================================ */}
      <div className="flex-grow relative w-full h-full">
        {/* Layer 1: Pure 3D WebGL Canvas */}
        {/* Layer 0: Loading Overlay */}
        <PremiumLoadingOverlay vehicle={vehicle} isVisible={isLoading} progress={loadingProgress} />

        {/* Layer 1: 3D or Image Fallback */}
        {vehicle3DConfig.is3DAvailable && !modelError ? (
          <CanvasErrorBoundary onRetry={() => setRetryKey((k) => k + 1)} onClose={onClose}>
            <Suspense fallback={null}>
              <Canvas
                key={retryKey}
                shadows
                camera={{ fov: 42, near: 0.1, far: 50 }}
                gl={{ 
                  antialias: true, 
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                  preserveDrawingBuffer: true
                }}
              >
                <VehicleScene
                  vehicle={vehicle}
                  modelUrl={vehicle.model3D}
                  selectedColorHex={selectedColorHex}
                  resetTrigger={resetTrigger}
                  viewMode={activeTab}
                  environmentMode={environmentMode}
                  outdoorLocation={outdoorLocation}
                  showHotspots={showHotspots}
                  isExploded={isExploded}
                  activeExplodedPart={selectedExplodedPart}
                  onSelectExplodedPart={handleSelectComponent}
                  perspectivePreset={perspectivePreset}
                  isCinematicPaused={isCinematicPaused}
                  currentShotIndex={currentShotIndex}
                  thirdPersonPreset={thirdPersonPreset}
                  onShotChange={setCurrentShotIndex}
                  onProjectedHotspots={setProjectedHotspots}
                  onModelLoadedState={(loaded, hasSeparableNodes) => {
                    if (loaded) {
                      setIsLoading(false);
                      setLoadingProgress(100);
                      setModelError(false);
                      setHasSeparableComponents(hasSeparableNodes);
                    }
                  }}
                  onError={(err) => {
                    console.error('Failed to load 3D model, falling back to images', err);
                    setModelError(true);
                    setIsLoading(false);
                    setHasSeparableComponents(false);
                  }}
                />
              </Canvas>
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <VehicleImagePresentation 
            vehicle={vehicle} 
            images={vehicle3DConfig.exteriorImages || []} 
            activePart={selectedExplodedPart}
          />
        )}

        {/* Layer 2: True Screen-Space HTML Hotspots Overlay (Never zooms or scales with 3D camera) */}
        {!isLoading && (
          <ScreenSpaceHotspotsOverlay
            hotspots={projectedHotspots}
            activeExplodedPartId={selectedExplodedPart?.id}
            onSelectExplodedPart={handleSelectComponent}
          />
        )}

        {/* Ambient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/35" />

        {/* Compact Collapsible Vehicle Specs Panel (Hidden when inspecting a single component) */}
        {!isLoading && !selectedExplodedPart && <VehicleSpecsPanel vehicle={vehicle} isMobile={isMobile} />}

        {/* Exploded Component Single-Inspection Modal */}
        <ExplodedComponentModal
          part={selectedExplodedPart}
          vehicle={vehicle}
          onClose={() => setSelectedExplodedPart(null)}
          onShowFullVehicle={handleShowFullVehicle}
        />

        {/* Sleek Component Selector Navigation Bar (Exploded & Single Component Inspection) */}
        <AnimatePresence>
          {activeTab === 'STANDARD' && (isExploded || selectedExplodedPart) && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 bg-neutral-950/80 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.8)] max-w-[94vw] overflow-x-auto no-scrollbar"
            >
              <button
                id="show-full-vehicle-strip-btn"
                onClick={handleShowFullVehicle}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-all shrink-0 ${
                  !selectedExplodedPart
                    ? 'bg-cyan-400 text-black font-semibold shadow-sm'
                    : 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>FULL VEHICLE</span>
              </button>

              <div className="w-px h-3.5 bg-white/15 shrink-0 mx-0.5" />

              {allExplodedParts.map((part) => {
                const isSelected = selectedExplodedPart?.id === part.id;
                return (
                  <button
                    key={part.id}
                    id={`select-component-${part.id}`}
                    onClick={() => handleSelectComponent(part)}
                    className={`px-2.5 py-1 rounded-full font-mono text-[8.5px] tracking-wider uppercase transition-all shrink-0 ${
                      isSelected
                        ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {part.category}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Shot Title Overlay (Minimal, Compact) */}
        <AnimatePresence>
          {activeTab === 'CINEMATIC' && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-5 sm:left-7 z-20 pointer-events-none max-w-xs p-2.5 bg-neutral-950/45 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                <span className="text-[8.5px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                  DIRECTOR 0{currentShotIndex + 1} / 0{CINEMATIC_SHOTS.length}
                </span>
              </div>
              <h4 className="text-xs font-mono tracking-wider text-white font-medium uppercase">
                {currentShot.name}
              </h4>
              <span className="text-[8px] font-mono tracking-wide text-neutral-400 uppercase">
                {currentShot.sub}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Third-Person Indicator Overlay */}
        <AnimatePresence>
          {activeTab === 'TRACKING' && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-5 sm:left-7 z-20 pointer-events-none max-w-xs p-2.5 bg-neutral-950/45 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-[8.5px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                  ACTIVE TRACKING
                </span>
              </div>
              <h4 className="text-xs font-mono tracking-wider text-white font-medium uppercase">
                THIRD-PERSON VIEW
              </h4>
              <span className="text-[8px] font-mono tracking-wide text-neutral-400 uppercase">
                PRESET: {thirdPersonPreset.replace('_', ' ')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM COMPACT CONTROL BAR (HUD)                          */}
      {/* ============================================================ */}
      <footer className="absolute bottom-6 right-5 sm:right-7 z-30 flex items-center gap-2.5 max-w-[94vw]">
        {activeTab === 'STANDARD' && (
          /* STANDARD VIEW HUD */
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-950/60 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          >
            {/* Exploded / Inspection Mode Toggle */}
            <button
              id="exploded-view-toggle-btn"
              onClick={handleToggleExploded}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-all ${
                isExploded || selectedExplodedPart
                  ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Toggle Exploded Assembly & Component Inspection"
            >
              <Layers className="w-3 h-3" />
              <span>{selectedExplodedPart ? 'INSPECT' : 'EXPLODED'}</span>
            </button>

            <div className="w-px h-3 bg-white/15" />

            {/* Hotspots Toggle */}
            <button
              id="hotspots-toggle-btn"
              onClick={() => setShowHotspots((prev) => !prev)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-colors ${
                showHotspots && !isExploded
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Toggle Inspection Hotspots"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">HOTSPOTS</span>
            </button>

            <div className="w-px h-3 bg-white/15" />

            {/* Camera Angles Presets Dropdown */}
            <div className="relative">
              <button
                id="camera-presets-btn"
                onClick={() => setShowAnglesMenu(!showAnglesMenu)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-colors ${
                  perspectivePreset !== 'DEFAULT'
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Camera Perspective Angle"
              >
                <SlidersHorizontal className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">ANGLES</span>
              </button>

              {/* Angles Dropdown */}
              <AnimatePresence>
                {showAnglesMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute bottom-10 right-0 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-xl p-1 shadow-2xl flex flex-col gap-0.5 w-36 z-50"
                  >
                    {anglePresets.map((preset) => (
                      <button
                        key={preset.id}
                        id={`angle-preset-${preset.id}`}
                        onClick={() => {
                          setPerspectivePreset(preset.id);
                          setShowAnglesMenu(false);
                        }}
                        className={`px-2.5 py-1 text-left font-mono text-[9px] tracking-wider rounded-lg uppercase transition-colors ${
                          perspectivePreset === preset.id
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-3 bg-white/15" />

            {/* Reset View Action */}
            <button
              id="reset-camera-btn"
              onClick={handleResetCamera}
              className="group flex items-center gap-1 text-neutral-300 hover:text-white transition-all whitespace-nowrap active:scale-95 px-1.5 py-1"
              title="Reset Camera"
            >
              <RefreshCw className="w-3 h-3 transition-transform duration-500 group-hover:rotate-180 text-cyan-400" />
              <span className="text-[8.5px] font-mono tracking-widest uppercase font-semibold text-white">
                RESET
              </span>
            </button>
          </motion.div>
        )}

        {activeTab === 'CINEMATIC' && (
          /* CINEMATIC VIEW HUD */
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-neutral-950/60 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={handlePrevShot}
              className="p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-90"
              title="Previous Shot"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            <button
              onClick={togglePauseCinematic}
              className="flex items-center gap-1.5 px-3 py-1 bg-white text-black rounded-full font-mono text-[9px] tracking-widest uppercase font-semibold hover:brightness-110 transition-all shadow-sm active:scale-95"
            >
              {isCinematicPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 fill-black" />
                  <span>RESUME</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 fill-black" />
                  <span>PAUSE</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextShot}
              className="p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-90"
              title="Next Shot"
            >
              <SkipForward className="w-3 h-3" />
            </button>

            <div className="w-px h-3 bg-white/15" />

            <button
              onClick={() => handleSwitchTab('STANDARD')}
              className="text-[8.5px] font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors active:scale-95"
            >
              EXIT
            </button>
          </motion.div>
        )}

        {activeTab === 'TRACKING' && (
          /* THIRD-PERSON VIEW HUD */
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950/60 backdrop-blur-xl border border-white/[0.1] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-0.5 relative">
              {presets.map((p) => {
                const isActive = thirdPersonPreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setThirdPersonPreset(p.id)}
                    className={`relative px-2.5 py-0.5 rounded-full font-mono text-[8.5px] tracking-wider uppercase transition-colors z-10 ${
                      isActive ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTrackingPreset"
                        className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-3 bg-white/15" />

            <button
              onClick={handleResetCamera}
              className="group flex items-center gap-1 px-1.5 py-0.5 text-neutral-300 hover:text-white transition-all whitespace-nowrap active:scale-95"
              title="Reset Camera"
            >
              <RefreshCw className="w-2.5 h-2.5 transition-transform duration-500 group-hover:rotate-180 text-cyan-400" />
              <span className="text-[8.5px] font-mono tracking-widest uppercase font-semibold text-white">
                RESET
              </span>
            </button>
          </motion.div>
        )}
      </footer>

      {/* ============================================================ */}
      {/* 4. 3D ASSET PIPELINE & CAD LOADER MODAL                      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showAssetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-white/15 rounded-2xl max-w-md w-full p-5 text-white font-sans shadow-2xl relative"
            >
              <button
                onClick={() => setShowAssetModal(false)}
                className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 mb-1.5">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-[9px] tracking-widest text-cyan-400 uppercase">
                  3D CAD Pipeline
                </span>
              </div>

              <h3 className="text-base font-mono font-medium uppercase tracking-wider mb-1.5">
                Load Custom 3D Model
              </h3>
              <p className="text-[10px] text-neutral-400 font-mono mb-4 leading-relaxed">
                Connect an OEM GLB/GLTF model for the {vehicle.brand} {vehicle.model}. Model scale, center, and ground contact will be normalized automatically.
              </p>

              {/* File Upload Area */}
              <div className="mb-4">
                <label className="border border-dashed border-neutral-700 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors group bg-white/[0.02]">
                  <Upload className="w-6 h-6 text-neutral-500 group-hover:text-cyan-400 mb-1.5 transition-colors" />
                  <span className="text-xs font-mono text-neutral-300 mb-0.5">
                    Drop .glb / .gltf file here or Browse
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase">
                    GLTF 2.0 Binary / Draco Compressed
                  </span>
                  <input
                    type="file"
                    accept=".glb,.gltf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Direct URL input */}
              <form onSubmit={handleLoadCustomUrl} className="space-y-3">
                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5">
                    Or Stream via Direct URL
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <LinkIcon className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="https://domain.com/model.glb"
                        value={customModelUrlInput}
                        onChange={(e) => setCustomModelUrlInput(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg pl-8 pr-2.5 py-1.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-[10px] font-semibold rounded-lg tracking-wider uppercase transition-colors"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </form>

              {/* Reset to Default */}
              {activeModelUrl && (
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-neutral-500">CURRENT: Active Custom Asset</span>
                  <button
                    onClick={() => {
                      setActiveModelUrl(undefined);
                      setShowAssetModal(false);
                      setIsLoading(true);
                    }}
                    className="text-red-400 hover:text-red-300 uppercase underline"
                  >
                    Reset to Default Model
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
