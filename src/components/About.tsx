import React from 'react';
import { siteConfig } from '../data/content';

export const About: React.FC = () => {
  const { about } = siteConfig;

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="w-full py-14 sm:py-16 lg:py-24 bg-surface scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual & Non-numerical Trust Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md bg-surface-container border border-surface-container">
              <img
                className="w-full h-[300px] sm:h-[420px] lg:h-[460px] object-cover"
                alt={about.imageAlt}
                src={about.image}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />

              {/* Trust Card Overlay (Desktop & Tablet) */}
              <div className="hidden sm:flex absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md border border-surface-container items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl text-secondary-container">
                    {about.badgeCard.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-title-md text-sm sm:text-title-md text-primary font-semibold truncate">
                    {about.badgeCard.title}
                  </p>
                  <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant line-clamp-2">
                    {about.badgeCard.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Card Module (Mobile Only: Placed cleanly below image) */}
            <div className="sm:hidden mt-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl text-secondary-container">
                  {about.badgeCard.icon}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-primary truncate">{about.badgeCard.title}</p>
                <p className="text-[11px] text-on-surface-variant line-clamp-2">{about.badgeCard.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <span className="font-label-md text-xs sm:text-label-md text-secondary uppercase tracking-widest font-semibold">
                {about.sectionBadge}
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-bold leading-snug">
                {about.headline}
              </h2>
            </div>

            {/* Neutral, authentic narrative */}
            <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
              {about.description}
            </p>

            {/* Mission & Vision Cards (Clearly marked placeholders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-xl bg-surface-container-low border border-surface-container shadow-xs hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <span className="material-symbols-outlined text-xl">flag</span>
                  <h4 className="font-title-md text-sm sm:text-title-md text-primary font-semibold">
                    {about.mission.title}
                  </h4>
                </div>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                  {about.mission.description}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-surface-container-low border border-surface-container shadow-xs hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <span className="material-symbols-outlined text-xl">radar</span>
                  <h4 className="font-title-md text-sm sm:text-title-md text-primary font-semibold">
                    {about.vision.title}
                  </h4>
                </div>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                  {about.vision.description}
                </p>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <a
                href={about.methodologyLink.href}
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 font-label-md text-sm sm:text-label-md text-secondary hover:text-primary transition-colors font-semibold group"
              >
                <span>{about.methodologyLink.label}</span>
                <span className="material-symbols-outlined text-lg transition-transform duration-150 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
