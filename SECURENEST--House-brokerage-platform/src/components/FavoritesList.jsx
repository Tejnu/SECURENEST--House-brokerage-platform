import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/use-toast';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

const FavoritesList = ({ isOpen, onClose, onViewDetails }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();

  if (!isOpen) return null;

  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );

  const handleRemove = (propertyId) => {
    removeFromFavorites(propertyId);
    toast({
      title: "Removed from favorites",
      description: "Property has been removed from your favorites."
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-500" />
                My Favorites ({favoriteProperties.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            {favoriteProperties.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Favorite Properties
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start adding properties to your favorites to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property, index) => (
                  <div key={property.id} className="relative">
                    <PropertyCard
                      property={property}
                      index={index}
                      onViewDetails={onViewDetails}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 left-2 z-10"
                      onClick={() => handleRemove(property.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FavoritesList;