import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, LogIn, Sparkles, LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = ({ onOpenQuoteModal }) => {
  const { isLoggedIn, user, openAuthModal, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `text-sm font-semibold transition-all relative py-1 px-1 ${
      isActive
        ? 'text-wa-green font-bold'
        : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian/95 backdrop-blur-md border-b border-obsidian-border py-3.5 shadow-2xl'
          : 'bg-obsidian/60 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Clean Logo (No overlapping badges) */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-wa-green/10 border border-wa-green/40 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-wa-green" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              WaBot<span className="text-wa-green">ix</span>
            </span>
          </Link>

          {/* Essential Nav Links Only (Clean & Uncluttered - 4 Links Max) */}
          <nav className="hidden md:flex items-center gap-8 bg-obsidian-card/80 border border-obsidian-border px-6 py-2 rounded-full shadow-inner">
            <NavLink to="/simulator" className={navLinkStyle}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-wa-green animate-pulse"></span>
                <span>Démo Live</span>
              </span>
            </NavLink>
            <NavLink to="/features" className={navLinkStyle}>
              Fonctionnalités
            </NavLink>
            <NavLink to="/solutions" className={navLinkStyle}>
              Solutions
            </NavLink>
            <NavLink to="/pricing" className={navLinkStyle}>
              Tarifs
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-obsidian-card border border-obsidian-border hover:border-wa-green/50 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover ring-2 ring-wa-green"
                  />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <LayoutDashboard className="w-3.5 h-3.5 text-wa-green" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl py-2 border border-obsidian-border z-50">
                    <div className="px-4 py-2 border-b border-obsidian-border">
                      <p className="text-xs text-slate-400">Connecté en tant que</p>
                      <p className="text-xs font-bold text-white truncate">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-wa-green/10 hover:text-wa-green flex items-center gap-2 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-wa-green" />
                      <span>Espace Client (Dashboard)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-obsidian-border/50 font-medium"
                    >
                      <LogIn className="w-4 h-4 rotate-180" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors hover:bg-white/5 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-wa-green" />
                <span>Connexion</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => {
                navigate('/pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold px-4 py-2 rounded-xl shadow-glow-green hover:scale-105 transition-all text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-obsidian" />
              <span>Créer Mon Bot</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {!isLoggedIn && (
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs bg-obsidian-card border border-obsidian-border px-3 py-1.5 rounded-lg text-slate-200 font-semibold"
              >
                Connexion
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-obsidian-card border border-obsidian-border text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-wa-green" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-obsidian-border px-5 py-5 mt-2 space-y-3 animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-2.5">
            <NavLink
              to="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-sm font-semibold py-1 flex items-center justify-between ${isActive ? 'text-wa-green font-bold' : 'text-slate-200'}`}
            >
              <span>Démo Live Simulator</span>
              <span className="bg-wa-green/20 text-wa-green text-[10px] px-2 py-0.5 rounded-full font-bold">Interactive</span>
            </NavLink>
            <NavLink
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-sm font-semibold py-1 ${isActive ? 'text-wa-green font-bold' : 'text-slate-200'}`}
            >
              Fonctionnalités
            </NavLink>
            <NavLink
              to="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-sm font-semibold py-1 ${isActive ? 'text-wa-green font-bold' : 'text-slate-200'}`}
            >
              Solutions
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-sm font-semibold py-1 ${isActive ? 'text-wa-green font-bold' : 'text-slate-200'}`}
            >
              Tarifs
            </NavLink>
          </nav>

          <div className="pt-3 border-t border-obsidian-border flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-obsidian-card border border-wa-green text-wa-green font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Espace Client Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full bg-obsidian-card border border-obsidian-border text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-wa-green" />
                <span>Se Connecter</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-wa-green text-obsidian font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-glow-green"
            >
              <Sparkles className="w-4 h-4" />
              <span>Créer Mon Bot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
