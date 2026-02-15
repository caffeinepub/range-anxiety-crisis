import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function AnimatedRoadHero() {
  const scrollToNext = () => {
    const element = document.getElementById('problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/road-backdrop-night.dim_1920x600.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Eliminating Range Anxiety
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A software-first solution to materially reduce EV range anxiety without increasing battery
            capacity
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => scrollToNext()} className="gap-2">
              Explore Solution
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('demo');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </section>
  );
}
