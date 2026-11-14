import React from 'react';
import { siteConfig } from '../data/content';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = siteConfig;

  const handleRequestAdvisory = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(title);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full py-14 sm:py-16 lg:py-24 bg-surface-container-low/40 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <span className="font-label-md text-xs sm:text-label-md text-secondary uppercase tracking-wider font-semibold">
            {services.badge}
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-bold">
            {services.headline}
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant">
            {services.description}
          </p>
        </div>

        {/* Services Grid (Neutral, editable placeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.items.map((service) => (
            <div
              key={service.id}
              className="group bg-surface-container-lowest p-6 sm:p-7 rounded-xl shadow-xs hover:shadow-md border border-surface-container/70 hover:border-secondary/40 transition-all duration-150 flex flex-col justify-between h-full"
            >
              <div className="space-y-3.5 sm:space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-lg lg:text-headline-sm text-primary font-semibold leading-snug">
                  {service.title}
                </h3>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed italic">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-surface-container/50 mt-5">
                <a
                  href="#contact"
                  onClick={(e) => handleRequestAdvisory(e, service.title)}
                  className="inline-flex items-center gap-1.5 font-label-md text-sm text-secondary font-semibold group-hover:text-primary transition-colors py-1"
                >
                  <span>Inquire About Scope</span>
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
