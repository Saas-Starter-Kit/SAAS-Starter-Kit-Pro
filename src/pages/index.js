//Landing Page
import LandingFeature from '../components/marketing/LandingPage/landingFeatures';
import HeroSection from '../components/marketing/LandingPage/heroSection';
import CTASection from '../components/marketing/LandingPage/ctaSection';
import Layout from '../components/marketing/Layout';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <LandingFeature />
      <CTASection />
    </Layout>
  );
}
