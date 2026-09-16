import React, { useState } from 'react';
import { 
  Sparkles, 
  Phone, 
  Compass, 
  CalendarCheck, 
  Menu, 
  X, 
  MessageCircle,
  MapPin
} from 'lucide-react';
import { VENUE_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateToTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onNavigateToTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'O Espaço', href: '#espaco' },
    { label: 'Visita 360°', href: '#tour-virtual', highlight: true },
    { label: 'Preços 50/100/200', href: '#precos' },
    { label: 'Buffet Completo', href: '#buffet' },
    { label: 'Galeria HD', href: '#galeria' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all duration-300">
      {/* Top micro bar with address, hours and phone */}
      <div className="hidden md:block bg-stone-950 text-xs text-stone-400 py-1.5 px-4 border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {VENUE_INFO.address}
            </span>
            <span className="text-stone-600">|</span>
            <span>{VENUE_INFO.hours}</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${VENUE_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              {VENUE_INFO.phoneDisplay}
            </a>
            <a
              href={VENUE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Direto
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="font-serif-title text-xl font-bold text-stone-100 tracking-wide flex items-center gap-1.5">
                Villa Bella
                <span className="text-xs tracking-widest font-sans font-semibold text-amber-400 uppercase bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-full">
                  Eventos
                </span>
              </div>
              <p className="text-xs text-stone-400 tracking-wider">
                Salão • Espaço Gourmet • Piscina
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  link.highlight
                    ? 'text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onNavigateToTour}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-stone-700 hover:border-amber-500/60 text-stone-300 hover:text-amber-400 text-sm font-medium transition-all bg-stone-800/50 hover:bg-stone-800 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Tour 360°</span>
            </button>

            <button
              onClick={onOpenBooking}
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-sm font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserva Online</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              type="button"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold"
            >
              Reservar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Abrir menu"
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToTour();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-700 text-amber-400 text-sm font-medium bg-stone-800"
            >
              <Compass className="w-4 h-4" />
              Visita Virtual 360° Guiada
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              Fazer Reserva Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
