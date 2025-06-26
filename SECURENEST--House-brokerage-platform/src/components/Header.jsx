
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Mail, User, Scale, Heart, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComparison } from '@/contexts/ComparisonContext';

const Header = ({ onOpenComparison, onOpenFavorites }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { isDarkMode, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { comparisonList } = useComparison();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item) => {
    if (item === 'Buy') {
      navigate('/buy');
    } else if (item === 'Rent') {
      navigate('/rent');
    } else if (item === 'Sell') {
      navigate('/sell');
    } else if (item === 'Commercial') {
      navigate('/commercial');
    } else if (item === 'About') {
      navigate('/about');
    } else if (item === 'Post Property') {
      navigate('/post-property');
    } else if (item === 'Home') {
      navigate('/');
    } else {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
    }
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              SECURENEST
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleMenuClick('Buy')}
              className={`font-medium transition-colors ${
                isActive('/buy') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Buy
            </button>
            <button 
              onClick={() => handleMenuClick('Rent')}
              className={`font-medium transition-colors ${
                isActive('/rent') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Rent
            </button>
            <button 
              onClick={() => handleMenuClick('Sell')}
              className={`font-medium transition-colors ${
                isActive('/sell') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Sell
            </button>
            <button 
              onClick={() => handleMenuClick('Commercial')}
              className={`font-medium transition-colors ${
                isActive('/commercial') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Commercial
            </button>
            <button 
              onClick={() => handleMenuClick('About')}
              className={`font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              About
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onOpenFavorites}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            {/* Comparison Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onOpenComparison}
              className="relative"
            >
              <Scale className="h-5 w-5" />
              {comparisonList.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                  {comparisonList.length}
                </Badge>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button 
              variant="outline" 
              onClick={() => handleMenuClick('Login')}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button 
              onClick={() => handleMenuClick('Post Property')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Post Property
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t dark:border-gray-700"
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleMenuClick('Buy')}
                className={`text-left font-medium py-2 ${
                  isActive('/buy') 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => handleMenuClick('Rent')}
                className={`text-left font-medium py-2 ${
                  isActive('/rent') 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Rent
              </button>
              <button 
                onClick={() => handleMenuClick('Sell')}
                className={`text-left font-medium py-2 ${
                  isActive('/sell') 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Sell
              </button>
              <button 
                onClick={() => handleMenuClick('Commercial')}
                className={`text-left font-medium py-2 ${
                  isActive('/commercial') 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Commercial
              </button>
              <button 
                onClick={() => handleMenuClick('About')}
                className={`text-left font-medium py-2 ${
                  isActive('/about') 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                About
              </button>
              
              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={onOpenFavorites}
                    className="relative"
                  >
                    <Heart className="h-5 w-5" />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={onOpenComparison}
                    className="relative"
                  >
                    <Scale className="h-5 w-5" />
                    {comparisonList.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                        {comparisonList.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 pt-4 border-t dark:border-gray-700">
                <Button 
                  variant="outline" 
                  onClick={() => handleMenuClick('Login')}
                  className="justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={() => handleMenuClick('Post Property')}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Post Property
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
