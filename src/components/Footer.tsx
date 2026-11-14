import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';

export const Footer: React.FC = () => {
  const { footer, contact } = siteConfig;

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container py-12 lg:py-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Column 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt={`${siteConfig.businessName} Logo`}
                className="h-8 w-auto object-contain"
                src={siteConfig.logoUrl}
              />
              <span className="font-title-md text-base sm:text-title-md text-primary font-bold">
                {siteConfig.businessName}
              </span>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
              {footer.aboutText}
            </p>

            {/* Quick Action Channels */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={contact.telLink}
                aria-label={`Call direct: ${contact.phoneDisplay}`}
                title={`Call direct: ${contact.phoneDisplay}`}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              </a>
              <a
                href={contact.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                aria-label="Inquiry Desk"
                title="Inquiry Desk"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">Quick Links</h4>
            <ul className="space-y-2">
              {footer.quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="font-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Advisory Domains */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">Advisory Domains</h4>
            <ul className="space-y-2">
              {footer.advisoryLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="font-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Direct Contact Details */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">Direct Contact</h4>
            <ul className="space-y-2.5 font-body-sm text-xs sm:text-sm text-on-surface-variant">
              {/* Working Phone Number */}
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 shrink-0">
                  phone_in_talk
                </span>
                <a
                  href={contact.telLink}
                  className="font-semibold text-primary hover:text-secondary transition-colors"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              {/* Working WhatsApp Link */}
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 shrink-0">
                  chat
                </span>
                <a
                  href={contact.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-secondary hover:underline transition-colors"
                >
                  {contact.whatsAppDisplay}
                </a>
              </li>
              {/* Email Placeholder */}
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 shrink-0">
                  mail
                </span>
                <span className="italic text-on-surface-variant/80 break-all">
                  {contact.email}
                </span>
              </li>
              {/* Address Placeholder */}
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 shrink-0">
                  location_on
                </span>
                <span className="leading-snug italic text-on-surface-variant/80">{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-surface-container/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-label-sm text-xs text-center sm:text-left">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-3 sm:gap-4 text-outline flex-wrap justify-center sm:justify-end">
            <span>{siteConfig.tagline}</span>
            <span className="hidden sm:inline">•</span>
            <Link
              to="/admin/login"
              className="text-on-surface-variant/70 hover:text-primary transition-colors inline-flex items-center gap-1 text-[11px]"
              title="Administrator Login"
            >
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
