import React from "react"
import LandingFeature from "./landingFeatures"
import HeroSection from "./heroSection"
import CTASection from "./ctaSection"
import TripleColFeatures from "./tripleColFeatures"
import Testimonial from "./testimonial"
import Layout from "../../../components/Marketing/Layout"

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <TripleColFeatures />
      <Testimonial />
      <LandingFeature />
      <CTASection />
    </Layout>
  )
}
