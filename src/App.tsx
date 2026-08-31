/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PricingSection } from './components/PricingSection';
import { FeaturesFullPage } from './components/FeaturesFullPage';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'features'>('home');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | 'biometrics' | 'notice' | null>(null);

  const handleNavigate = (page: 'home' | 'features', hash?: string) => {
    setCurrentPage(page);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenLegal = (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => {
    setLegalModalType(type);
  };

  const handleCloseLegal = () => {
    setLegalModalType(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Fixed Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenOnboarding={handleOpenOnboarding}
        onOpenLegal={handleOpenLegal}
      />

      {/* Page Content: Streamlined Home (Presentation + Tarifs) vs Dedicated Features Page */}
      {currentPage === 'home' ? (
        <main>
          {/* Hero Section: Présentation épurée, proposition de valeur & CTA principal */}
          <Hero
            onOpenOnboarding={handleOpenOnboarding}
            onNavigateToFeatures={() => handleNavigate('features')}
          />

          {/* Tarification claire et transparente */}
          <PricingSection onOpenOnboarding={handleOpenOnboarding} />
        </main>
      ) : (
        <main>
          {/* Page dédiée exhaustive avec tous les modules technologiques détaillés */}
          <FeaturesFullPage
            onBackToHome={() => handleNavigate('home')}
            onGoToPricing={() => handleNavigate('home', 'tarifs')}
            onOpenOnboarding={handleOpenOnboarding}
            onOpenLegal={handleOpenLegal}
          />
        </main>
      )}

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={handleOpenLegal}
        onOpenOnboarding={handleOpenOnboarding}
      />

      {/* Interactive Onboarding Simulator Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        onOpenLegal={handleOpenLegal}
      />

      {/* Dedicated Legal Modals */}
      <LegalModals
        type={legalModalType}
        onClose={handleCloseLegal}
      />
    </div>
  );
}


