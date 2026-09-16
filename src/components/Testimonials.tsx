import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  Users, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="depoimentos" className="py-20 bg-stone-100 text-stone-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            Experiências Inesquecíveis
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Depoimentos de Quem Já Celebrou Aqui
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Veja a opinião sincera de noivos, aniversariantes e empresas que confiaram em nossa estrutura para momentos únicos.
          </p>

          {/* Social Proof Stats Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 bg-white px-6 py-3 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-700">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm">4.9 / 5.0</span>
            </div>
            <span className="text-stone-300">•</span>
            <span>+450 eventos realizados com sucesso</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-semibold">99.4% de recomendação</span>
          </div>
        </div>

        {/* Featured Testimonial Carousel Card */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {(() => {
            const item = TESTIMONIALS_DATA[activeIndex];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xl shadow-stone-200/80 relative">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-amber-100 -z-0 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Photo of the event / couple */}
                  <div className="md:col-span-4 flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg mb-3">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-serif-title font-bold text-lg text-stone-900">
                      {item.author}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold mb-2">
                      {item.role}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Comment & Highlight */}
                  <div className="md:col-span-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-semibold text-stone-700 flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-600" />
                        {item.guestsCount} convidados
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {item.date}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Reserva Verificada
                      </span>
                    </div>

                    <h4 className="font-serif-title text-lg sm:text-xl font-bold text-stone-900 mb-3 leading-snug">
                      "{item.highlight}"
                    </h4>

                    <p className="text-sm text-stone-600 leading-relaxed italic mb-4">
                      "{item.comment}"
                    </p>

                    <div className="text-xs text-stone-400">
                      Tipo de Celebração: <strong className="text-stone-700">{item.eventType}</strong>
                    </div>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS_DATA.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Ir para depoimento ${idx + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === activeIndex ? 'w-8 bg-amber-500' : 'w-2 bg-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      type="button"
                      aria-label="Depoimento anterior"
                      className="w-10 h-10 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      type="button"
                      aria-label="Próximo depoimento"
                      className="w-10 h-10 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Mini cards grid below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                idx === activeIndex
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <h4 className="font-bold text-sm text-stone-900 leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {item.eventType} ({item.guestsCount} convidados)
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-600 line-clamp-3 italic">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
