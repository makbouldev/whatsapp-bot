import React from 'react';
import { BotSimulator } from '../components/BotSimulator';

export const SimulatorPage = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-24 pb-16 animate-in fade-in duration-300">
      <BotSimulator onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
