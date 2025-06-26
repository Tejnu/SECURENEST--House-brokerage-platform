
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyComparison from '@/components/PropertyComparison';
import FavoritesList from '@/components/FavoritesList';
import BuyPage from '@/components/BuyPage';
import RentPage from '@/components/RentPage';
import SellPage from '@/components/SellPage';
import CommercialPage from '@/components/CommercialPage';
import AboutPage from '@/components/AboutPage';
import PostPropertyPage from '@/components/PostPropertyPage';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { properties } from '@/data/properties';

function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [filters, setFilters] = useState({
    type: 'All Types',
    priceRange: 'All Prices',
    bedrooms: 'Any',
    city: 'All Cities'
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsPropertyDetailsOpen(true);
  };

  const handleOpenComparison = () => {
    setIsComparisonOpen(true);
  };

  const handleOpenFavorites = () => {
    setIsFavoritesOpen(true);
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>SECURENEST - Find Your Perfect Dream Home in India</title>
        <meta name="description" content="Discover premium properties across India with SECURENEST. Buy, rent, or sell residential properties in Mumbai, Delhi, Bangalore, and more cities." />
      </Helmet>

      <main>
        <Hero onSearch={handleSearch} />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PropertyFilters 
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
            
            <PropertyGrid 
              properties={properties}
              searchQuery={searchQuery}
              filters={filters}
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        </section>
      </main>
    </div>
  );

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Header 
                onOpenComparison={handleOpenComparison}
                onOpenFavorites={handleOpenFavorites}
              />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/buy" element={<BuyPage onViewDetails={handleViewDetails} />} />
                <Route path="/rent" element={<RentPage onViewDetails={handleViewDetails} />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/commercial" element={<CommercialPage onViewDetails={handleViewDetails} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/post-property" element={<PostPropertyPage />} />
              </Routes>

              <Footer />
              
              <PropertyDetails
                property={selectedProperty}
                isOpen={isPropertyDetailsOpen}
                onClose={() => setIsPropertyDetailsOpen(false)}
              />
              
              <PropertyComparison
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
              />
              
              <FavoritesList
                isOpen={isFavoritesOpen}
                onClose={() => setIsFavoritesOpen(false)}
                onViewDetails={handleViewDetails}
              />
              
              <Toaster />
            </div>
          </Router>
        </ComparisonProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
