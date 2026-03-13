import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { HowItWorks } from './components/HowItWorks';
import { ClinicValue } from './components/ClinicValue';
import { AIInterface } from './components/AIInterface';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';

export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    const handleOpenForm = () => setIsContactFormOpen(true);
    window.addEventListener('openContactForm', handleOpenForm);
    return () => window.removeEventListener('openContactForm', handleOpenForm);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <Navigation />
      
      {/* Add top padding to account for fixed navigation */}
      <main className="pt-20">
        <HeroSection />
        <TrustBadges />
        <HowItWorks />
        <AIInterface />
        <ClinicValue />
      </main>

      <Footer />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
}