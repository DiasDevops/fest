import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Check, 
  MapPin, 
  RotateCw,
  Eye,
  CalendarCheck,
  Flame,
  Waves,
  UtensilsCrossed,
  Layers
} from 'lucide-react';
import { VIRTUAL_TOUR_POINTS } from '../data/mockData';
import { TourPoint } from '../types';

interface VirtualTourProps {
  onOpenBooking: () => void;
}

export const VirtualTour: React.FC<VirtualTourProps> = ({ onOpenBooking }) => {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [panOffset, setPanOffset] = useState(0); // -100 to 100 for 360 horizontal drag effect
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<TourPoint['hotspots'][0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentPoint = VIRTUAL_TOUR_POINTS[currentPointIndex];

  // Auto-play guided tour timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentPointIndex((prev) => (prev + 1) % VIRTUAL_TOUR_POINTS.length);
        setActiveHotspot(null);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Subtle natural camera sway when idle
  useEffect(() => {
    let animFrame: number;
    let angle = 0;
    const animatePan = () => {
      if (!isDragging && isAutoPlaying) {
        angle += 0.008;
        setPanOffset(Math.sin(angle) * 15);
      }
      animFrame = requestAnimationFrame(animatePan);
    };
    animFrame = requestAnimationFrame(animatePan);
    return () => cancelAnimationFrame(animFrame);
  }, [isDragging, isAutoPlaying]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - panOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    // Bound the panoramic pan
    if (newOffset >= -60 && newOffset <= 60) {
      setPanOffset(newOffset);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - panOffset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const newOffset = e.touches[0].clientX - startX;
    if (newOffset >= -60 && newOffset <= 60) {
      setPanOffset(newOffset);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const nextPoint = () => {
    setCurrentPointIndex((prev) => (prev + 1) % VIRTUAL_TOUR_POINTS.length);
    setActiveHotspot(null);
    setPanOffset(0);
  };

  const prevPoint = () => {
    setCurrentPointIndex((prev) => (prev - 1 + VIRTUAL_TOUR_POINTS.length) % VIRTUAL_TOUR_POINTS.length);
    setActiveHotspot(null);
    setPanOffset(0);
  };

  return (
    <section id="tour-virtual" className="py-16 lg:py-24 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Experiência Imersiva em Alta Definição</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Visita Virtual Guiada 360°
            </h2>
            <p className="mt-2 text-stone-300 max-w-2xl text-base sm:text-lg">
              Explore cada detalhe dos nossos ambientes antes de agendar. Arraste para visualizar a visão panorâmica e clique nos pontos luminosos para ver especificações técnicas.
            </p>
          </div>

          {/* Quick Environment Selector Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25'
                  : 'bg-stone-800 text-stone-300 hover:text-white border border-stone-700'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              {isAutoPlaying ? 'Pausar Tour Automático' : 'Iniciar Tour Guiado'}
            </button>

            <button
              onClick={() => setShowHotspots(!showHotspots)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-stone-800 border border-stone-700 text-stone-300 hover:text-white cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              {showHotspots ? 'Ocultar Pontos' : 'Mostrar Pontos'}
            </button>
          </div>
        </div>

        {/* Room Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {VIRTUAL_TOUR_POINTS.map((point, idx) => {
            const isSelected = idx === currentPointIndex;
            return (
              <button
                key={point.id}
                onClick={() => {
                  setCurrentPointIndex(idx);
                  setActiveHotspot(null);
                  setPanOffset(0);
                }}
                type="button"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-stone-800/90 hover:bg-stone-700 text-stone-300 border border-stone-700/80 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900/30 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span>{point.name}</span>
              </button>
            );
          })}
        </div>

        {/* 360 Interactive Viewer Canvas & Stage */}
        <div 
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl group select-none"
        >
          {/* Main Panoramic Image Container */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Background image transformed with panOffset for panoramic feel */}
            <div
              className="absolute inset-0 w-[125%] h-full -left-[12.5%] transition-transform ease-out duration-150"
              style={{
                transform: `scale(1.08) translateX(${panOffset * 0.35}%)`,
              }}
            >
              <img
                src={currentPoint.image}
                alt={currentPoint.name}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />
            </div>

            {/* Simulated 360 Navigation Compass Overlay Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-stone-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700 text-xs text-stone-200">
              <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Arraste para explorar o espaço em 360°</span>
            </div>

            {/* Controls Top Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                type="button"
                aria-label={isMuted ? 'Ativar áudio guia' : 'Desativar áudio guia'}
                className="w-9 h-9 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Ativar áudio de narração' : 'Mutar áudio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={toggleFullscreen}
                type="button"
                aria-label="Alternar tela cheia"
                className="w-9 h-9 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Interactive Hotspots on the scene */}
            {showHotspots && currentPoint.hotspots.map((spot) => {
              // Adjust position based on panOffset for parallax alignment
              const adjustedX = spot.x + (panOffset * 0.15);
              const isSpotActive = activeHotspot?.id === spot.id;

              return (
                <div
                  key={spot.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
                  style={{
                    left: `${adjustedX}%`,
                    top: `${spot.y}%`,
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isSpotActive ? null : spot);
                    }}
                    type="button"
                    className="relative group/hotspot cursor-pointer"
                  >
                    {/* Pulsing ring */}
                    <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                    {/* Core button */}
                    <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/50 hover:scale-110 transition-transform">
                      <Info className="w-4 h-4" />
                    </span>
                    {/* Tooltip on hover */}
                    <span className="hidden sm:block absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity bg-stone-900 text-stone-100 text-xs font-semibold px-2.5 py-1 rounded shadow-md whitespace-nowrap pointer-events-none border border-stone-700">
                      {spot.title}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Active Hotspot Info Card Modal / Popover */}
            {activeHotspot && (
              <div className="absolute bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-30 max-w-sm bg-stone-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 shadow-2xl text-stone-100 animate-in fade-in zoom-in-95">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>{activeHotspot.title}</span>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    type="button"
                    className="text-stone-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-stone-800"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            )}

            {/* Left and Right Scene Navigation Arrows */}
            <button
              onClick={prevPoint}
              type="button"
              aria-label="Ambiente anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-900 backdrop-blur-md border border-stone-700 flex items-center justify-center text-stone-200 hover:text-amber-400 shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPoint}
              type="button"
              aria-label="Próximo ambiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-900 backdrop-blur-md border border-stone-700 flex items-center justify-center text-stone-200 hover:text-amber-400 shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Ambient Guided Audio Narration Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20 bg-stone-950/85 backdrop-blur-md border border-stone-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Áudio-Guia Narrativo
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 italic line-clamp-2">
                    "{currentPoint.narration}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  onClick={onOpenBooking}
                  type="button"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Quero Esse Ambiente</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specs & Details Panel underneath the viewer */}
          <div className="p-6 bg-stone-950 border-t border-stone-800 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                Ambiente {currentPointIndex + 1} de {VIRTUAL_TOUR_POINTS.length}
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-white mb-2">
                {currentPoint.name}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                {currentPoint.fullDesc}
              </p>

              {/* Key Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentPoint.highlightSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick capacity & metrics box */}
            <div className="bg-stone-900/90 rounded-xl p-4 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="text-xs text-stone-400 mb-1">Capacidade Recomendada</div>
                <div className="text-sm font-semibold text-stone-100 mb-3">
                  {currentPoint.capacity}
                </div>

                <div className="text-xs text-stone-400 mb-1">Metragem & Estrutura</div>
                <div className="text-sm font-semibold text-stone-100 mb-4">
                  {currentPoint.dimensions}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>Quer conhecer pessoalmente?</span>
                <a
                  href="#contato"
                  className="text-amber-400 font-bold hover:underline"
                >
                  Agendar Visita →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
