import React from 'react';
import { siteConfig } from '../data/content';

export const Hero: React.FC = () => {
  const { hero } = siteConfig;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low/40 to-surface pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-24">
      {/* Ambient backdrops */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-secondary-container/20 blur-3xl max-w-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-primary-fixed/30 blur-3xl max-w-full"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Trust Badge Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-xs border border-surface-container max-w-full">
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              <span className="font-label-sm text-[11px] sm:text-label-sm uppercase tracking-wider text-secondary font-semibold truncate">
                {hero.trustBadge}
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-display text-primary tracking-tight font-bold leading-tight">
              {hero.headline}
            </h1>

            {/* Supporting Narrative */}
            <p className="font-body-lg text-sm sm:text-base md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-lg bg-primary text-on-primary font-label-md text-sm sm:text-label-md shadow-sm hover:bg-primary-container hover:shadow-md transition-all duration-150 group"
              >
                <span>{hero.ctaPrimary.label}</span>
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg bg-surface-container-lowest text-primary font-label-md text-sm sm:text-label-md shadow-xs border border-surface-container hover:bg-surface-container hover:border-secondary/30 transition-all duration-150"
              >
                <span className="material-symbols-outlined mr-2 text-secondary text-lg">
                  medical_services
                </span>
                <span>{hero.ctaSecondary.label}</span>
              </button>
            </div>

            {/* Non-Numerical Trust Indicators (Zero fake numbers) */}
            <div className="pt-4 sm:pt-6 mt-2 w-full border-t border-surface-container/70">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-6 text-on-surface-variant font-label-md text-xs sm:text-label-md">
                {hero.trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0">
                      {indicator.icon}
                    </span>
                    <span className="font-semibold text-primary text-xs sm:text-sm">
                      {indicator.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing geometric accent */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-secondary/10 rounded-2xl transform rotate-1 sm:rotate-2 scale-[1.02] pointer-events-none"
              />

              {/* Primary Image Card */}
              <div className="relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg border border-surface-container">
                <img
                  className="w-full h-[320px] sm:h-[400px] lg:h-[420px] object-cover"
                  alt={hero.heroImageAlt}
                  src={hero.heroImage}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />

                {/* In-image caption badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl flex items-center justify-between shadow-md border border-surface-container gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                      <span className="material-symbols-outlined text-lg sm:text-xl">
                        {hero.imageCaption.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-title-md text-xs sm:text-title-md text-primary leading-tight font-semibold truncate">
                        {hero.imageCaption.title}
                      </p>
                      <p className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant truncate">
                        {hero.imageCaption.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0">
                    check_circle
                  </span>
                </div>
              </div>

              {/* Floating Non-Numerical Trust Badge */}
              <div className="hidden md:flex absolute -top-4 -left-4 lg:-top-5 lg:-left-5 items-center gap-3 p-3.5 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container z-20">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    {hero.floatingBadge.icon}
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-[10px] uppercase text-outline font-semibold">
                    {hero.floatingBadge.label}
                  </p>
                  <p className="font-headline-sm text-xs sm:text-sm text-primary font-bold">
                    {hero.floatingBadge.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
