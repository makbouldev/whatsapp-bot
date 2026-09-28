import React from 'react';
import { Pricing } from '../components/Pricing';

export const PricingPage = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-24 pb-16 animate-in fade-in duration-300">
      <Pricing onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
