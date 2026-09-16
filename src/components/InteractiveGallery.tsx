import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CalendarCheck, 
  Layers,
  Camera,
  Tag
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/mockData';
import { GalleryPhoto } from '../types';

interface InteractiveGalleryProps {
  onOpenBooking: () => void;
}

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as Fotos' },
    { id: 'salao', label: 'Salão Climatizado' },
    { id: 'piscina', label: 'Piscina & Deck' },
    { id: 'gourmet', label: 'Área Gourmet' },
    { id: 'buffet', label: 'Buffet Completo' },
    { id: 'eventos', label: 'Eventos Reais' },
  ];

  const filteredPhotos = activeCategory === 'todos'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, filteredPhotos]);

  const handleNext = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="galeria" className="py-20 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Alta Resolução & Detalhes Reais</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Galeria Interativa Imersiva
            </h2>
            <p className="mt-2 text-stone-300 max-w-xl text-base">
              Veja fotos em alta definição dos nossos espaços decorados, piscina iluminada, área gourmet e pratos de buffet em eventos reais.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl cursor-pointer"
            >
              {/* Photo Image */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-stone-700 text-[11px] font-medium text-amber-300">
                  <Tag className="w-3 h-3" />
                  {photo.categoryLabel}
                </span>
              </div>

              {/* Expand icon on top right */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 flex items-center justify-center text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details on Card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif-title text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {photo.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Clique para ampliar em alta definição</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA within gallery */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-400 mb-4">
            Gostaria de ver o espaço pessoalmente ou tirar dúvidas sobre a estrutura para sua data?
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              type="button"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Verificar Disponibilidade da Data</span>
            </button>
            <a
              href="#tour-virtual"
              className="px-5 py-3.5 rounded-xl border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white text-sm font-medium transition-all"
            >
              Fazer a Visita Virtual 360°
            </a>
          </div>
        </div>

      </div>

      {/* Fullscreen HD Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxPhoto(null)}
            type="button"
            aria-label="Fechar galeria"
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white hover:scale-105 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev and Next navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            type="button"
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-200 hover:text-amber-400 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            type="button"
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-200 hover:text-amber-400 transition-all cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Modal Content Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
          >
            {/* High-res Image */}
            <div className="relative max-h-[70vh] bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxPhoto.imageUrl}
                alt={lightboxPhoto.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {lightboxPhoto.categoryLabel}
                  </span>
                  <span className="text-stone-600">•</span>
                  <span className="text-xs text-stone-400">
                    Foto {filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id) + 1} de {filteredPhotos.length}
                  </span>
                </div>
                <h3 className="font-serif-title text-xl font-bold text-white">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                  {lightboxPhoto.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    setLightboxPhoto(null);
                    onOpenBooking();
                  }}
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reservar Este Espaço</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
