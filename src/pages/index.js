//Landing Page
import LandingFeature from '../components/marketing/LandingPage/landingFeatures';
import HeroSection from '../components/marketing/LandingPage/heroSection';
import CTASection from '../components/marketing/LandingPage/ctaSection';
import TripleColFeatures from '../components/marketing/LandingPage/tripleColFeatures';
import Layout from '../components/marketing/Layout';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <TripleColFeatures />
      <LandingFeature />
      <CTASection />
    </Layout>
  );
}
