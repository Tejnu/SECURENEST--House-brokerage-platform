
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Phone, Heart, Scale, Star, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComparison } from '@/contexts/ComparisonContext';

const PropertyCard = ({ property, index, onViewDetails }) => {
  const { toast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToComparison, isInComparison } = useComparison();

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: `Agent: ${property.agent} | Phone: ${property.agentPhone}`
    });
  };

  const handleFavorite = () => {
    toggleFavorite(property.id);
    toast({
      title: isFavorite(property.id) ? "Removed from favorites" : "Added to favorites",
      description: isFavorite(property.id) 
        ? "Property has been removed from your favorites." 
        : "Property has been added to your favorites."
    });
  };

  const handleAddToComparison = () => {
    const success = addToComparison(property);
    if (success) {
      toast({
        title: "Added to comparison",
        description: "Property has been added to comparison list."
      });
    } else {
      toast({
        title: "Cannot add to comparison",
        description: "You can only compare up to 3 properties at once."
      });
    }
  };

  const handleViewDetails = () => {
    onViewDetails(property);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="property-card overflow-hidden group">
        <div className="relative">
          <img  
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            alt={`${property.title} - ${property.location}`}
           src="https://images.unsplash.com/photo-1699427793829-2334a8688972" />
          
          <div className="absolute top-4 left-4">
            <Badge className={`${
              property.status === 'For Sale' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {property.status}
            </Badge>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleFavorite}
              className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Heart className={`h-4 w-4 ${
                isFavorite(property.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
              }`} />
            </button>
            {!isInComparison(property.id) && (
              <button
                onClick={handleAddToComparison}
                className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <Scale className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-blue-500" />
              </button>
            )}
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="flex items-center bg-black/50 text-white px-2 py-1 rounded text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {property.rating}
            </div>
            <div className="flex items-center bg-black/50 text-white px-2 py-1 rounded text-xs">
              <Eye className="h-3 w-3 mr-1" />
              {property.views}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {property.price}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-100 dark:border-gray-700">
            {property.bedrooms > 0 && (
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.bedrooms} Bed</span>
              </div>
            )}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.features.slice(0, 3).map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs"
                >
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleContact}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
            <Button
              onClick={handleViewDetails}
              size="sm"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
