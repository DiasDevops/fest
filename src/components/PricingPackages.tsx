import React, { useState } from 'react';
import { 
  Users, 
  Check, 
  Sparkles, 
  CalendarCheck, 
  HelpCircle, 
  ArrowRight, 
  CreditCard,
  Percent,
  Plus,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PACKAGES_DATA, EXTRA_SERVICES } from '../data/mockData';
import { ServicePackage } from '../types';

interface PricingPackagesProps {
  onSelectPackageForBooking: (packageId: string, guests: 50 | 100 | 200, extras: string[]) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPackageForBooking }) => {
  const [selectedGuests, setSelectedGuests] = useState<50 | 100 | 200>(100);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'cards' | 'comparativo'>('cards');

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  // Calculate extras total for current guest tier
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRA_SERVICES.find((e) => e.id === extraId);
    if (!extra) return sum;
    if (extra.perGuest) {
      return sum + extra.price * selectedGuests;
    }
    return sum + extra.price;
  }, 0);

  return (
    <section id="precos" className="py-20 bg-stone-100 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Tabela Transparente de Preços
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Valores Detalhados por Quantidade de Pessoas
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Compare nossos pacotes integrados com estrutura completa, salão, área gourmet, piscina e opções de buffet com preços fixos para <strong>50, 100 e 200 pessoas</strong>.
          </p>
        </div>

        {/* Guest Count Selector Bar (50, 100, 200 Convidados) */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-stone-200/80 border border-stone-200 max-w-2xl mx-auto mb-12">
          <div className="text-center mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Selecione o Porte do seu Evento:
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[50, 100, 200].map((tier) => {
              const isSelected = selectedGuests === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedGuests(tier as 50 | 100 | 200)}
                  type="button"
                  className={`py-3 sm:py-4 px-3 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/30 ring-2 ring-amber-500 scale-[1.02]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-lg sm:text-2xl font-bold font-serif-title">
                    <Users className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                    <span>{tier}</span>
                  </div>
                  <span className={`text-[11px] sm:text-xs font-medium ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                    Pessoas
                  </span>
                  {tier === 100 && (
                    <span className="mt-1 text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded">
                      Mais Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PACKAGES_DATA.map((pkg) => {
            const pricing = pkg.pricing[selectedGuests];
            const totalPrice = pricing.totalPrice + (pkg.id === 'festa_completa_buffet' ? extrasTotal : 0);
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-3xl transition-all duration-300 bg-white ${
                  isPopular
                    ? 'border-2 border-amber-500 shadow-2xl shadow-amber-900/10 ring-4 ring-amber-500/10 lg:-translate-y-2'
                    : 'border border-stone-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                    ★ Melhor Custo-Benefício
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-serif-title text-2xl font-bold text-stone-900">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-stone-500 min-h-[36px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 mb-6">
                    <div className="text-xs text-stone-500 font-medium">
                      Investimento para <strong>{selectedGuests} convidados</strong>:
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-stone-500 text-base font-medium">R$</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                        {pricing.totalPrice.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-xs text-stone-500 font-normal">/evento</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-stone-600">Equivalente a:</span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        R$ {pricing.pricePerPerson},00 por pessoa
                      </span>
                    </div>
                  </div>

                  {/* Buffet status pill */}
                  <div className="mb-6">
                    <div className={`text-xs p-3 rounded-xl border flex items-start gap-2.5 ${
                      pkg.buffetIncluded
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        pkg.buffetIncluded ? 'text-emerald-600' : 'text-stone-400'
                      }`} />
                      <div>
                        <strong className="block text-xs uppercase tracking-wide">
                          {pkg.buffetIncluded ? 'Buffet Completo Incluso' : 'Buffet Não Incluso'}
                        </strong>
                        <span className="text-[11px] leading-tight text-stone-600">
                          {pkg.buffetDescription}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      O que está incluído:
                    </div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-stone-100">
                    <button
                      onClick={() => onSelectPackageForBooking(pkg.id, selectedGuests, selectedExtras)}
                      type="button"
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPopular
                          ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Reservar para {selectedGuests} Pessoas</span>
                    </button>
                    <div className="text-center text-[11px] text-stone-400 mt-2 flex items-center justify-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      Sinal de {pkg.depositPercentage}% + até 10x s/ juros no cartão
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Add-ons & Extras Simulator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-200">
            <div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900">
                Opcionais para Personalizar seu Evento ({selectedGuests} Pessoas)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Adicione serviços extras de acordo com a sua necessidade. Os valores são calculados automaticamente para o porte selecionado.
              </p>
            </div>
            {selectedExtras.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-right">
                <span className="text-xs text-amber-800 block">Adicionais selecionados:</span>
                <span className="text-lg font-bold text-amber-900">+ R$ {extrasTotal.toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTRA_SERVICES.map((extra) => {
              const isSelected = selectedExtras.includes(extra.id);
              const calculatedPrice = extra.perGuest ? extra.price * selectedGuests : extra.price;

              return (
                <div
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-bold text-sm text-stone-900">{extra.name}</div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {extra.description}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-stone-950'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      {extra.perGuest ? `R$ ${extra.price}/pessoa` : 'Preço fixo'}
                    </span>
                    <span className="font-bold text-stone-900">
                      + R$ {calculatedPrice.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contrato transparente com cláusula de cancelamento, vistoria técnica e nota fiscal inclusa.</span>
            </div>

            <button
              onClick={() => onSelectPackageForBooking('festa_completa_buffet', selectedGuests, selectedExtras)}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Avançar com Pacote Completo ({selectedGuests} Pessoas)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
