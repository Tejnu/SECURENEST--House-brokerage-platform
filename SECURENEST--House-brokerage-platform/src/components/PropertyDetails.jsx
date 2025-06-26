import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Bed, Bath, Square, Star, Calendar, Home, Phone, Mail, Heart, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { useToast } from '@/components/ui/use-toast';

const PropertyDetails = ({ property, isOpen, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToComparison, isInComparison } = useComparison();
  const { toast } = useToast();

  if (!isOpen || !property) return null;

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

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: `Agent: ${property.agent} | Phone: ${property.agentPhone}`
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
          className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Property Details</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-auto max-h-[calc(90vh-120px)]">
            <div className="p-6 space-y-6">
              {/* Property Image */}
              <div className="relative">
                <img  
                  className="w-full h-64 object-cover rounded-lg"
                  alt={`${property.title} - ${property.location}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="absolute top-4 left-4">
                  <Badge className={property.status === 'For Sale' ? 'bg-green-600' : 'bg-blue-600'}>
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleFavorite}
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  {!isInComparison(property.id) && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleAddToComparison}
                      className="bg-white/80 hover:bg-white"
                    >
                      <Scale className="h-4 w-4 text-gray-600" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.location}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                      {property.price}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{property.rating}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{property.views} views</span>
                    </div>
                  </div>

                  {/* Property Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {property.bedrooms > 0 && (
                          <div className="text-center">
                            <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                            <div className="font-semibold">{property.bedrooms}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                          </div>
                        )}
                        <div className="text-center">
                          <Bath className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="font-semibold">{property.bathrooms}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <Square className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="font-semibold">{property.area}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Area</div>
                        </div>
                        <div className="text-center">
                          <Home className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="font-semibold">{property.type}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Furnishing:</span>
                            <span className="font-medium">{property.furnishing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Floor:</span>
                            <span className="font-medium">{property.floor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Total Floors:</span>
                            <span className="font-medium">{property.totalFloors}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Property Age:</span>
                            <span className="font-medium">{property.propertyAge}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Facing:</span>
                            <span className="font-medium">{property.facing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Possession:</span>
                            <span className="font-medium">{property.possession}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {property.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Features & Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="justify-center py-2">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Agent Info */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Agent</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold text-xl">
                            {property.agent.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">{property.agent}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Property Agent</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-blue-600" />
                          <span className="text-sm">{property.agentPhone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-blue-600" />
                          <span className="text-sm">{property.agentEmail}</span>
                        </div>
                      </div>

                      <Button onClick={handleContact} className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Agent
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={handleFavorite}
                        className="w-full"
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isFavorite(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        {isFavorite(property.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </Button>
                      {!isInComparison(property.id) && (
                        <Button
                          variant="outline"
                          onClick={handleAddToComparison}
                          className="w-full"
                        >
                          <Scale className="h-4 w-4 mr-2" />
                          Add to Compare
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetails;