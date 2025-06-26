
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SellTestimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      achievement: "Sold 15% above market price",
      testimonial: "SECURENEST helped me get the best price for my apartment. Their marketing was excellent!"
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      achievement: "Sold in just 2 weeks",
      testimonial: "Quick and hassle-free process. The team was very professional and supportive."
    },
    {
      name: "Amit Patel",
      location: "Delhi",
      achievement: "Zero brokerage fees",
      testimonial: "Transparent pricing and no hidden charges. Highly recommend SECURENEST!"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how we've helped property owners get the best deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{story.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{story.location}</p>
                    </div>
                  </div>
                  <Badge className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Award className="h-3 w-3 mr-1" />
                    {story.achievement}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{story.testimonial}"
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

export default SellTestimonials;
