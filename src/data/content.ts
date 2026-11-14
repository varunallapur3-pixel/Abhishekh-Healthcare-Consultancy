/**
 * Centralized Editable Business Information
 * 
 * NOTE: Phone number +91 96633 22617 is confirmed and active for calls & WhatsApp.
 * Other business details (email, address, hours) remain editable placeholders
 * until confirmed by the business owner.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface TrustIndicator {
  icon: string;
  label: string;
}

export interface TrustHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsPillar {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  description: string;
  stageBadge: string;
}

export interface BusinessConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  officialDescription: string;
  logoUrl: string;

  // Contact Information
  contact: {
    isPhoneVerified: boolean;
    phone: string;
    phoneDisplay: string;
    rawPhone: string;
    telLink: string;
    whatsAppNumber: string;
    whatsAppDisplay: string;
    whatsAppLink: string;
    email: string;
    address: string;
    hours: string;
    statusNotice: string;
  };

  // Social Media Links (Configurable)
  socialMedia: {
    corporate: { label: string; href: string; isConfigured: boolean };
    publicHealth: { label: string; href: string; isConfigured: boolean };
    forum: { label: string; href: string; isConfigured: boolean };
  };

  // Business Credentials (Empty until official certifications verified)
  businessCredentials: string[];

  // Navigation Items
  navigation: NavItem[];

  // Hero Section
  hero: {
    trustBadge: string;
    headline: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    heroImage: string;
    heroImageAlt: string;
    imageCaption: {
      icon: string;
      title: string;
      subtitle: string;
    };
    floatingBadge: {
      icon: string;
      label: string;
      title: string;
    };
    trustIndicators: TrustIndicator[];
  };

  // Trust Highlights (4 Pillars)
  trustHighlights: TrustHighlight[];

  // About Section
  about: {
    sectionBadge: string;
    headline: string;
    description: string;
    image: string;
    imageAlt: string;
    badgeCard: {
      icon: string;
      title: string;
      subtitle: string;
    };
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
    methodologyLink: {
      label: string;
      href: string;
    };
  };

  // Services Section
  services: {
    badge: string;
    headline: string;
    description: string;
    items: ServiceItem[];
  };

  // Why Choose Us
  whyChooseUs: {
    badge: string;
    headline: string;
    description: string;
    trustCard: {
      badge: string;
      label: string;
      title: string;
      detail: string;
    };
    pillars: WhyChooseUsPillar[];
  };

  // 4-Stage Process
  process: {
    badge: string;
    headline: string;
    description: string;
    steps: ProcessStep[];
  };

  // Testimonials (Strictly unverified placeholder array)
  testimonials: Array<{
    quote: string;
    author: string;
    title: string;
    initials: string;
  }>;

  // Contact Form Options
  contactForm: {
    badge: string;
    headline: string;
    description: string;
    serviceOptions: Array<{ value: string; label: string }>;
  };

  // Footer Links
  footer: {
    aboutText: string;
    quickLinks: NavItem[];
    advisoryLinks: NavItem[];
    legalLinks: NavItem[];
    copyright: string;
  };
}

export const siteConfig: BusinessConfig = {
  businessName: "Abhishekh Healthcare Consultancy",
  shortName: "Abhishekh Health",
  tagline: "Professional Healthcare Navigation & Advisory Guidance",
  officialDescription: "Abhishekh Healthcare Consultancy aims to provide professional guidance and support for healthcare-related requirements.",
  logoUrl: "/logo.png",
  
  // VERIFIED BUSINESS CONTACT NUMBER (Active & Working)
  contact: {
    isPhoneVerified: true,
    phone: "+91 96633 22617",
    phoneDisplay: "+91 96633 22617",
    rawPhone: "9663322617",
    telLink: "tel:+919663322617",
    whatsAppNumber: "919663322617",
    whatsAppDisplay: "Chat on WhatsApp (+91 96633 22617)",
    whatsAppLink: "https://wa.me/919663322617",
    
    // Remaining unconfirmed fields (placeholders preserved until verified)
    email: "[Official email to be confirmed]",
    address: "[Business address to be confirmed]",
    hours: "[Business hours to be confirmed]",
    statusNotice: "Direct phone and WhatsApp communication channels are active. Official business email and office address will be published once confirmed."
  },

  // Social Media Links (Configurable placeholder channels)
  socialMedia: {
    corporate: { label: "Corporate Network", href: "#contact", isConfigured: false },
    publicHealth: { label: "Public Health Updates", href: "#about", isConfigured: false },
    forum: { label: "Direct Inquiries", href: "#contact", isConfigured: false }
  },

  // Business Credentials (Empty until official certifications verified)
  businessCredentials: [],

  // Navigation Items
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" }
  ],

  // Hero Section (Non-numerical trust indicators)
  hero: {
    trustBadge: "Healthcare Advisory & Guidance",
    headline: "Guiding You Towards Better Healthcare Decisions.",
    description: "Abhishekh Healthcare Consultancy aims to provide professional guidance and support for healthcare-related requirements. Contact us to learn more about our consultancy approach and available services.",
    ctaPrimary: { label: "Get in Touch", href: "#contact" },
    ctaSecondary: { label: "Explore Our Capabilities", href: "#services" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtZIB-dWTX-IXfegCFH5fjZiLIjYa1-2fEieMxpx2_2ZLOOu46m2UtD__wBa_fkNXAF9KmnQeeF2r5Ia5k6JmM-zGeJn0XaLQftgiNkxA4B94zhgVxhRad4cPNxxZh7A0VnVyJ5RLXIEkNVpNJYo1Pftk3J1dMfXUJUQjrmFo7VidA_ua3Rxjf9dj5Y0LtGHy4n5NALkZMZ9NETTqvpLigNmr07Ttt61ZOUowNu54",
    heroImageAlt: "Healthcare advisory strategy meeting in corporate conference room",
    imageCaption: {
      icon: "insights",
      title: "Healthcare Advisory & Support",
      subtitle: "Structured Consultation Roadmap"
    },
    // Non-numerical trust badge
    floatingBadge: {
      icon: "health_and_safety",
      label: "Consultancy Focus",
      title: "Structured Advisory Guidance"
    },
    // Non-numerical trust indicators
    trustIndicators: [
      { icon: "psychology", label: "Professional Approach" },
      { icon: "visibility", label: "Transparent Communication" },
      { icon: "diversity_3", label: "Client-Focused Guidance" },
      { icon: "task_alt", label: "Commitment to Quality" }
    ]
  },

  // Trust Highlights (4 Pillars)
  trustHighlights: [
    {
      icon: "psychology",
      title: "Professional Approach",
      description: "Delivering structured healthcare advisory frameworks tailored to institutional leadership and administrative priorities."
    },
    {
      icon: "diversity_3",
      title: "Client-Centric Focus",
      description: "Consultation configured around your specific operational requirements, organizational structure, and care goals."
    },
    {
      icon: "support_agent",
      title: "Reliable Support",
      description: "Responsive guidance and collaborative advisory support throughout each phase of your healthcare initiative."
    },
    {
      icon: "visibility",
      title: "Transparent Communication",
      description: "Clear deliverables, documented milestones, and straightforward communication with zero ambiguities."
    }
  ],

  // About Section (Neutral introduction, zero unsupported claims)
  about: {
    sectionBadge: "About Abhishekh Healthcare Consultancy",
    headline: "Professional Advisory Guidance for Healthcare Requirements",
    description: "Abhishekh Healthcare Consultancy aims to provide professional guidance and support for healthcare-related requirements. Contact us to learn more about our consultancy approach and available services.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGxBLGV8SnUzrQxbfC-47NWlXu8fFiszrE1tvXRIWtQcSjnd45VOHRHCDT0lftrgF2Sltd3Ch3J4hyC_VRvxN64TDk0D-th_zmxxZUprkAPEG7sMc2Mo4KKcx7j7-X0OWlH02gU0fRjoaBj2WF8SAmAGHrZ6MhiVrbd5EZ_HAG9G2xg7DazjORVvEfYJNa2U7av0GbRYX_C5TmcgkILN8lYwJ44-tDM3sPTLuWBA8",
    imageAlt: "Healthcare leadership team in professional discussion",
    // Non-numerical badge
    badgeCard: {
      icon: "medical_services",
      title: "Dedicated Advisory",
      subtitle: "Structured guidance configured around your organizational healthcare requirements."
    },
    mission: {
      title: "Our Mission",
      description: "[Mission statement to be confirmed by business owner — focused on providing structured, ethical, and reliable healthcare advisory support.]"
    },
    vision: {
      title: "Our Vision",
      description: "[Vision statement to be confirmed by business owner — dedicated to professional integrity and client-centered healthcare consulting.]"
    },
    methodologyLink: {
      label: "Learn more about our advisory methodology",
      href: "#services"
    }
  },

  // Services Section (Heading: "How We Can Support Your Healthcare Requirements", neutral descriptions)
  services: {
    badge: "Advisory Capabilities",
    headline: "How We Can Support Your Healthcare Requirements",
    description: "Proposed practice domains and advisory services subject to official business confirmation and client consultation.",
    items: [
      {
        id: "strategic-planning",
        icon: "account_tree",
        title: "Healthcare Strategic Planning",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      },
      {
        id: "clinical-operations",
        icon: "vital_signs",
        title: "Clinical Operations Optimization",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      },
      {
        id: "compliance-accreditation",
        icon: "policy",
        title: "Regulatory Compliance & Accreditation",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      },
      {
        id: "health-technology",
        icon: "health_and_safety",
        title: "Healthcare Technology Advisory",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      },
      {
        id: "financial-resource",
        icon: "payments",
        title: "Financial Advisory & Resource Planning",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      },
      {
        id: "quality-safety",
        icon: "verified_user",
        title: "Quality Management & Patient Safety",
        description: "[Service description and operational scope to be confirmed with business owner.]"
      }
    ]
  },

  // Why Choose Us (Non-numerical trust indicators)
  whyChooseUs: {
    badge: "Institutional Trust",
    headline: "Why Healthcare Organizations Partner With Us",
    description: "Committed to delivering tailored healthcare consultancy based on clarity, integrity, and client priorities.",
    // Non-numerical trust card
    trustCard: {
      badge: "Core Principles",
      label: "Advisory Standards",
      title: "Client-Centered Guidance",
      detail: "Focused on delivering dependable healthcare consultancy based on transparent communication and your specific operational priorities."
    },
    pillars: [
      {
        number: "01",
        title: "Personalized Approach",
        description: "[Consultancy methodology configured around your specific healthcare operational requirements.]"
      },
      {
        number: "02",
        title: "Professional Guidance",
        description: "[Structured advisory focused on healthcare management, operational planning, and best practices.]"
      },
      {
        number: "03",
        title: "Transparent Communication",
        description: "[Clear documentation, structured updates, and collaborative engagement throughout.]"
      },
      {
        number: "04",
        title: "Commitment to Quality",
        description: "[Focus on delivering dependable advisory support aligned with established healthcare standards.]"
      }
    ]
  },

  // 4-Stage Process
  process: {
    badge: "Methodology",
    headline: "Our Structured Consultation Process",
    description: "A disciplined 4-stage advisory blueprint designed to translate healthcare requirements into structured execution.",
    steps: [
      {
        step: "Step 01",
        icon: "mark_email_read",
        title: "Initial Enquiry",
        description: "Reach out to discuss your healthcare consultancy requirements and organizational priorities.",
        stageBadge: "Initial Discussion"
      },
      {
        step: "Step 02",
        icon: "analytics",
        title: "Understanding Requirements",
        description: "Collaborative review to understand your operational context and consultation scope.",
        stageBadge: "Scope Assessment"
      },
      {
        step: "Step 03",
        icon: "clinical_notes",
        title: "Consultation & Guidance",
        description: "Delivery of customized recommendations and structured guidance aligned with agreed priorities.",
        stageBadge: "Actionable Guidance"
      },
      {
        step: "Step 04",
        icon: "handshake",
        title: "Continued Support",
        description: "Follow-up guidance and adaptable assistance to support sustained implementation.",
        stageBadge: "Follow-Up"
      }
    ]
  },

  // Testimonials (Strictly unverified placeholder array)
  testimonials: [],

  // Contact Form Options
  contactForm: {
    badge: "Direct Engagement",
    headline: "Start Your Consultation Today",
    description: "Submit an inquiry to discuss your healthcare organizational objectives with our advisory team.",
    serviceOptions: [
      { value: "strategic", label: "Healthcare Strategic Planning" },
      { value: "clinical", label: "Clinical Operations Optimization" },
      { value: "compliance", label: "Regulatory Compliance & Accreditation" },
      { value: "tech", label: "Healthcare Technology Advisory" },
      { value: "financial", label: "Financial Advisory & Resource Planning" },
      { value: "quality", label: "Quality Management & Patient Safety" }
    ]
  },

  // Footer Links
  footer: {
    aboutText: "Providing professional guidance and support for healthcare-related requirements. Direct phone and WhatsApp channels are verified and active.",
    quickLinks: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Why Choose Us", href: "#why-choose-us" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" }
    ],
    advisoryLinks: [
      { label: "Clinical Operations Strategy", href: "#services" },
      { label: "Regulatory & Accreditation Compliance", href: "#services" },
      { label: "Hospital Infrastructure Planning", href: "#services" },
      { label: "Digital Health Transformation", href: "#services" },
      { label: "Revenue Cycle Optimization", href: "#services" }
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" }
    ],
    copyright: "© 2025-2026 Abhishekh Healthcare Consultancy. All rights reserved."
  }
};
