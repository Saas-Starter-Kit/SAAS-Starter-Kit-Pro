//Landing Page
import LandingFeature from './landingFeatures';
import HeroSection from './heroSection';
import CTASection from './ctaSection';
import TripleColFeatures from './tripleColFeatures';
import Testimonial from './testimonial';
import Layout from '../../components/Layout';

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <TripleColFeatures />
      <Testimonial />
      <LandingFeature />
      <CTASection />
    </Layout>
  );
}
