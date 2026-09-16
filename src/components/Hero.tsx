import React from 'react';
import { 
  Compass, 
  CalendarCheck, 
  Users, 
  Sparkles, 
  UtensilsCrossed, 
  Waves, 
  Flame, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { VENUE_INFO } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToTour: () => void;
  onNavigateToPricing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
  onNavigateToTour, 
  onNavigateToPricing 
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      {/* Background with luxury event atmosphere & overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
          alt="Salão de festas decorado Villa Bella"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform animate-pulse duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Estrutura completa de 1.200m² para momentos inesquecíveis</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 max-w-4xl leading-[1.15]">
          Salão de Festas com{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300">
            Área Gourmet, Piscina
          </span>{' '}
          e Buffet Completo
        </h1>

        <p className="mt-5 text-base sm:text-xl text-stone-300 max-w-3xl leading-relaxed">
          Celebre casamentos, aniversários, festas de 15 anos e encontros corporativos com sofisticação total.
          Faça uma <strong>visita virtual guiada em 360°</strong>, consulte preços transparentes para <strong>50, 100 e 200 convidados</strong> e garanta sua reserva online.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenBooking}
            type="button"
            className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Simular & Reservar Online</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <button
            onClick={onNavigateToTour}
            type="button"
            className="flex items-center gap-2.5 px-5 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-400/60 text-amber-300 text-base font-semibold transition-all backdrop-blur-sm cursor-pointer"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Iniciar Visita Virtual 360°</span>
          </button>

          <button
            onClick={onNavigateToPricing}
            type="button"
            className="flex items-center gap-2 px-5 py-4 rounded-xl text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700 bg-stone-950/60 hover:bg-stone-900 text-sm font-medium transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-500" />
            <span>Ver Preços (50, 100 e 200 pessoas)</span>
          </button>
        </div>

        {/* Quick Trust Highlights & Statistics */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-100 font-serif-title">
                50 a 250
              </div>
              <div className="text-xs text-stone-400">Capacidade de convidados</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-100 font-serif-title">
                Gourmet & Grill
              </div>
              <div className="text-xs text-stone-400">Chopeira naja & churrasqueira</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Waves className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-100 font-serif-title">
                Piscina & Deck
              </div>
              <div className="text-xs text-stone-400">Aquecida com iluminação LED</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-100 font-serif-title">
                Buffet Completo
              </div>
              <div className="text-xs text-stone-400">Churrasco, coquetel ou jantar</div>
            </div>
          </div>
        </div>

        {/* Quick Environment Snapshot Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-stone-400">
          <span className="flex items-center gap-1 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Salão 100% Climatizado
          </span>
          <span className="flex items-center gap-1 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Estacionamento com Valet
          </span>
          <span className="flex items-center gap-1 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Gerador Standby Silencioso
          </span>
          <span className="flex items-center gap-1 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Acessibilidade PCD
          </span>
          <span className="flex items-center gap-1 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Isolamento Acústico Certificado
          </span>
        </div>
      </div>
    </section>
  );
};
