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

import { Lock, ShieldAlert, Sparkles, LogOut, ArrowRight } from 'lucide-react';

const MainAppContent = () => {
  const { isLoggedIn, isPaid, user, openAuthModal, logout } = useAuth();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuotePack, setSelectedQuotePack] = useState('pro');
  const navigate = useNavigate();

  const handleNavigatePricing = () => {
    navigate('/pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (packId = 'pro') => {
    if (typeof packId === 'string') {
      setSelectedQuotePack(packId);
    } else {
      setSelectedQuotePack('pro');
    }
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
          <Route path="/" element={<HomePage onNavigatePricing={handleNavigatePricing} />} />
          <Route path="/simulator" element={<SimulatorPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/features" element={<FeaturesPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/solutions" element={<SolutionsPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/pricing" element={<PricingPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage onOpenQuoteModal={handleOpenQuoteModal} />} />
          
          {/* Protected Client Bot Portal Route (Requires Login + Active Paid Plan) */}
          <Route
            path="/dashboard"
            element={
              !isLoggedIn ? (
                <div className="pt-32 pb-20 text-center space-y-5 max-w-md mx-auto px-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-wa-green/10 border border-wa-green/30 flex items-center justify-center mx-auto text-wa-green shadow-glow-green">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-white">Sign In Required</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Please sign in to your account to access your WhatsApp AI Bot Dashboard.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="flex-1 py-3.5 px-4 bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-extrabold rounded-xl text-xs shadow-glow-green hover:scale-[1.02] transition-all"
                    >
                      Sign In to Portal
                    </button>
                    <button
                      onClick={() => handleNavigatePricing()}
                      className="flex-1 py-3.5 px-4 bg-obsidian-card border border-obsidian-border text-white font-bold rounded-xl text-xs hover:border-wa-green/50 transition-all"
                    >
                      Browse Plans ($10+)
                    </button>
                  </div>
                </div>
              ) : !isPaid ? (
                <div className="pt-32 pb-20 text-center space-y-6 max-w-lg mx-auto px-4 animate-in fade-in duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
                    <Lock className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider">
                      <span>⚡ Active Plan Required</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white">Unlock Your Dashboard</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You are logged in as <span className="font-bold text-white">{user?.email}</span>, but your account does not have an active WhatsApp Bot subscription yet. Select a plan to activate your AI Assistant and start managing your leads.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold border-b border-obsidian-border/60 pb-2">
                      <span className="text-slate-400">Account Email:</span>
                      <span className="text-white">{user?.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Subscription Status:</span>
                      <span className="text-amber-400 font-extrabold bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30">Unpaid / Inactive</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => handleOpenQuoteModal('pro')}
                      className="flex-1 py-3.5 px-4 bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-black rounded-xl text-xs shadow-glow-green hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Choose Plan & Activate ($10/mo)</span>
                    </button>
                    <button
                      onClick={() => logout()}
                      className="py-3.5 px-4 bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white font-bold rounded-xl text-xs hover:border-slate-600 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <DashboardLayout onReturnToLanding={() => navigate('/')} />
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
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuoteModal} initialPack={selectedQuotePack} />

      {/* Floating Action Button */}
      <FloatingCta onNavigatePricing={handleNavigatePricing} />
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
