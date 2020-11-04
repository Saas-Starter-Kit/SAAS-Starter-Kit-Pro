//Landing Page
import LandingFeature from '../components/marketing/LandingPage/landingFeatures';
import HeroSection from '../components/marketing/LandingPage/heroSection';
import CTASection from '../components/marketing/LandingPage/ctaSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LandingFeature />
      <CTASection />
    </main>
  );
}
