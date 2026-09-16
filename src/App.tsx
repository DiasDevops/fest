import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VenueSpaces } from './components/VenueSpaces';
import { VirtualTour } from './components/VirtualTour';
import { PricingPackages } from './components/PricingPackages';
import { BuffetServices } from './components/BuffetServices';
import { InteractiveGallery } from './components/InteractiveGallery';
import { Testimonials } from './components/Testimonials';
import { OnlineBooking } from './components/OnlineBooking';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BuffetOptionId } from './types';

export default function App() {
  const [bookingPackageId, setBookingPackageId] = useState<string>('festa_completa_buffet');
  const [bookingGuests, setBookingGuests] = useState<50 | 100 | 200>(100);
  const [bookingExtras, setBookingExtras] = useState<string[]>([]);
  const [bookingBuffetId, setBookingBuffetId] = useState<BuffetOptionId>('churrasco');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackageForBooking = (packageId: string, guests: 50 | 100 | 200, extras: string[]) => {
    setBookingPackageId(packageId);
    setBookingGuests(guests);
    setBookingExtras(extras);
    scrollToSection('reserva');
  };

  const handleSelectBuffetForBooking = (buffetId: string) => {
    setBookingBuffetId(buffetId as BuffetOptionId);
    setBookingPackageId('festa_completa_buffet');
    scrollToSection('reserva');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* Navigation Header */}
      <Header
        onOpenBooking={() => scrollToSection('reserva')}
        onNavigateToTour={() => scrollToSection('tour-virtual')}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => scrollToSection('reserva')}
        onNavigateToTour={() => scrollToSection('tour-virtual')}
        onNavigateToPricing={() => scrollToSection('precos')}
      />

      {/* Detailed Spaces Breakdown (Salão, Gourmet, Piscina) */}
      <VenueSpaces
        onNavigateToTour={() => scrollToSection('tour-virtual')}
        onOpenBooking={() => scrollToSection('reserva')}
      />

      {/* 360° Guided Virtual Tour with hotspots */}
      <VirtualTour
        onOpenBooking={() => scrollToSection('reserva')}
      />

      {/* Detailed Pricing breakdown for 50, 100, 200 guests */}
      <PricingPackages
        onSelectPackageForBooking={handleSelectPackageForBooking}
      />

      {/* Complete Party & Buffet Gastronomy Services */}
      <BuffetServices
        onSelectBuffetForBooking={handleSelectBuffetForBooking}
      />

      {/* HD Interactive Photo Gallery with Lightbox */}
      <InteractiveGallery
        onOpenBooking={() => scrollToSection('reserva')}
      />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* Integrated Online Booking Engine with real-time quote & protocols */}
      <OnlineBooking
        key={`${bookingPackageId}-${bookingGuests}-${bookingExtras.join(',')}-${bookingBuffetId}`}
        initialPackageId={bookingPackageId}
        initialGuests={bookingGuests}
        initialExtras={bookingExtras}
        initialBuffetId={bookingBuffetId}
      />

      {/* Comprehensive Footer with quick contact form, contacts and clickable socials */}
      <Footer />

      {/* Floating WhatsApp Action for Instant Assistance */}
      <FloatingWhatsApp />
    </div>
  );
}
