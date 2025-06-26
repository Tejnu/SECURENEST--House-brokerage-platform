import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { useToast } from '@/components/ui/use-toast';

const PropertyGrid = ({ properties, searchQuery, filters, onViewDetails }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const { toast } = useToast();

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties;

    // Apply search filter
    if (searchQuery?.query) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.query.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.query.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.query.toLowerCase())
      );
    }

    if (searchQuery?.city) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchQuery.city.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.type && filters.type !== 'All Types') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters?.city && filters.city !== 'All Cities') {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters?.bedrooms && filters.bedrooms !== 'Any') {
      const bedroomCount = filters.bedrooms === '4+' ? 4 : parseInt(filters.bedrooms);
      if (filters.bedrooms === '4+') {
        filtered = filtered.filter(property => property.bedrooms >= bedroomCount);
      } else {
        filtered = filtered.filter(property => property.bedrooms === bedroomCount);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[₹,\s]/g, '').replace('Cr', '0000000').replace('Lakh', '00000').replace('/month', ''));
          const priceB = parseFloat(b.price.replace(/[₹,\s]/g, '').replace('Cr', '0000000').replace('Lakh', '00000').replace('/month', ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[₹,\s]/g, '').replace('Cr', '0000000').replace('Lakh', '00000').replace('/month', ''));
          const priceB = parseFloat(b.price.replace(/[₹,\s]/g, '').replace('Cr', '0000000').replace('Lakh', '00000').replace('/month', ''));
          return priceB - priceA;
        });
        break;
      case 'area-large':
        filtered.sort((a, b) => {
          const areaA = parseInt(a.area.replace(/[^\d]/g, ''));
          const areaB = parseInt(b.area.replace(/[^\d]/g, ''));
          return areaB - areaA;
        });
        break;
      case 'newest':
        // For demo purposes, we'll sort by ID (assuming higher ID = newer)
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [properties, searchQuery, filters, sortBy]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    toast({
      title: `View changed to ${mode} mode`,
      description: `Properties are now displayed in ${mode} view.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredAndSortedProperties.length} Properties Found
          </h2>
          {(searchQuery?.query || searchQuery?.city) && (
            <p className="text-gray-600 mt-1">
              {searchQuery.query && `Searching for "${searchQuery.query}"`}
              {searchQuery.query && searchQuery.city && ' in '}
              {searchQuery.city && `${searchQuery.city}`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area-large">Area: Largest First</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredAndSortedProperties.length > 0 ? (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredAndSortedProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Reset Search
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyGrid;