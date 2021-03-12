import React from 'react';
import LandingFeature from './landingFeatures';
import HeroSection from './heroSection';
import CTASection from './ctaSection';
import TripleColFeatures from './tripleColFeatures';
import Testimonial from './testimonial';
import Layout from '../../../components/Marketing/Layout';

export default function Index() {
  return (
    <Layout
      title="Saas Starter Kit Home page"
      description="Saas Starter Kit is a modern and comprehensive SAAS boilerplate."
    >
      <HeroSection />
      <TripleColFeatures />
      <Testimonial />
      <LandingFeature />
      <CTASection />
    </Layout>
  );
}
