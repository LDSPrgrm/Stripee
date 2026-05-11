import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentSpacer from '../components/ContentSpacer';
import Footer from '../components/Footer';
import { LeaderboardBanner, SponsoredStrip, SidebarAdFloat } from '../components/AdBanner';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LeaderboardBanner />
      <main className="flex-grow">
        <Hero />
        <SponsoredStrip />
        <ContentSpacer />
      </main>
      <Footer />
      <SidebarAdFloat />
    </div>
  );
}

export default LandingPage;
