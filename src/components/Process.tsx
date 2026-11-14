import React from 'react';
import { siteConfig } from '../data/content';

export const Process: React.FC = () => {
  const { process } = siteConfig;

  return (
    <section id="process" className="w-full py-14 sm:py-16 lg:py-24 bg-surface-container-low/50 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <span className="font-label-md text-xs sm:text-label-md text-secondary uppercase tracking-wider font-semibold">
            {process.badge}
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-bold">
            {process.headline}
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant">
            {process.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="relative bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-xs hover:shadow-md border border-surface-container/70 hover:border-secondary/30 transition-all duration-150 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <span className="font-label-sm text-[11px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded bg-surface-container text-primary font-bold">
                    {step.step}
                  </span>
                  <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-lg lg:text-headline-sm text-primary mb-2 font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-surface-container/60 flex items-center gap-1.5 text-secondary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <span className="truncate">{step.stageBadge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
