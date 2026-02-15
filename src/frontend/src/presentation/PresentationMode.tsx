import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { presentationSlides } from './slides';
import { ChevronLeft, ChevronRight, Presentation, Maximize2 } from 'lucide-react';
import { UncertaintyBandChart } from '../components/UncertaintyBandChart';

export function PresentationMode() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    if (currentSlide < presentationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = presentationSlides[currentSlide];

  const SlideContent = () => (
    <div className="h-full flex flex-col">
      {/* Slide Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2" />
          <span className="font-semibold">Range Confidence Solution</span>
        </div>
        <Badge variant="outline">
          {currentSlide + 1} / {presentationSlides.length}
        </Badge>
      </div>

      {/* Slide Body */}
      <div className="flex-1 p-12 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>

          {slide.type === 'title' && (
            <div className="space-y-6 text-center">
              {slide.content.map((line, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'text-3xl font-semibold' : 'text-xl text-muted-foreground'}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {slide.type === 'content' && (
            <div className="space-y-4">
              {slide.content.map((line, index) => (
                <p
                  key={index}
                  className={
                    line.startsWith('•')
                      ? 'text-lg text-muted-foreground ml-6'
                      : line.startsWith(' ')
                        ? 'text-base text-muted-foreground ml-12'
                        : 'text-xl font-medium'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {slide.type === 'visual' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {slide.content.map((line, index) => (
                  <p
                    key={index}
                    className={
                      line.startsWith('•')
                        ? 'text-lg text-muted-foreground ml-6'
                        : 'text-xl font-medium'
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
              <Card className="mt-8">
                <CardContent className="p-6">
                  <UncertaintyBandChart predicted={270} worstCase={240} bestCase={300} distance={250} />
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-chart-2">300 km</p>
                      <p className="text-sm text-muted-foreground">Best Case</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">270 km</p>
                      <p className="text-sm text-muted-foreground">Predicted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-destructive">240 km</p>
                      <p className="text-sm text-muted-foreground">Worst Case</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slide.type === 'impact' && (
            <div className="grid md:grid-cols-2 gap-6">
              {slide.content.map((line, index) => {
                const [label, value] = line.split(':');
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <p className="text-3xl font-bold text-chart-2 mb-2">
                        {value?.trim() || label}
                      </p>
                      <p className="text-sm text-muted-foreground">{value ? label : ''}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex items-center justify-between p-6 border-t border-border/40">
        <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="flex gap-1">
          {presentationSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === presentationSlides.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  return (
    <section id="presentation" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-5/10 text-chart-5 mb-4">
            <Presentation className="h-4 w-4" />
            <span className="text-sm font-medium">Executive Presentation</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">5-Minute Executive Deck</h2>
          <p className="text-lg text-muted-foreground mb-8">
            A comprehensive presentation covering problem framing, solution approach, feasibility, impact, and
            defensibility.
          </p>

          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Maximize2 className="h-4 w-4" />
                Open Presentation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] h-[95vh] p-0">
              <SlideContent />
            </DialogContent>
          </Dialog>
        </div>

        {/* Slide Preview Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {presentationSlides.map((s, index) => (
            <Card
              key={s.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setCurrentSlide(index);
                setIsFullscreen(true);
              }}
            >
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  Slide {index + 1}
                </Badge>
                <p className="font-semibold text-sm line-clamp-2">{s.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
