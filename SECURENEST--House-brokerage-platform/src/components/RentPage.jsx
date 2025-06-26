import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Filter, Home, Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { useToast } from '@/components/ui/use-toast';
import { properties } from '@/data/properties';

const RentPage = ({ onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filters, setFilters] = useState({
    type: 'All Types',
    priceRange: 'All Prices',
    bedrooms: 'Any',
    city: 'All Cities'
  });
  const { toast } = useToast();

  const rentProperties = useMemo(() => {
    return properties.filter(property => property.status === 'For Rent');
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = rentProperties;

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    if (filters.type && filters.type !== 'All Types') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.city && filters.city !== 'All Cities') {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      const bedroomCount = filters.bedrooms === '4+' ? 4 : parseInt(filters.bedrooms);
      if (filters.bedrooms === '4+') {
        filtered = filtered.filter(property => property.bedrooms >= bedroomCount);
      } else {
        filtered = filtered.filter(property => property.bedrooms === bedroomCount);
      }
    }

    return filtered;
  }, [rentProperties, searchQuery, selectedCity, filters]);

  const handleSearch = () => {
    if (searchQuery.trim() || selectedCity) {
      toast({
        title: "Search initiated!",
        description: `Searching for rental properties${selectedCity ? ` in ${selectedCity}` : ''}...`
      });
    } else {
      toast({
        title: "Please enter search criteria",
        description: "Enter a location or select a city to search for rental properties."
      });
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Rent Properties - SECURENEST | Premium Rental Properties in India</title>
        <meta name="description" content="Find the perfect rental property with SECURENEST. Browse furnished and unfurnished apartments, houses for rent across major Indian cities." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Find Your Perfect Rental
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto"
            >
              Discover amazing rental properties across India. From cozy studios to spacious family homes.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-6 search-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter city, locality, or project name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="h-12 px-4 rounded-md border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select City</option>
                    {popularCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>

                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="h-12 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-lg font-semibold"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search Rentals
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Rent with SECURENEST?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience hassle-free renting with our verified properties and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Quick Move-in</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Find ready-to-move properties with immediate possession available.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Verified Landlords</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with verified property owners for transparent rental agreements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Flexible Terms</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose from various rental terms and flexible lease agreements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Properties for Rent
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {filteredProperties.length} rental properties available
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Home className="h-4 w-4 mr-2" />
              {rentProperties.length} Total Rentals
            </Badge>
          </div>

          <PropertyFilters 
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Rental Properties Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search criteria or filters to find more rental properties.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                  setFilters({
                    type: 'All Types',
                    priceRange: 'All Prices',
                    bedrooms: 'Any',
                    city: 'All Cities'
                  });
                }}
                variant="outline"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RentPage;