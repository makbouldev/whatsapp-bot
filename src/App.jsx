import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { QuoteModal } from './components/QuoteModal';
import { FloatingCta } from './components/FloatingCta';

import { HomePage } from './pages/HomePage';
import { SimulatorPage } from './pages/SimulatorPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardLayout } from './dashboard/DashboardLayout';

const MainAppContent = () => {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 selection:bg-wa-green selection:text-obsidian flex flex-col justify-between relative">
      <ScrollToTop />

      {/* Global Header */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Routes setup for multi-page architecture */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/simulator" element={<SimulatorPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/features" element={<FeaturesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/solutions" element={<SolutionsPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/pricing" element={<PricingPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          {/* Client Bot Portal Route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <DashboardLayout onReturnToLanding={() => navigate('/')} />
              ) : (
                <div className="pt-32 pb-20 text-center space-y-4 max-w-md mx-auto px-4">
                  <h2 className="text-2xl font-bold text-white">Connexion requise</h2>
                  <p className="text-xs text-slate-300">Veuillez vous connecter pour accéder à votre espace de gestion de bot WhatsApp.</p>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-6 py-3 bg-wa-green text-obsidian font-extrabold rounded-xl text-sm shadow-glow-green"
                  >
                    Se Connecter
                  </button>
                </div>
              )
            }
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAuthModal={(mode) => openAuthModal(mode)}
      />

      {/* Auth Modal */}
      <AuthModal onNavigateDashboard={() => navigate('/dashboard')} />

      {/* Quote Builder Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuoteModal} />

      {/* Floating Action Button */}
      <FloatingCta onOpenQuoteModal={handleOpenQuoteModal} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
