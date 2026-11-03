import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/common/Navbar';
import { CloudReveal } from './components/common/CloudReveal';
import { GreetingCreator } from './components/common/GreetingCreator';
import { DhanterasPage } from './components/dhanteras/DhanterasPage';
import { DiwaliPage } from './components/diwali/DiwaliPage';
import { ShareModal } from './components/common/ShareModal';
import { Footer } from './components/common/Footer';
import { FestiveParticles } from './components/common/FestiveParticles';
import { getPageFromUrl, getSenderFromUrl, generateGreetingUrl } from './utils/url';
import { initGA, trackPageView, trackGreetingCreated, trackShareButtonClicked } from './utils/analytics';
import { FESTIVAL_DATA } from './config/brand';

// Initialize GA once on module load — safe even if ID is missing (no-op)
initGA();

function buildPageTitle(route: 'dhanteras' | 'diwali' | 'home'): string {
  if (route === 'dhanteras') return 'ASAI LABS — Shubh Dhanteras Greeting';
  if (route === 'diwali')    return 'ASAI LABS — Shubh Diwali Greeting';
  return 'ASAI LABS — Festive Greeting Creator';
}

export const App: React.FC = () => {
  // Routes: 'dhanteras' | 'diwali' | 'home'
  const [currentRoute, setCurrentRoute] = useState<'dhanteras' | 'diwali' | 'home'>('home');
  const [senderName, setSenderName] = useState<string>('');
  const [hasSenderFromUrl, setHasSenderFromUrl] = useState<boolean>(false);
  const [isCinematicActive, setIsCinematicActive] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');

  // Parse path and query parameters
  const parseCurrentUrl = useCallback(() => {
    if (typeof window === 'undefined') return;

    const route = getPageFromUrl();
    const cleanSender = getSenderFromUrl();

    setCurrentRoute(route);

    if (cleanSender) {
      setSenderName(cleanSender);
      setHasSenderFromUrl(true);
      setIsCinematicActive(true);
      const targetFestival = route === 'home' ? 'diwali' : route;
      setShareUrl(generateGreetingUrl(targetFestival, cleanSender));
    } else {
      setHasSenderFromUrl(false);
      setSenderName('');
      if (route !== 'home') {
        setShareUrl(generateGreetingUrl(route, FESTIVAL_DATA[route].defaultSender));
      }
    }

    // Track SPA page view
    trackPageView(
      buildPageTitle(route),
      window.location.pathname + window.location.search,
      route
    );
  }, []);

  useEffect(() => {
    parseCurrentUrl();

    const handlePopState = () => {
      parseCurrentUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseCurrentUrl]);

  // Navigate handler that updates URL safely without 404s
  const navigateTo = (route: 'dhanteras' | 'diwali' | 'home', sender?: string) => {
    setCurrentRoute(route);
    const sName = sender !== undefined ? sender : senderName;

    let newUrl = `${window.location.origin}/`;
    if (route !== 'home') {
      const params = new URLSearchParams();
      params.set('page', route);
      if (sName) {
        params.set('from', sName);
      }
      newUrl = `${window.location.origin}/?${params.toString()}`;
    }

    window.history.pushState({}, '', newUrl);

    // Track the navigation as a page view
    trackPageView(
      buildPageTitle(route),
      newUrl.replace(window.location.origin, ''),
      route
    );

    if (sName && route !== 'home') {
      setShareUrl(newUrl);
    } else if (route !== 'home') {
      setShareUrl(generateGreetingUrl(route, FESTIVAL_DATA[route].defaultSender));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when user submits name in GreetingCreator
  const handleGreetingCreated = (festival: 'dhanteras' | 'diwali', name: string, url: string) => {
    setSenderName(name);
    setShareUrl(url);
    setCurrentRoute(festival);
    setHasSenderFromUrl(true);
    setIsShareModalOpen(true);

    window.history.pushState({}, '', url);

    // Track custom event
    trackGreetingCreated(festival, name);

    // Track page view to festival page
    trackPageView(buildPageTitle(festival), url.replace(window.location.origin, ''), festival);
  };

  const handleReplayAnimation = () => {
    setIsCinematicActive(true);
  };

  // Determine active festival theme
  const activeFestivalType = currentRoute === 'dhanteras' ? 'dhanteras' : 'diwali';

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F7FA] font-sans relative selection:bg-[#FF8A00] selection:text-white">
      {/* Ambient background particles */}
      <FestiveParticles
        particleType={currentRoute === 'dhanteras' ? 'gold' : 'mixed'}
        density="medium"
      />

      {/* Global Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={(route) => navigateTo(route)}
        onOpenShareModal={() => {
          trackShareButtonClicked(activeFestivalType, 'navbar');
          setIsShareModalOpen(true);
        }}
      />

      {/* Cinematic Cloud Reveal Overlay */}
      {isCinematicActive && (
        <CloudReveal
          festivalType={activeFestivalType}
          senderName={senderName || FESTIVAL_DATA[activeFestivalType].defaultSender}
          onAnimationComplete={() => setIsCinematicActive(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-20">
        {/* Case 1: Creator Screen (If route is home, or user opened root without sender name) */}
        {currentRoute === 'home' && !hasSenderFromUrl ? (
          <div className="pt-24 pb-16">
            <GreetingCreator
              initialFestival="diwali"
              onGreetingCreated={handleGreetingCreated}
            />
          </div>
        ) : currentRoute === 'dhanteras' ? (
          /* Case 2: Dhanteras Dedicated Experience */
          <DhanterasPage
            senderName={senderName}
            onOpenShareModal={() => {
              trackShareButtonClicked('dhanteras', 'greeting_card');
              setIsShareModalOpen(true);
            }}
            onCreateNewGreeting={() => {
              setHasSenderFromUrl(false);
              navigateTo('home', '');
            }}
            onReplayAnimation={handleReplayAnimation}
          />
        ) : (
          /* Case 3: Diwali Dedicated Experience */
          <DiwaliPage
            senderName={senderName}
            onOpenShareModal={() => {
              trackShareButtonClicked('diwali', 'greeting_card');
              setIsShareModalOpen(true);
            }}
            onCreateNewGreeting={() => {
              setHasSenderFromUrl(false);
              navigateTo('home', '');
            }}
            onReplayAnimation={handleReplayAnimation}
          />
        )}
      </main>

      {/* Share Greeting Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        festivalType={activeFestivalType}
        senderName={senderName || FESTIVAL_DATA[activeFestivalType].defaultSender}
        shareUrl={shareUrl || generateGreetingUrl(activeFestivalType, senderName || 'A Friend')}
      />

      {/* Global Footer */}
      <Footer onNavigate={(route) => navigateTo(route)} />
    </div>
  );
};

export default App;
