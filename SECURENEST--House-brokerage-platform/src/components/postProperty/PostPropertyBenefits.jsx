
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PostPropertyBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Maximum Exposure",
      description: "Your property gets featured across our platform reaching thousands of potential buyers.",
      color: "bg-emerald-100 dark:bg-emerald-900",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Users,
      title: "Verified Leads",
      description: "Connect with serious, verified buyers and tenants who are actively looking.",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: CheckCircle,
      title: "Expert Support",
      description: "Get dedicated support from our property experts throughout the listing process.",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Post with SECURENEST?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get maximum exposure for your property with our comprehensive marketing platform.
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

export default PostPropertyBenefits;
