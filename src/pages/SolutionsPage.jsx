import React from 'react';
import { UseCases } from '../components/UseCases';

export const SolutionsPage = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-24 pb-16 animate-in fade-in duration-300">
      <UseCases onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
