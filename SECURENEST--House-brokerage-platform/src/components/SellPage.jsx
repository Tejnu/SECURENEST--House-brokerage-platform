import React from 'react';
import { Helmet } from 'react-helmet';
import SellHero from '@/components/sell/SellHero';
import SellBenefits from '@/components/sell/SellBenefits';
import SellForm from '@/components/sell/SellForm';
import SellTestimonials from '@/components/sell/SellTestimonials';

const SellPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Sell Property - SECURENEST | List Your Property for Sale in India</title>
        <meta name="description" content="Sell your property with SECURENEST. Get the best price for your apartment, villa, or plot with our expert marketing and verified buyers." />
      </Helmet>

      <SellHero />
      <SellBenefits />
      <SellForm />
      <SellTestimonials />
    </div>
  );
};

export default SellPage;