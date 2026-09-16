import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Flame, 
  Check, 
  Clock, 
  Award, 
  Wine, 
  Coffee, 
  ChefHat,
  HeartHandshake
} from 'lucide-react';
import { BUFFET_MENUS } from '../data/mockData';

interface BuffetServicesProps {
  onSelectBuffetForBooking: (buffetId: string) => void;
}

export const BuffetServices: React.FC<BuffetServicesProps> = ({ onSelectBuffetForBooking }) => {
  const [activeMenuId, setActiveMenuId] = useState(BUFFET_MENUS[0].id);
  const activeMenu = BUFFET_MENUS.find((m) => m.id === activeMenuId) || BUFFET_MENUS[0];

  return (
    <section id="buffet" className="py-20 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Gastronomia de Alto Padrão</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Serviços de Festas & Buffet Completo
          </h2>
          <p className="mt-3 text-stone-300 text-base sm:text-lg leading-relaxed">
            Cardápios fartos preparados no local por chefs experientes, com cortes nobres de carne na brasa, finger foods contemporâneos, louças refinadas e equipe uniformizada.
          </p>
        </div>

        {/* 4 Buffet Menu Cards with Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {BUFFET_MENUS.map((menu) => {
            const isCurrent = menu.id === activeMenuId;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenuId(menu.id)}
                type="button"
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-stone-800 border-amber-500 ring-2 ring-amber-500/30 shadow-xl'
                    : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                    {menu.badge}
                  </div>
                  <h3 className="font-serif-title text-lg font-bold text-white leading-snug mb-2">
                    {menu.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mb-4">
                    {menu.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-800 text-stone-300">
                  <span className="font-medium text-amber-300">Ver Cardápio</span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isCurrent ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                  }`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Menu Detail Showcase */}
        <div className="bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 mb-16">
          {/* Menu Image & Highlights */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[440px]">
            <img
              src={activeMenu.image}
              alt={activeMenu.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 text-xs font-bold uppercase tracking-wide inline-block mb-2">
                {activeMenu.badge}
              </span>
              <h4 className="font-serif-title text-2xl font-bold text-white">
                {activeMenu.title}
              </h4>
            </div>
          </div>

          {/* Detailed Course Breakdown */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <ChefHat className="w-4 h-4" />
                Estrutura & Itens do Cardápio
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-6">
                Composição Completa
              </h3>

              <div className="space-y-4 mb-8">
                {activeMenu.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-stone-900/80 p-3.5 rounded-xl border border-stone-800/80">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-stone-400">
                <span>Duração do serviço de buffet: </span>
                <strong className="text-white">4h30 de serviço ininterrupto</strong>
              </div>

              <button
                onClick={() => onSelectBuffetForBooking(activeMenu.id)}
                type="button"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Escolher Este Cardápio na Reserva</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* What our buffet team brings - Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <ChefHat className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Equipe Profissional</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mestres churrasqueiros, garçons treinados, copeiras e coordenador de salão uniformizados.
            </p>
          </div>

          <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Wine className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Louçaria & Cristais</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pratos em porcelana Oxford, talheres pesados em inox Tramontina e taças de cristal legítimo.
            </p>
          </div>

          <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Mesa de Café Colonial</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Café expresso, chás aromáticos, petit fours e docinhos crocantes para encerramento elegante.
            </p>
          </div>

          <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">Adaptação Alimentar</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Opções especiais para vegetarianos, veganos, celíacos ou intolerantes a lactose sem custo extra.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
