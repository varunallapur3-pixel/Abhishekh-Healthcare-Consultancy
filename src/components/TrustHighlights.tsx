import React from 'react';
import { siteConfig } from '../data/content';

export const TrustHighlights: React.FC = () => {
  return (
    <section className="w-full py-12 bg-surface-container-low/60 border-y border-surface-container/40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.trustHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md border border-surface-container/60 hover:border-secondary/30 transition-all duration-200 flex flex-col group"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary mb-2 font-semibold">
                {item.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
