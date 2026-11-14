import React from 'react';
import { siteConfig } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = siteConfig;

  return (
    <section id="why-choose-us" className="w-full py-14 sm:py-16 lg:py-24 bg-surface scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <span className="font-label-md text-xs sm:text-label-md text-secondary uppercase tracking-wider font-semibold">
              {whyChooseUs.badge}
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-bold leading-snug">
              {whyChooseUs.headline}
            </h2>
            <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
              {whyChooseUs.description}
            </p>
          </div>

          {/* Non-Numerical Trust Card (Zero fake percentages or statistics) */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-2xl shadow-sm border border-surface-container w-full max-w-sm">
              <div className="flex items-center justify-between pb-3">
                <span className="font-label-sm text-[11px] sm:text-xs uppercase text-outline font-semibold">
                  {whyChooseUs.trustCard.label}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] sm:text-xs font-bold">
                  {whyChooseUs.trustCard.badge}
                </span>
              </div>
              <p className="font-display text-2xl sm:text-3xl text-primary leading-tight font-bold">
                {whyChooseUs.trustCard.title}
              </p>
              <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant pt-2 border-t border-surface-container/70 mt-3 leading-relaxed">
                {whyChooseUs.trustCard.detail}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Card Pillar Grid (Authentic, non-numerical indicators) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {whyChooseUs.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-surface-container-low p-5 sm:p-6 rounded-xl shadow-xs hover:shadow-md border border-surface-container/70 hover:border-secondary/30 transition-all duration-150 space-y-3 flex flex-col justify-start h-full group"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary font-bold group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                {pillar.number}
              </div>
              <h3 className="font-title-md text-base sm:text-title-md text-primary font-semibold leading-snug">
                {pillar.title}
              </h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
