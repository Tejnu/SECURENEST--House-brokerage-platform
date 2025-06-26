
import React, { useState } from 'react';
import { Upload, Camera, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { propertyTypes, commercialPropertyTypes } from '@/data/propertyTypes';
import { popularCities } from '@/data/cities';

const PostPropertyForm = () => {
  const [propertyCategory, setPropertyCategory] = useState('residential');
  const [formData, setFormData] = useState({
    propertyType: '',
    title: '',
    location: '',
    city: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    listingType: 'sale'
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Property listing submitted!",
      description: "Your property has been submitted for review. Our team will contact you within 24 hours."
    });
    
    // Reset form
    setFormData({
      propertyType: '',
      title: '',
      location: '',
      city: '',
      price: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      listingType: 'sale'
    });
  };

  const handlePhotoUpload = () => {
    toast({
      title: "🚧 Photo upload feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const currentPropertyTypes = propertyCategory === 'residential' ? propertyTypes : commercialPropertyTypes;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            List Your Property
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details below to get started with your property listing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Category *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPropertyCategory('residential')}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      propertyCategory === 'residential'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <Home className="h-8 w-8 mx-auto mb-2" />
                    <span className="font-medium">Residential</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPropertyCategory('commercial')}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      propertyCategory === 'commercial'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <Building className="h-8 w-8 mx-auto mb-2" />
                    <span className="font-medium">Commercial</span>
                  </button>
                </div>
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Listing Type *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, listingType: 'sale' }))}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      formData.listingType === 'sale'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    For Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, listingType: 'rent' }))}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      formData.listingType === 'rent'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    For Rent
                  </button>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Property Type</option>
                  {currentPropertyTypes.filter(type => type !== 'All Types').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Property Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Spacious 3BHK Apartment in Bandra"
                  required
                  className="h-12"
                />
              </div>

              {/* Location and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter complete address"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select City</option>
                    {popularCities.map(city => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price and Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.listingType === 'sale' ? 'Expected Price *' : 'Monthly Rent *'}
                  </label>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder={formData.listingType === 'sale' ? "e.g., ₹1.5 Cr" : "e.g., ₹25,000"}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area *
                  </label>
                  <Input
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200 sq ft"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Bedrooms and Bathrooms (only for residential) */}
              {propertyCategory === 'residential' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bedrooms
                    </label>
                    <select
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Bedrooms</option>
                      {bedroomOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bathrooms
                    </label>
                    <Input
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="Number of bathrooms"
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your property, amenities, and unique features..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Upload high-quality photos of your property
                  </p>
                  <Button
                    type="button"
                    onClick={handlePhotoUpload}
                    variant="outline"
                    className="mb-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                  <p className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, JPEG (Max 10 photos)
                  </p>
                </div>
              </div>

              {/* Owner Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      name="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-3"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Post My Property
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  By submitting, you agree to our terms and conditions. Your property will be reviewed and published within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PostPropertyForm;
