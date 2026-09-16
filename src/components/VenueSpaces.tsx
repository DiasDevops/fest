import React from 'react';
import { 
  Waves, 
  Flame, 
  Sparkles, 
  Users, 
  Check, 
  Compass, 
  Maximize2,
  CalendarCheck,
  Shield,
  Music,
  Wind
} from 'lucide-react';
import { VENUE_INFO } from '../data/mockData';

interface VenueSpacesProps {
  onNavigateToTour: () => void;
  onOpenBooking: () => void;
}

export const VenueSpaces: React.FC<VenueSpacesProps> = ({ onNavigateToTour, onOpenBooking }) => {
  return (
    <section id="espaco" className="py-20 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Infraestrutura Completa de 1.200m²</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ambientes Projetados para Celebrar
          </h2>
          <p className="mt-3 text-stone-300 text-base sm:text-lg">
            A integração perfeita entre um salão nobre climatizado de alto requinte, uma área gourmet completa com churrasqueira e chopeira, e uma piscina de tirar o fôlego com deck molhado.
          </p>
        </div>

        {/* Feature Space 1: Salão Nobre Climatizado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 bg-stone-950 p-6 sm:p-10 rounded-3xl border border-stone-800">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl h-[340px] sm:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85"
              alt="Salão Nobre Climatizado Villa Bella"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-stone-200">
              <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700">
                Pé direito 4,5m • 320 m²
              </span>
              <span className="bg-amber-500/90 text-stone-950 font-bold px-3 py-1 rounded-full">
                Até 250 convidados
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Wind className="w-4 h-4" />
              <span>Conforto Térmico & Acústica Premium</span>
            </div>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-4">
              Salão Principal Climatizado
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              Nosso salão foi construído com piso em porcelanato polido que confere elegância ímpar, isolamento acústico certificado para que a música role solta até altas horas sem incômodo e ar-condicionado central de última geração.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mesas redondas e cadeiras Tiffany inclusas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Grid aéreo para som e iluminação cênica</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lustres de cristal legítimo dimerizáveis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acessibilidade para idosos e cadeirantes</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToTour}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Ver Salão em 360°</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Space 2: Área Gourmet com Chopeira e Churrasqueira */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 bg-stone-950 p-6 sm:p-10 rounded-3xl border border-stone-800">
          <div className="lg:col-span-6 lg:order-2 relative rounded-2xl overflow-hidden shadow-2xl h-[340px] sm:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
              alt="Área Gourmet com churrasqueira e chopeira"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-stone-200">
              <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700">
                Torre Naja 2 Bicos de Chopp
              </span>
              <span className="bg-amber-500/90 text-stone-950 font-bold px-3 py-1 rounded-full">
                Churrasqueira Giratória Inox
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>O Ponto de Encontro do Evento</span>
            </div>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-4">
              Área Gourmet Master & Chopeira
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              Projetada para momentos de descontração e alta gastronomia. Conta com uma ampla bancada em granito nobre, chopeira com serpentina congelada, churrasqueira em aço inox 304 com grelha elevatória e forno de pizza à lenha.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Chopeira naja com torneiras duplas congeladas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Coifa de alta exaustão (sem fumaça no salão)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Freezer para bebidas e balcão refrigerado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Integrada diretamente com a piscina e o deck</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToTour}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Ver Área Gourmet em 360°</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Space 3: Piscina com Deck e Iluminação */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-950 p-6 sm:p-10 rounded-3xl border border-stone-800">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl h-[340px] sm:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=85"
              alt="Piscina com Deck e Iluminação Noturna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-stone-200">
              <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700">
                Deck em Cumaru • Cascata de Rocha
              </span>
              <span className="bg-amber-500/90 text-stone-950 font-bold px-3 py-1 rounded-full">
                Iluminação Cênica Noturna
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Waves className="w-4 h-4 text-amber-400" />
              <span>Visual Cenográfico para Fotos</span>
            </div>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-4">
              Piscina Resort & Deck Molhado
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              Água cristalina com sistema de ozônio, cascata relaxante e iluminação em LED multicolor que se transforma em um espetáculo visual quando o sol se põe. O deck de madeira circundante oferece espreguiçadeiras e ombrelones para descanso com estilo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prainha rasa para fotos com drinks e segurança infantil</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Iluminação subaquática programável (RGB)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deck de madeira tratada térmica e antiderrapante</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cascata em pedra natural com som relaxante</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToTour}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Ver Piscina em 360°</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
