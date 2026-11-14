import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/content';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = ['home', 'about', 'services', 'why-choose-us', 'process', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-xl shadow-[0_2px_14px_rgba(0,27,49,0.08)] py-2 sm:py-2.5'
            : 'bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo & Title */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
          >
            <img
              alt={`${siteConfig.businessName} Logo`}
              className="h-8 sm:h-9 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
              src={siteConfig.logoUrl}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-sm sm:text-base lg:text-title-md text-primary tracking-tight font-bold truncate">
                <span className="inline sm:hidden">{siteConfig.shortName}</span>
                <span className="hidden sm:inline">{siteConfig.businessName}</span>
              </span>
              <span className="text-[10px] text-on-surface-variant hidden md:inline-block tracking-wider uppercase truncate">
                {siteConfig.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navigation.map((item) => {
              const itemKey = item.href.replace('#', '');
              const isActive = activeSection === itemKey;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-surface-container text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low font-medium'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Consultation Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center justify-center bg-primary-container text-on-primary font-label-md text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg hover:bg-primary transition-all duration-150 shadow-xs group"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container group-hover:animate-ping" />
                <span>Contact Desk</span>
              </span>
            </a>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-[58px] sm:top-[68px] left-0 right-0 w-full bg-surface-container-lowest border-b border-surface-container shadow-2xl z-50 lg:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1360px] mx-auto px-4 py-4 flex flex-col space-y-1.5">
            {siteConfig.navigation.map((item) => {
              const itemKey = item.href.replace('#', '');
              const isActive = activeSection === itemKey;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-lg text-base transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-surface-container text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-low font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-secondary text-sm">
                    arrow_forward
                  </span>
                </a>
              );
            })}

            <div className="pt-3 border-t border-surface-container space-y-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-on-primary font-semibold text-center shadow-sm hover:bg-primary-container transition-colors"
              >
                <span>Inquire About Services</span>
                <span className="material-symbols-outlined text-lg">calendar_month</span>
              </a>

              <a
                href={siteConfig.contact.telLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-surface-container text-primary font-semibold text-center hover:bg-surface-container-high transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg text-secondary">phone_in_talk</span>
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
