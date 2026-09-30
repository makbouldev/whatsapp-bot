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
  prompt: 'You are a friendly, intelligent WhatsApp AI Assistant. Respond in the exact language used by the client.',
  welcomeMessage: 'Hello! 👋 Welcome to our store. How can I help you today?'
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  
  // Pending Bot Order Configuration saved from QuoteModal
  const [pendingBotOrder, setPendingBotOrder] = useState(null);

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

  const savePendingBotOrder = (orderData) => {
    setPendingBotOrder(orderData);
  };

  const login = (userData) => {
    const userName = userData?.name || 'Noureddine Agency';

    setUser({
      name: userName,
      email: userData?.email || 'contact@noureddine.ma',
      phone: userData?.phone || '+212 661 234 567',
      plan: pendingBotOrder?.planName || 'Business Pro Bot',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      company: userName
    });

    // Assign 1 dedicated bot with saved order configuration if available
    setUserBot({
      id: `bot-${Date.now()}`,
      name: `Bot WhatsApp de ${userName}`,
      phone: userData?.phone || '+212 661 234 567',
      status: 'active',
      type: pendingBotOrder ? `${pendingBotOrder.planName} (${pendingBotOrder.sectorLabel})` : 'WhatsApp AI Assistant 24/7',
      totalMessages: 0,
      leadsCaptured: 0,
      conversionRate: '0%',
      prompt: pendingBotOrder?.prompt || 'You are a friendly, intelligent WhatsApp AI Assistant. Respond in the exact language used by the client.',
      welcomeMessage: pendingBotOrder?.welcomeMessage || 'Hello! 👋 Welcome to our store. How can I help you today?'
    });

    setIsLoggedIn(true);
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setPendingBotOrder(null);
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
        pendingBotOrder,
        savePendingBotOrder,
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
