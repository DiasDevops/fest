import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Copy, 
  Printer, 
  ArrowRight,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PACKAGES_DATA, EXTRA_SERVICES, BUFFET_MENUS, VENUE_INFO } from '../data/mockData';
import { EventType, EventShift, BuffetOptionId, BookingSubmission } from '../types';

interface OnlineBookingProps {
  initialPackageId?: string;
  initialGuests?: 50 | 100 | 200;
  initialExtras?: string[];
  initialBuffetId?: BuffetOptionId;
}

export const OnlineBooking: React.FC<OnlineBookingProps> = ({
  initialPackageId = 'festa_completa_buffet',
  initialGuests = 100,
  initialExtras = [],
  initialBuffetId = 'churrasco',
}) => {
  // Form State
  const [selectedPackageId, setSelectedPackageId] = useState(initialPackageId);
  const [guestCount, setGuestCount] = useState<number>(initialGuests);
  const [eventType, setEventType] = useState<EventType>('aniversario_adulto');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventShift, setEventShift] = useState<EventShift>('noturno');
  const [buffetId, setBuffetId] = useState<BuffetOptionId>(initialBuffetId);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(initialExtras);
  
  // User personal info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [submissionResult, setSubmissionResult] = useState<BookingSubmission | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Active Package
  const currentPackage = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[1];

  // Helper to calculate pricing based on guestCount
  const calculatePricing = () => {
    // If standard 50, 100, 200
    if (guestCount === 50) return currentPackage.pricing[50].totalPrice;
    if (guestCount === 100) return currentPackage.pricing[100].totalPrice;
    if (guestCount === 200) return currentPackage.pricing[200].totalPrice;

    // Linear interpolation / per-guest scaling for custom counts
    const perGuestRate = currentPackage.pricing[100].pricePerPerson;
    return Math.round(perGuestRate * guestCount);
  };

  const packagePrice = calculatePricing();

  // Extras calculation
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRA_SERVICES.find((e) => e.id === extraId);
    if (!extra) return sum;
    return sum + (extra.perGuest ? extra.price * guestCount : extra.price);
  }, 0);

  const totalPrice = packagePrice + extrasPrice;
  const depositPrice = Math.round(totalPrice * (currentPackage.depositPercentage / 100));

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !eventDate) {
      alert('Por favor, preencha os dados obrigatórios: Nome, E-mail, Telefone e Data do Evento.');
      return;
    }

    const randomProtocol = `VB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const submission: BookingSubmission = {
      protocol: randomProtocol,
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      shift: eventShift,
      guestCount,
      packageId: selectedPackageId,
      buffetId: currentPackage.buffetIncluded ? buffetId : 'nenhum',
      selectedExtras,
      notes,
      totalPrice,
      depositPrice,
      submittedAt: new Date().toLocaleDateString('pt-BR'),
    };

    setSubmissionResult(submission);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#ffffff'],
      });
    } catch {
      // Ignore if unavailable
    }
  };

  const handleCopyProtocol = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.protocol);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const generateWhatsAppUrl = () => {
    if (!submissionResult) return VENUE_INFO.whatsappUrl;
    const msg = `*SOLICITAÇÃO DE PRÉ-RESERVA VILLA BELLA*\n\n` +
      `*Protocolo:* ${submissionResult.protocol}\n` +
      `*Cliente:* ${submissionResult.fullName}\n` +
      `*Telefone:* ${submissionResult.phone}\n` +
      `*Data Pretendida:* ${submissionResult.eventDate}\n` +
      `*Turno:* ${submissionResult.shift.toUpperCase()}\n` +
      `*Convidados:* ${submissionResult.guestCount} pessoas\n` +
      `*Pacote:* ${currentPackage.name}\n` +
      `*Total Estimado:* R$ ${submissionResult.totalPrice.toLocaleString('pt-BR')}\n` +
      `*Sinal de Reserva:* R$ ${submissionResult.depositPrice.toLocaleString('pt-BR')}\n\n` +
      `Olá! Acabei de gerar minha solicitação no site e gostaria de confirmar a data e agendar uma visita.`;
    return `https://wa.me/5511987654321?text=${encodeURIComponent(msg)}`;
  };

  // Today for date minimum
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reserva" className="py-20 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Sistema Integrado de Agendamento</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Reserva Online & Simulação Instantânea
          </h2>
          <p className="mt-3 text-stone-300 text-base sm:text-lg">
            Configure seu evento em poucos cliques, confira o valor calculado em tempo real e garanta sua data com prioridade.
          </p>
        </div>

        {/* Success Confirmation View */}
        {submissionResult ? (
          <div className="max-w-3xl mx-auto bg-stone-950 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl text-stone-100 animate-in fade-in zoom-in-95">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Solicitação Registrada com Sucesso!
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
                Sua Data foi Pré-Bloqueada
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto">
                Parabéns, <strong>{submissionResult.fullName}</strong>! Recebemos sua solicitação de reserva para <strong>{submissionResult.eventDate}</strong>.
              </p>
            </div>

            {/* Protocol Card */}
            <div className="bg-stone-900 rounded-2xl p-5 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                  Número do Protocolo Oficial:
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-amber-400">
                  {submissionResult.protocol}
                </span>
              </div>
              <button
                onClick={handleCopyProtocol}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Copiado!' : 'Copiar Protocolo'}</span>
              </button>
            </div>

            {/* Event Summary Details */}
            <div className="space-y-3 bg-stone-900/60 p-5 rounded-2xl border border-stone-800/80 text-xs sm:text-sm mb-8">
              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Pacote Escolhido:</span>
                <span className="font-semibold text-white">{currentPackage.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Data e Turno:</span>
                <span className="font-semibold text-white">
                  {submissionResult.eventDate} • Turno {submissionResult.shift.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Quantidade de Convidados:</span>
                <span className="font-semibold text-white">{submissionResult.guestCount} Pessoas</span>
              </div>
              {submissionResult.selectedExtras.length > 0 && (
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Opcionais Incluídos:</span>
                  <span className="font-semibold text-amber-300">
                    {submissionResult.selectedExtras.length} adicionais selecionados
                  </span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-stone-800 text-base font-bold">
                <span className="text-white">Valor Total Estimado:</span>
                <span className="text-amber-400">
                  R$ {submissionResult.totalPrice.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between py-1 text-xs text-stone-400">
                <span>Sinal de Confirmação ({currentPackage.depositPercentage}%):</span>
                <span className="font-semibold text-stone-200">
                  R$ {submissionResult.depositPrice.toLocaleString('pt-BR')} (restante parcelável)
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmar Reserva no WhatsApp Oficial</span>
              </a>

              <button
                onClick={() => setSubmissionResult(null)}
                type="button"
                className="w-full sm:w-auto py-4 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-medium transition-all cursor-pointer"
              >
                Fazer Nova Simulação
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Reservation Form */
          <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Event Configurator (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Guest Count Selection (50, 100, 200 or Custom) */}
              <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Quantidade de Convidados</span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Tabela fixa: 50, 100 ou 200 pessoas
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[50, 100, 200].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setGuestCount(tier)}
                      className={`py-3 px-3 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        guestCount === tier
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-serif-title">{tier}</span>
                      <span className="text-[11px] uppercase tracking-wider">Pessoas</span>
                    </button>
                  ))}
                </div>

                {/* Custom slider */}
                <div className="pt-3 border-t border-stone-800 flex items-center gap-4">
                  <span className="text-xs text-stone-400 whitespace-nowrap">Ajuste Livre:</span>
                  <input
                    type="range"
                    min="30"
                    max="250"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-white bg-stone-800 px-2 py-1 rounded min-w-[55px] text-center">
                    {guestCount} pax
                  </span>
                </div>
              </div>

              {/* Step 2: Date, Shift, and Event Type */}
              <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Data, Turno & Tipo de Evento</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Data Desejada *
                    </label>
                    <input
                      type="date"
                      min={today}
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Tipo de Celebração *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventType)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="casamento">Casamento / Noivado</option>
                      <option value="15_anos">Festa de 15 Anos (Debutante)</option>
                      <option value="aniversario_adulto">Aniversário Adulto</option>
                      <option value="confraternizacao">Confraternização / Família</option>
                      <option value="corporativo">Evento Corporativo / Empresa</option>
                      <option value="infantil">Festa Infantil / Família</option>
                    </select>
                  </div>
                </div>

                {/* Shift Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Turno de Horário:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'diurno', label: 'Diurno', time: '09h às 17h' },
                      { id: 'noturno', label: 'Noturno', time: '18h às 02h' },
                      { id: 'integral', label: 'Diária Integral', time: '09h às 02h' },
                    ].map((shift) => (
                      <button
                        key={shift.id}
                        type="button"
                        onClick={() => setEventShift(shift.id as EventShift)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          eventShift === shift.id
                            ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="font-bold text-xs">{shift.label}</div>
                        <div className="text-[11px] text-stone-400">{shift.time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Package & Buffet Selection */}
              <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Pacote de Serviços</span>
                </div>

                <div className="space-y-3">
                  {PACKAGES_DATA.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    const priceForCount = pkg.pricing[guestCount as 50 | 100 | 200]?.totalPrice || (pkg.pricing[100].pricePerPerson * guestCount);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 border-amber-500 ring-2 ring-amber-500/20'
                            : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif-title font-bold text-white text-base">
                                {pkg.name}
                              </h4>
                              {pkg.isPopular && (
                                <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded">
                                  Mais Escolhido
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-400 mt-0.5">
                              {pkg.tagline}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs text-stone-400 block">Preço Base:</span>
                            <span className="text-base sm:text-lg font-bold text-amber-400">
                              R$ {priceForCount.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* If selected package includes buffet, show menu choice */}
                {currentPackage.buffetIncluded && (
                  <div className="pt-3 border-t border-stone-800">
                    <label className="block text-xs font-semibold text-amber-400 mb-2">
                      Cardápio de Buffet Escolhido:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BUFFET_MENUS.map((menu) => (
                        <button
                          key={menu.id}
                          type="button"
                          onClick={() => setBuffetId(menu.id as BuffetOptionId)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            buffetId === menu.id
                              ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500'
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{menu.title}</div>
                          <div className="text-[10px] text-stone-400 line-clamp-1">{menu.badge}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Optional Extras */}
              <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">
                    4
                  </span>
                  <span>Opcionais Extras (Opcional)</span>
                </div>

                <div className="space-y-2">
                  {EXTRA_SERVICES.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    const cost = extra.perGuest ? extra.price * guestCount : extra.price;

                    return (
                      <label
                        key={extra.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-500/60 text-white'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleExtra(extra.id)}
                            className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
                          />
                          <div>
                            <span className="text-xs font-bold text-stone-200 block">
                              {extra.name}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {extra.description}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-amber-400 shrink-0 ml-3">
                          + R$ {cost.toLocaleString('pt-BR')}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Contact Information */}
              <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">
                    5
                  </span>
                  <span>Seus Dados de Contato</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva Santos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    E-mail para Envio do Contrato *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Observações ou Pedidos Especiais
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Conte-nos detalhes como tema da festa, bandas, restrições alimentares ou dúvidas..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Summary & Checkout Card (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/50 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h3 className="font-serif-title text-xl font-bold text-white">
                    Resumo do Orçamento
                  </h3>
                  <span className="text-xs bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    {guestCount} Pessoas
                  </span>
                </div>

                {/* Line items */}
                <div className="py-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-stone-300">
                    <span>{currentPackage.name}</span>
                    <span className="font-semibold text-white">
                      R$ {packagePrice.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {currentPackage.buffetIncluded && (
                    <div className="flex justify-between text-stone-400 text-xs">
                      <span>Cardápio Buffet:</span>
                      <span className="text-amber-300">
                        {BUFFET_MENUS.find((m) => m.id === buffetId)?.title || 'Churrasco Nobre'}
                      </span>
                    </div>
                  )}

                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Adicionais ({selectedExtras.length} itens):</span>
                      <span className="font-semibold text-white">
                        + R$ {extrasPrice.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-400 text-xs">
                    <span>Turno:</span>
                    <span className="text-stone-200 capitalize">{eventShift}</span>
                  </div>

                  <div className="flex justify-between text-stone-400 text-xs">
                    <span>Data:</span>
                    <span className="text-stone-200">{eventDate || 'Não definida'}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-stone-800 mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider block">
                        Valor Total Estimado:
                      </span>
                      <span className="text-xs text-emerald-400 font-medium">
                        (R$ {Math.round(totalPrice / guestCount)},00 por pessoa)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">
                        R$ {totalPrice.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 bg-stone-900 p-3.5 rounded-xl border border-stone-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-stone-300">
                      <span>Sinal para confirmação ({currentPackage.depositPercentage}%):</span>
                      <span className="font-bold text-amber-300">
                        R$ {depositPrice.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-400 text-[11px]">
                      <span>Saldo restante:</span>
                      <span>Em até 10x sem juros no cartão ou via PIX</span>
                    </div>
                  </div>
                </div>

                {/* Action Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>Confirmar Pré-Reserva Online</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center mt-3">
                  Ao confirmar, você receberá um protocolo oficial com pré-bloqueio da data por 48 horas para visita presencial ou fechamento via contrato.
                </p>

                <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-center gap-2 text-xs text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Ambiente 100% Seguro & Protegido</span>
                </div>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
