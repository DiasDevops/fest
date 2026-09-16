import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Instagram, 
  Facebook, 
  Youtube, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { VENUE_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="bg-stone-950 text-stone-200 border-t border-stone-800 relative">
      {/* Top Footer Banner */}
      <div className="bg-stone-900/60 border-b border-stone-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-900/40 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                Villa Bella Eventos
              </h3>
              <p className="text-xs sm:text-sm text-stone-400">
                Salão Nobre Climatizado • Área Gourmet c/ Chopeira • Piscina c/ Deck • Buffet Completo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={VENUE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Voltar ao topo da página"
              className="w-11 h-11 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Physical Address & Contact Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Endereço & Atendimento Presencial
            </h4>

            {/* Address */}
            <div className="flex items-start gap-3 text-sm text-stone-300">
              <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-medium">Localização Privilegiada:</strong>
                <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                  {VENUE_INFO.address}
                </p>
                <p className="text-xs text-stone-400">CEP: {VENUE_INFO.cep}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(VENUE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline mt-1 font-semibold"
                >
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Telephones */}
            <div className="flex items-start gap-3 text-sm text-stone-300">
              <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-medium">Telefones & WhatsApp:</strong>
                <a
                  href={`tel:${VENUE_INFO.phone.replace(/\D/g, '')}`}
                  className="block text-xs text-stone-300 hover:text-amber-400 transition-colors mt-0.5"
                >
                  WhatsApp / Celular: <strong>{VENUE_INFO.phoneDisplay}</strong>
                </a>
                <a
                  href={`tel:${VENUE_INFO.landline.replace(/\D/g, '')}`}
                  className="block text-xs text-stone-400 hover:text-amber-400 transition-colors"
                >
                  Telefone Fixo Comercial: {VENUE_INFO.landline}
                </a>
              </div>
            </div>

            {/* Emails */}
            <div className="flex items-start gap-3 text-sm text-stone-300">
              <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-medium">Correio Eletrônico:</strong>
                <a
                  href={`mailto:${VENUE_INFO.email}`}
                  className="block text-xs text-stone-300 hover:text-amber-400 transition-colors mt-0.5"
                >
                  {VENUE_INFO.email}
                </a>
                <a
                  href={`mailto:${VENUE_INFO.emailReservas}`}
                  className="block text-xs text-stone-400 hover:text-amber-400 transition-colors"
                >
                  {VENUE_INFO.emailReservas}
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3 text-sm text-stone-300">
              <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white font-medium">Horário de Atendimento:</strong>
                <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                  {VENUE_INFO.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Social Media Icons (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#espaco" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Estrutura & Ambientes
                </a>
              </li>
              <li>
                <a href="#tour-virtual" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Visita Virtual 360° Guiada
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Preços para 50, 100 e 200 Pessoas
                </a>
              </li>
              <li>
                <a href="#buffet" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Cardápios do Buffet Completo
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Galeria de Fotos em Alta Definição
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-amber-400 transition-colors block py-0.5">
                  • Depoimentos de Clientes Satisfeitos
                </a>
              </li>
              <li>
                <a href="#reserva" className="text-amber-400 font-bold hover:underline block py-0.5">
                  • Fazer Pré-Reserva Online →
                </a>
              </li>
            </ul>

            {/* Clickable Social Media Section */}
            <div className="pt-4 border-t border-stone-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Redes Sociais Oficiais
              </h5>
              <p className="text-[11px] text-stone-400 mb-3">
                Siga nosso perfil e acompanhe vídeos de casamentos, dicas de decoração e novidades em tempo real:
              </p>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={VENUE_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Siga o Villa Bella no Instagram"
                  className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-pink-500/60 flex items-center justify-center text-stone-300 hover:text-pink-400 hover:bg-stone-800 transition-all hover:scale-105 cursor-pointer shadow-sm"
                  title="Instagram @villabellaeventos"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href={VENUE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fale conosco pelo WhatsApp"
                  className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:bg-stone-800 transition-all hover:scale-105 cursor-pointer shadow-sm"
                  title="WhatsApp Comercial"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={VENUE_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Página do Villa Bella no Facebook"
                  className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-500/60 flex items-center justify-center text-stone-300 hover:text-blue-400 hover:bg-stone-800 transition-all hover:scale-105 cursor-pointer shadow-sm"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href={VENUE_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Canal do Villa Bella no YouTube"
                  className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-red-500/60 flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-stone-800 transition-all hover:scale-105 cursor-pointer shadow-sm"
                  title="Vídeos no YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                {/* TikTok */}
                <a
                  href={VENUE_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok do Villa Bella"
                  className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-all hover:scale-105 cursor-pointer shadow-sm text-xs font-bold"
                  title="TikTok"
                >
                  <span>TT</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Contact Form in Footer (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              Contato Rápido no Rodapé
            </h4>
            <h3 className="font-serif-title text-xl font-bold text-white mb-2">
              Envie uma Mensagem Direta
            </h3>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              Tem alguma dúvida sobre datas disponíveis ou deseja um orçamento customizado? Preencha abaixo e nossa equipe responderá prontamente.
            </p>

            {formSent ? (
              <div className="bg-emerald-950/60 border border-emerald-600/50 rounded-2xl p-5 text-center text-emerald-200 animate-in fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h5 className="font-bold text-sm text-white">Mensagem Enviada com Sucesso!</h5>
                <p className="text-xs text-emerald-300/90 mt-1">
                  Obrigado pelo contato! Nossa equipe de atendimento retornará via WhatsApp ou e-mail em até 15 minutos.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  type="button"
                  className="mt-3 text-xs underline font-semibold text-emerald-400 cursor-pointer"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuickContact} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Beatriz Lima"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                      WhatsApp / Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 placeholder-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 placeholder-stone-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Como podemos te ajudar? (Data aproximada / N° de convidados)
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ex: Gostaria de saber disponibilidade para outubro para 100 pessoas..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem Rápida'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Seals */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Villa Bella Eventos. Todos os direitos reservados. CNPJ: 34.567.890/0001-12.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Contrato registrado & Alvará de funcionamento regularizado
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
