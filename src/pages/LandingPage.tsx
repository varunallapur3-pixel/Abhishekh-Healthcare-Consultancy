import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustHighlights } from '../components/TrustHighlights';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('strategic');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-secondary selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust Highlights */}
        <TrustHighlights />

        {/* 3. About Us */}
        <About />

        {/* 4. Specialized Services */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Consultation Methodology / Process */}
        <Process />

        {/* 7. Contact & Consultation Request */}
        <Contact selectedService={selectedService} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
