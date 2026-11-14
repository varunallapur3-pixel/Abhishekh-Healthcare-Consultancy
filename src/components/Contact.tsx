import React, { useState } from 'react';
import { siteConfig } from '../data/content';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

interface ContactProps {
  selectedService?: string;
}

interface SubmissionResult {
  referenceCode?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const { contact, contactForm } = siteConfig;

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    service: selectedService || 'strategic',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  React.useEffect(() => {
    if (selectedService) {
      const match = contactForm.serviceOptions.find(
        (s) => s.label.toLowerCase() === selectedService.toLowerCase() || s.value === selectedService
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.value }));
      }
    }
  }, [selectedService, contactForm.serviceOptions]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name Validation
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = 'Full name is required.';
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = 'Full name must contain at least 2 characters.';
    } else if (nameTrimmed.length > 100) {
      newErrors.fullName = 'Full name cannot exceed 100 characters.';
    }

    // 2. Phone Validation (Indian mobile format + International format)
    const phoneTrimmed = formData.phone.trim();
    if (!phoneTrimmed) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const digitsOnly = phoneTrimmed.replace(/[\s\-\(\)\.]/g, '');
      const isIndian = /^(?:\+?91[\-\s]?|0)?[6-9]\d{9}$/.test(digitsOnly);
      const isIntl = /^\+?[1-9]\d{6,14}$/.test(digitsOnly);

      if (!isIndian && !isIntl) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number or international phone with country code.';
      }
    }

    // 3. Work Email Validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please provide a valid work email address (e.g., name@organization.com).';
    } else if (emailTrimmed.length > 150) {
      newErrors.email = 'Email cannot exceed 150 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate concurrent submissions
    if (submissionStatus === 'submitting') {
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmissionStatus('submitting');
    setErrorMessage('');

    try {
      const payload = {
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        advisory_interest: formData.service || null,
        requirements: formData.message.trim() || null,
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSubmissionStatus('success');
        setSubmissionResult({
          referenceCode: data.reference_code,
          message: data.message,
        });

        // Clear form fields on successful submission
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'strategic',
          message: '',
        });
      } else if (response.status === 429) {
        setSubmissionStatus('error');
        setErrorMessage('Too many enquiry submissions received from your connection. Please wait a few minutes before trying again.');
      } else if (response.status === 422) {
        const errData = await response.json();
        const firstError = errData.errors?.[0]?.message || 'Please check your inputs and try again.';
        setSubmissionStatus('error');
        setErrorMessage(firstError);
      } else {
        const errData = await response.json().catch(() => ({}));
        setSubmissionStatus('error');
        setErrorMessage(errData.detail || 'Failed to submit enquiry. Please try again or reach out directly.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmissionStatus('error');
      setErrorMessage(
        'Unable to connect to the enquiry service. Please check your internet connection or call our business desk directly at +91 96633 22617.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <section id="contact" className="w-full py-14 sm:py-16 lg:py-24 bg-surface-container-low/70 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <span className="font-label-md text-xs sm:text-label-md text-secondary uppercase tracking-wider font-semibold">
            {contactForm.badge}
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-bold">
            {contactForm.headline}
          </h2>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant">
            {contactForm.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left: Contact Information Card */}
          <div className="lg:col-span-5 bg-primary text-on-primary p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-[11px] sm:text-xs uppercase tracking-wide">
                  Business Contact Desk
                </span>
                <h3 className="font-headline-md text-xl sm:text-headline-md text-on-primary mt-3 font-semibold leading-snug">
                  {siteConfig.businessName}
                </h3>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-primary-container mt-2 leading-relaxed">
                  Direct phone and WhatsApp assistance is active and ready to support your healthcare inquiries.
                </p>
              </div>

              <div className="space-y-4 pt-1 sm:pt-2">
                {/* Active Working Phone Number */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-[11px] sm:text-xs text-on-primary-container uppercase tracking-wider">
                      Direct Business Line
                    </p>
                    <a
                      href={contact.telLink}
                      className="font-title-md text-base sm:text-lg font-bold text-on-primary hover:text-secondary-fixed transition-colors block"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email Placeholder */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-[11px] sm:text-xs text-on-primary-container uppercase tracking-wider">
                      Email Address
                    </p>
                    <span className="font-title-md text-sm sm:text-base font-medium text-on-primary/80 block italic break-all">
                      {contact.email}
                    </span>
                  </div>
                </div>

                {/* Address Placeholder */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-[11px] sm:text-xs text-on-primary-container uppercase tracking-wider">
                      Business Address
                    </p>
                    <p className="font-body-md text-xs sm:text-sm text-on-primary/80 leading-relaxed italic">
                      {contact.address}
                    </p>
                  </div>
                </div>

                {/* Working Hours Placeholder */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-[11px] sm:text-xs text-on-primary-container uppercase tracking-wider">
                      Working Hours
                    </p>
                    <p className="font-body-md text-xs sm:text-sm text-on-primary/80 leading-relaxed italic">
                      {contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Working WhatsApp Button */}
            <div className="pt-2 sm:pt-4">
              <a
                href={contact.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:py-4 rounded-xl bg-secondary text-on-secondary font-label-md text-sm sm:text-label-md hover:bg-secondary/90 transition-all shadow-md focus:ring-2 focus:ring-secondary-fixed min-h-[48px]"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span className="font-semibold">{contact.whatsAppDisplay}</span>
              </a>
              <p className="text-[11px] text-on-primary-container text-center mt-2 opacity-80">
                {contact.statusNotice}
              </p>
            </div>
          </div>

          {/* Right: Consultation Enquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-5 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-surface-container">
            {/* Success Notification Alert */}
            {submissionStatus === 'success' && (
              <div
                role="status"
                className="mb-6 p-5 rounded-xl bg-secondary-container/50 border border-secondary text-on-surface space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-primary text-base">
                        Enquiry Submitted Successfully
                      </p>
                      {submissionResult.referenceCode && (
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-mono text-xs font-bold">
                          {submissionResult.referenceCode}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Thank you. Your consultation enquiry has been recorded in our database. A senior healthcare advisor will review your institutional requirements and contact you promptly.
                    </p>
                  </div>
                </div>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSubmissionStatus('idle')}
                    className="text-xs text-secondary hover:text-primary font-bold underline cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}

            {/* Error Notification Alert */}
            {submissionStatus === 'error' && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container border border-error/30 space-y-2 animate-in fade-in duration-200"
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-2xl shrink-0 mt-0.5">
                    error
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm">Submission Error</p>
                    <p className="text-xs sm:text-sm mt-0.5 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setSubmissionStatus('idle')}
                    className="text-xs text-error font-bold underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-xs sm:text-sm text-primary font-semibold" htmlFor="fullName">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary text-base sm:text-sm placeholder:text-outline border transition-all focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
                      errors.fullName ? 'border-error ring-1 ring-error' : 'border-surface-container'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-error font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-xs sm:text-sm text-primary font-semibold" htmlFor="phone">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    maxLength={25}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9663322617 or +91 96633 22617"
                    className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary text-base sm:text-sm placeholder:text-outline border transition-all focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
                      errors.phone ? 'border-error ring-1 ring-error' : 'border-surface-container'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-error font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Work Email Address */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-xs sm:text-sm text-primary font-semibold" htmlFor="email">
                    Work Email Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={150}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.com"
                    className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary text-base sm:text-sm placeholder:text-outline border transition-all focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
                      errors.email ? 'border-error ring-1 ring-error' : 'border-surface-container'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-error font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Advisory Area */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-xs sm:text-sm text-primary font-semibold" htmlFor="service">
                    Advisory Area of Interest
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary text-base sm:text-sm border border-surface-container transition-all focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  >
                    {contactForm.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-label-md text-xs sm:text-sm text-primary font-semibold" htmlFor="message">
                    Institution Requirements & Scope
                  </label>
                  <span className="text-[11px] text-outline">
                    {formData.message.length}/2000
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={4}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your organization's healthcare requirements, operational context, and preferred consultation timeline..."
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary text-base sm:text-sm placeholder:text-outline border border-surface-container transition-all focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
                  className="inline-flex items-center justify-center min-h-[48px] gap-2 px-8 py-3 rounded-lg bg-primary text-on-primary font-label-md text-sm shadow-sm hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Enquiry</span>
                      <span className="material-symbols-outlined text-lg">send</span>
                    </>
                  )}
                </button>

                <span className="text-xs text-outline text-center sm:text-right">
                  Client confidentiality prioritized
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
