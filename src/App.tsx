import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MilestoneCounters } from './components/MilestoneCounters';
import { StatsTable } from './components/StatsTable';
import { RecordsShowcase } from './components/RecordsShowcase';
import { BiographySection } from './components/BiographySection';
import { GoogleDriveSection } from './components/GoogleDriveSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div class="min-h-screen bg-[#05070a] text-gray-100 selection:bg-yellow-500 selection:text-black">
      {/* Navigation Bar */}
      <Header />

      {/* Main Container */}
      <main class="space-y-4">
        {/* Hero Section with Interactive 3D Trophy Showcase */}
        <Hero />

        {/* Key Milestone Counters */}
        <MilestoneCounters />

        {/* Detailed Career Statistics */}
        <StatsTable />

        {/* Records & Iconic Innings Showcase */}
        <RecordsShowcase />

        {/* Biography & Honours */}
        <BiographySection />

        {/* Google Drive Workspace Storage */}
        <GoogleDriveSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
