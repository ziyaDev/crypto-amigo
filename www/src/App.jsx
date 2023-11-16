import React from 'react';
import HeroSection from './Hero/HeroSection';
import Services from './service/ServiceSection';
import FeatureSection from './Feature/FeatureSection';
import CtaSection from './Cta/CtaSection';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className=" idk__32 bg-[#76C84D]">
      <HeroSection />
      <Services />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;
