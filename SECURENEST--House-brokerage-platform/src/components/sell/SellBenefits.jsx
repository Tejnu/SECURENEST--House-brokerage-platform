
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SellBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Get detailed market analysis and pricing recommendations for your property.",
      color: "bg-orange-100 dark:bg-orange-900",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Star,
      title: "Premium Marketing",
      description: "Professional photography and premium listing placement for maximum visibility.",
      color: "bg-red-100 dark:bg-red-900",
      iconColor: "text-red-600 dark:text-red-400"
    },
    {
      icon: Shield,
      title: "Legal Support",
      description: "Complete legal assistance and documentation support throughout the sale process.",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Sell with SECURENEST?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide comprehensive support to help you sell your property quickly and at the best price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellBenefits;
