
import React from 'react';
import { Helmet } from 'react-helmet';
import PostPropertyHero from '@/components/postProperty/PostPropertyHero';
import PostPropertyBenefits from '@/components/postProperty/PostPropertyBenefits';
import PostPropertyForm from '@/components/postProperty/PostPropertyForm';

const PostPropertyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Post Property - SECURENEST | List Your Property for Free</title>
        <meta name="description" content="Post your property for free on SECURENEST. List residential and commercial properties for sale or rent with our easy-to-use platform." />
      </Helmet>

      <PostPropertyHero />
      <PostPropertyBenefits />
      <PostPropertyForm />
    </div>
  );
};

export default PostPropertyPage;
