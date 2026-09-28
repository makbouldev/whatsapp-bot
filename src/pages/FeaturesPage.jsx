import React from 'react';
import { Features } from '../components/Features';

export const FeaturesPage = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-24 pb-16 animate-in fade-in duration-300">
      <Features onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
