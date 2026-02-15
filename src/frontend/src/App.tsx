import { useEffect } from 'react';
import { useActor } from './hooks/useActor';
import { AnimatedRoadHero } from './components/AnimatedRoadHero';
import { ProblemSection } from './sections/ProblemSection';
import { InsightsSection } from './sections/InsightsSection';
import { SolutionSection } from './sections/SolutionSection';
import { RangeConfidenceDemoSection } from './sections/RangeConfidenceDemoSection';
import { ImpactCostSection } from './sections/ImpactCostSection';
import { WhatIfDefensibilitySection } from './sections/WhatIfDefensibilitySection';
import { PresentationMode } from './presentation/PresentationMode';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initializeRangeData().catch(console.error);
    }
  }, [actor]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <AnimatedRoadHero />
          <ProblemSection />
          <InsightsSection />
          <SolutionSection />
          <RangeConfidenceDemoSection />
          <ImpactCostSection />
          <WhatIfDefensibilitySection />
          <PresentationMode />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
