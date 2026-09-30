import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2, DollarSign } from 'lucide-react';

export const PaypalModal = ({ isOpen, onClose, orderData }) => {
  const { markAsPaid, pendingBotOrder } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [activeTab, setActiveTab] = useState('paypal'); // 'paypal' or 'card'

  if (!isOpen) return null;

  const activeOrder = orderData || pendingBotOrder || {
    planName: 'Business Pro AI',
    totalUsd: 20,
    sectorLabel: 'E-Commerce & Retail'
  };

  const handlePaypalSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate PayPal API processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const txnId = `PAYPAL-TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;

      setTimeout(() => {
        markAsPaid({
          ...activeOrder,
          paypalTxnId: txnId,
          paypalEmail: paypalEmail || 'client@paypal.com'
        });
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-obsidian-surface border border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-border overflow-hidden">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PayPal Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2 bg-[#0070BA]/15 border border-[#0070BA]/40 px-4 py-1.5 rounded-full">
            <span className="text-lg font-black text-[#0070BA] tracking-wider italic font-serif">PayPal</span>
            <span className="text-xs font-bold text-slate-300">Secure Checkout</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">Complete Your Bot Subscription</h3>
          <p className="text-xs text-slate-300">
            Payment required via PayPal to unlock your WhatsApp Bot Dashboard.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Selected Plan:</span>
            <span className="text-wa-green font-extrabold">{activeOrder.planName}</span>
          </div>
          {activeOrder.sectorLabel && (
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Business Sector:</span>
              <span className="text-white">{activeOrder.sectorLabel}</span>
            </div>
          )}
          <div className="pt-2 border-t border-obsidian-border/70 flex items-center justify-between">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Total Monthly Amount:</span>
            <div className="text-right">
              <span className="text-2xl font-black text-white font-mono">${activeOrder.totalUsd || 20}</span>
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
          </div>
        </div>

        {/* Payment Processing / Success States */}
        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-wa-green/15 border border-wa-green/40 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-12 h-12 text-wa-green mx-auto" />
            <h4 className="text-lg font-extrabold text-white">PayPal Payment Approved! 🎉</h4>
            <p className="text-xs text-slate-300">Unlocking your WhatsApp Bot Dashboard now...</p>
          </div>
        ) : isProcessing ? (
          <div className="p-8 rounded-2xl bg-obsidian-card border border-obsidian-border text-center space-y-4">
            <Loader2 className="w-10 h-10 text-[#0070BA] animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white">Connecting to PayPal Gateway...</h4>
              <p className="text-xs text-slate-400">Please do not refresh or close this window.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePaypalSubmit} className="space-y-4">
            
            {/* PayPal Method Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">
                PayPal Account Email
              </label>
              <input
                type="email"
                required
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="your-paypal-email@domain.com"
                className="w-full bg-obsidian border border-obsidian-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0070BA] transition-colors"
              />
            </div>

            {/* Official Yellow PayPal Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FFC439] hover:bg-[#ffbb1a] text-obsidian font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span className="text-[#003087] font-serif italic text-base font-black">PayPal</span>
              <span>Pay Now (${activeOrder.totalUsd || 20}.00)</span>
              <ArrowRight className="w-4 h-4 stroke-[3] text-[#003087]" />
            </button>

            {/* Debit or Credit Card Button (PayPal Powered) */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Debit or Credit Card (Powered by PayPal)</span>
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0070BA]" />
              <span>Protected by PayPal 256-Bit Buyer Protection</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
