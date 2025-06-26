
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PostPropertyHero = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Post Your Property
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto"
          >
            List your property for free and connect with thousands of potential buyers and tenants.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Free Listing
            </Badge>
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Verified Buyers
            </Badge>
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Quick Response
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PostPropertyHero;
