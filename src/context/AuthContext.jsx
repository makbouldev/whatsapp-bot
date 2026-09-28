import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const initialSingleUserBot = {
  id: 'bot-user-1',
  name: 'Mon Bot WhatsApp IA',
  phone: '+212 661 234 567',
  status: 'active',
  type: 'WhatsApp AI Assistant 24/7',
  totalMessages: 12480,
  leadsCaptured: 890,
  conversionRate: '24.1%',
  prompt: 'En tant qu\'assistant virtuel IA, réponds poliment dans la langue du client aux demandes de produits, prix, catalogue et livraison.',
  welcomeMessage: 'Bonjour! 👋 Bienvenue chez nous. Comment puis-je vous aider aujourd\'hui ?'
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  
  // Each user has EXACTLY 1 dedicated WhatsApp bot
  const [userBot, setUserBot] = useState(initialSingleUserBot);
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (userData) => {
    setUser({
      name: userData?.name || 'Noureddine Agency',
      email: userData?.email || 'contact@noureddine.ma',
      phone: userData?.phone || '+212 661 234 567',
      plan: 'Business Pro Bot',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      company: userData?.name || 'Noureddine Digital'
    });

    // Assign 1 dedicated bot to this specific logged-in user
    setUserBot({
      id: `bot-${Date.now()}`,
      name: `Bot WhatsApp de ${userData?.name || 'Mon Entreprise'}`,
      phone: userData?.phone || '+212 661 234 567',
      status: 'active',
      type: 'WhatsApp AI Assistant 24/7',
      totalMessages: 3420,
      leadsCaptured: 245,
      conversionRate: '24.1%',
      prompt: 'En tant qu\'assistant virtuel IA, réponds poliment dans la langue du client aux demandes de produits, prix et livraison.',
      welcomeMessage: 'Bonjour! 👋 Bienvenue chez nous. Comment puis-je vous aider ?'
    });

    setIsLoggedIn(true);
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const toggleBotStatus = () => {
    setUserBot(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'paused' : 'active'
    }));
  };

  const updateBotConfig = (newConfig) => {
    setUserBot(prev => ({
      ...prev,
      ...newConfig
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isAuthModalOpen,
        authModalMode,
        userBot, // Single dedicated bot for the user
        bots: [userBot], // Array accessor for backwards compatibility
        activeDashboardTab,
        setActiveDashboardTab,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        toggleBotStatus,
        updateBotConfig
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
