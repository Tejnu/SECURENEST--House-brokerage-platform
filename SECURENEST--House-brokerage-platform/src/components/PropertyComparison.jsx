import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Bath, Square, MapPin, Star, Calendar, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import { useToast } from '@/components/ui/use-toast';

const PropertyComparison = ({ isOpen, onClose }) => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleRemove = (propertyId) => {
    removeFromComparison(propertyId);
    toast({
      title: "Property removed",
      description: "Property has been removed from comparison."
    });
  };

  const handleClear = () => {
    clearComparison();
    toast({
      title: "Comparison cleared",
      description: "All properties have been removed from comparison."
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
              <h2 className="text-2xl font-bold">Property Comparison</h2>
              <div className="flex items-center gap-2">
                {comparisonList.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    Clear All
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            {comparisonList.length === 0 ? (
              <div className="text-center py-16">
                <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Properties to Compare
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add properties to comparison to see them side by side.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonList.map((property) => (
                  <Card key={property.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleRemove(property.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <CardHeader className="pb-4">
                      <img  
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        alt={`${property.title} - ${property.location}`}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {property.price}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        {property.bedrooms > 0 && (
                          <div className="flex flex-col items-center">
                            <Bed className="h-4 w-4 mb-1" />
                            <span className="text-sm">{property.bedrooms}</span>
                          </div>
                        )}
                        <div className="flex flex-col items-center">
                          <Bath className="h-4 w-4 mb-1" />
                          <span className="text-sm">{property.bathrooms}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Square className="h-4 w-4 mb-1" />
                          <span className="text-sm">{property.area}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                          <Badge variant="secondary">{property.type}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Furnishing:</span>
                          <span className="text-sm">{property.furnishing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Floor:</span>
                          <span className="text-sm">{property.floor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Age:</span>
                          <span className="text-sm">{property.propertyAge}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium">Features:</span>
                        <div className="flex flex-wrap gap-1">
                          {property.features.slice(0, 4).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.features.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyComparison;