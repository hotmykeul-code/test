/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, type ActiveTab } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { DashboardHome } from './components/DashboardHome';
import { FeaturesHumanClone } from './components/FeaturesHumanClone';
import { FeaturesStudio } from './components/FeaturesStudio';
import { FeaturesCopilotDM } from './components/FeaturesCopilotDM';
import { FeaturesScheduler } from './components/FeaturesScheduler';
import { PricingSection } from './components/PricingSection';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LegalModals } from './components/LegalModals';
import { AuthModal, type UserSession } from './components/AuthModal';
import { ConnectedAccounts } from './components/ConnectedAccounts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Modals & User Session State
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | 'biometrics' | 'notice' | null>(null);

  // Restore saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('socialclone_user_session');
      if (saved) {
        setUserSession(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Session restore note:', e);
    }
  }, []);

  const handleOpenLogin = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleLoginSuccess = (user: UserSession) => {
    setUserSession(user);
    try {
      localStorage.setItem('socialclone_user_session', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setUserSession(null);
    try {
      localStorage.removeItem('socialclone_user_session');
    } catch (e) {}
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

  // Render content in SaaS App Workspace
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHome 
            onSelectTab={setActiveTab} 
            onOpenOnboarding={handleOpenOnboarding} 
            userSession={userSession} 
          />
        );
      case 'clone':
        return <FeaturesHumanClone onOpenOnboarding={handleOpenOnboarding} />;
      case 'studio':
        return <FeaturesStudio onOpenOnboarding={handleOpenOnboarding} />;
      case 'copilot':
        return <FeaturesCopilotDM onOpenOnboarding={handleOpenOnboarding} />;
      case 'scheduler':
        return <FeaturesScheduler onOpenOnboarding={handleOpenOnboarding} />;
      case 'accounts':
        return <ConnectedAccounts onOpenOnboarding={handleOpenOnboarding} userSession={userSession} />;
      case 'pricing':
        return <PricingSection onOpenOnboarding={handleOpenOnboarding} />;
      default:
        return (
          <DashboardHome 
            onSelectTab={setActiveTab} 
            onOpenOnboarding={handleOpenOnboarding} 
            userSession={userSession} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      {userSession ? (
        /* ============================================================ */
        /* 📱 SAAS APPLICATION WORKSPACE (UTILISATEUR CONNECTÉ)         */
        /* ============================================================ */
        <div className="flex h-screen overflow-hidden">
          {/* Left Navigation Sidebar with Icons */}
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenOnboarding={handleOpenOnboarding}
            onOpenLogin={handleOpenLogin}
            userSession={userSession}
            onLogout={handleLogout}
            onOpenLegal={handleOpenLegal}
          />

          {/* Main App Workspace */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Top Workspace Header */}
            <AppHeader
              activeTab={activeTab}
              onOpenOnboarding={handleOpenOnboarding}
              onOpenLogin={handleOpenLogin}
              userSession={userSession}
              onLogout={handleLogout}
            />

            {/* Dynamic Active Tab Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {renderActiveTabContent()}
            </main>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* 🌐 LANDING PAGE PUBLIQUE (UTILISATEUR NON CONNECTÉ)         */
        /* ============================================================ */
        <div>
          <Navbar
            onOpenOnboarding={handleOpenOnboarding}
            onOpenLegal={handleOpenLegal}
            onOpenLogin={handleOpenLogin}
            userSession={userSession}
            onLogout={handleLogout}
          />

          <main>
            {/* Hero Section: Présentation claire, proposition de valeur & CTAs */}
            <Hero
              onOpenOnboarding={handleOpenOnboarding}
              onOpenLogin={handleOpenLogin}
            />

            {/* Tarification */}
            <PricingSection onOpenOnboarding={handleOpenOnboarding} />
          </main>

          <Footer
            onOpenLegal={handleOpenLegal}
            onOpenOnboarding={handleOpenOnboarding}
          />
        </div>
      )}

      {/* Interactive Onboarding Simulator Modal (Consentement unique à l'inscription) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        onOpenLegal={handleOpenLegal}
      />

      {/* Multi-Provider Auth Modal (Google, Meta, TikTok, Apple) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
        onOpenOnboarding={handleOpenOnboarding}
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
