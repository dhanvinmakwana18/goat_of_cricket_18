import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MilestoneCounters } from './components/MilestoneCounters';
import { BiographySection } from './components/BiographySection';
import { MilestoneCalendarPortal } from './components/MilestoneCalendarPortal';
import { GoogleDriveSection } from './components/GoogleDriveSection';
import { Footer } from './components/Footer';
import { SubpageHoverTrigger } from './components/SubpageHoverTrigger';

// Subpage Components
import { ChronologySubpage } from './components/subpages/ChronologySubpage';
import { CenturyArchivesSubpage } from './components/subpages/CenturyArchivesSubpage';
import { BiomechanicsSubpage } from './components/subpages/BiomechanicsSubpage';
import { RivalryMatrixSubpage } from './components/subpages/RivalryMatrixSubpage';
import { TrophyVaultSubpage } from './components/subpages/TrophyVaultSubpage';
import { StatBotSubpage } from './components/subpages/StatBotSubpage';

type SubpageType = 'chronology' | 'centuries' | 'biomechanics' | 'rivalries' | 'trophies' | 'statbot' | null;

export default function App() {
  const [activeSubpage, setActiveSubpage] = useState<SubpageType>(null);

  return (
    <div className="min-h-screen bg-[#06070a] text-[#F5F5F5] selection:bg-[#d3122a] selection:text-white font-body">
      {/* Navigation Header with Direct Teleport Portal HUD */}
      <Header onOpenSubpage={(subpage) => setActiveSubpage(subpage)} />

      {/* Main Streamlined High-Impact Cinematic Homepage */}
      <main className="space-y-12 pb-16">
        {/* Hero Showcase Section */}
        <Hero />

        {/* Core Career Telemetry Counters */}
        <MilestoneCounters />

        {/* TELEPORT PIPELINE GRID: 5 Dedicated Subpage Portals */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
          <div className="border-l-2 border-[#d3122a] pl-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#d3122a] uppercase font-bold block">
              SYSTEM WARP PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight text-white">
              King's Subpage Telemetry Hubs
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Select or hover any subpage portal to instantly launch deep-dive telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PORTAL 01: Chronology & Peak Analytics */}
            <SubpageHoverTrigger
              portalCode="PORTAL-01"
              badgeText="CAREER CHRONOLOGY MATRIX"
              title="01. Career Chronology & Peak Analytics"
              subtitle="Launch complete year-by-year format statistics, season-vs-season comparisons, and peak performance analysis."
              themeColor="crimson"
              onTrigger={() => setActiveSubpage('chronology')}
            />

            {/* PORTAL 02: Century Archives */}
            <SubpageHoverTrigger
              portalCode="PORTAL-02"
              badgeText="80 CENTURIES ARCHIVE"
              title="02. Century Archives & Innings Vault"
              subtitle="Query and filter all 80 international centuries by format, opposition, run chase targets, and wagon wheel shot distributions."
              themeColor="red"
              onTrigger={() => setActiveSubpage('centuries')}
            />

            {/* PORTAL 03: Biomechanics & Cover Drive Lab */}
            <SubpageHoverTrigger
              portalCode="PORTAL-03"
              badgeText="BIOMECHANICS & KINEMATICS"
              title="03. Technique & Biomechanics Lab"
              subtitle="Explore cover drive contact kinematics, wrist snap torque, sweet spot accuracy, and chase acceleration physics."
              themeColor="cyan"
              onTrigger={() => setActiveSubpage('biomechanics')}
            />

            {/* PORTAL 04: Rivalry Matrix */}
            <SubpageHoverTrigger
              portalCode="PORTAL-04"
              badgeText="BOWLER & NATION RIVALRIES"
              title="04. Rivalry Matrix & Head-To-Head"
              subtitle="Inspect head-to-head duels against Anderson, Zampa, Starc, and Cummins alongside nation-vs-nation record statistics."
              themeColor="purple"
              onTrigger={() => setActiveSubpage('rivalries')}
            />
          </div>

          {/* PORTALS 05 & 06: Trophy Vault & Grounded AI StatBot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SubpageHoverTrigger
              portalCode="PORTAL-05"
              badgeText="WORLD CHAMPION TROPHY VAULT"
              title="05. High-Impact Trophy Vault & Record Sanctum"
              subtitle="Access the CWC World Cup, Champions Trophy, T20 World Cup, ICC Test Maces, and world-record run velocity telemetry."
              themeColor="emerald"
              onTrigger={() => setActiveSubpage('trophies')}
            />

            <SubpageHoverTrigger
              portalCode="PORTAL-06"
              badgeText="REAL-TIME ICC & WIKIPEDIA RAG"
              title="06. Grounded AI StatBot (Hybrid Vector Search)"
              subtitle="Query any statistical question grounded in real-time Wikipedia REST and official ICC record feeds using text-embedding-004."
              themeColor="crimson"
              onTrigger={() => setActiveSubpage('statbot')}
            />
          </div>
        </section>

        {/* Biography & Iconic Legacy */}
        <BiographySection />

        {/* Google Calendar Milestone Sync Portal */}
        <MilestoneCalendarPortal />

        {/* Google Drive Workspace File Sync */}
        <GoogleDriveSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Active Subpage Overlay Portals */}
      {activeSubpage === 'chronology' && (
        <ChronologySubpage onClose={() => setActiveSubpage(null)} />
      )}
      {activeSubpage === 'centuries' && (
        <CenturyArchivesSubpage onClose={() => setActiveSubpage(null)} />
      )}
      {activeSubpage === 'biomechanics' && (
        <BiomechanicsSubpage onClose={() => setActiveSubpage(null)} />
      )}
      {activeSubpage === 'rivalries' && (
        <RivalryMatrixSubpage onClose={() => setActiveSubpage(null)} />
      )}
      {activeSubpage === 'trophies' && (
        <TrophyVaultSubpage onClose={() => setActiveSubpage(null)} />
      )}
      {activeSubpage === 'statbot' && (
        <StatBotSubpage onClose={() => setActiveSubpage(null)} />
      )}
    </div>
  );
}

