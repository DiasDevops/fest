import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { VENUE_INFO } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Mini popup card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-stone-900 border border-stone-700 rounded-2xl p-4 shadow-2xl text-stone-100 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white">Atendimento Villa Bella</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="text-stone-400 hover:text-white text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-stone-300 mb-3">
            Olá! Deseja consultar uma data específica ou agendar uma visita presencial para conhecer a piscina e a área gourmet?
          </p>
          <a
            href={VENUE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Iniciar Conversa</span>
          </a>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Atendimento via WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 flex items-center justify-center shadow-xl shadow-emerald-950/40 hover:scale-110 transition-all cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-stone-950 text-emerald-500" />
      </button>
    </div>
  );
};
