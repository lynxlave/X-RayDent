import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { HowItWorks } from './components/HowItWorks';
import { ClinicValue } from './components/ClinicValue';
import { AIInterface } from './components/AIInterface';
import { PricingSection } from './components/PricingSection';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { PatientRegistrationForm } from './components/PatientRegistrationForm';

export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isPatientFormOpen, setIsPatientFormOpen] = useState(false);

  useEffect(() => {
    const handleOpenForm = () => setIsContactFormOpen(true);
    const handleOpenPatientForm = () => setIsPatientFormOpen(true);
    
    window.addEventListener('openContactForm', handleOpenForm);
    window.addEventListener('openPatientForm', handleOpenPatientForm);
    
    return () => {
      window.removeEventListener('openContactForm', handleOpenForm);
      window.removeEventListener('openPatientForm', handleOpenPatientForm);
    };
  }, []);

  return (
    <div className="min-h-screen font-['Inter',sans-serif] bg-[linear-gradient(135deg,rgba(11,60,93,0.06)_0%,rgba(255,255,255,0.94)_38%,rgba(123,97,255,0.08)_72%,rgba(0,229,255,0.08)_100%)] bg-fixed">
      <Navigation />
      
      {/* Add top padding to account for fixed navigation */}
      <main className="pt-20 relative z-10">
        <HeroSection />
        <TrustBadges />
        <HowItWorks />
        <AIInterface />
        <ClinicValue />
        <PricingSection />
        <Partners />
      </main>

      <Footer />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
      
      <PatientRegistrationForm 
        isOpen={isPatientFormOpen} 
        onClose={() => setIsPatientFormOpen(false)} 
      />
    </div>
  );
}
