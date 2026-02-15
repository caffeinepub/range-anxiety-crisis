import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGetSolutionFeatures } from '../hooks/useQueries';
import { fallbackSolutionFeatures } from '../content/fallbackContent';
import { Zap, CheckCircle2 } from 'lucide-react';

export function SolutionSection() {
  const { data: backendFeatures } = useGetSolutionFeatures();
  const features = backendFeatures && backendFeatures.length > 0 ? backendFeatures : fallbackSolutionFeatures;

  return (
    <section id="solution" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2/10 text-chart-2 mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Software-First Approach</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Our Solution</h2>
          <p className="text-lg text-muted-foreground">
            A three-module software system that materially reduces range anxiety without increasing battery
            capacity, deployable within 12 months at ≤₹15,000/vehicle.
          </p>
        </div>

        <Tabs defaultValue="0" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            {features.map((feature, index) => (
              <TabsTrigger key={Number(feature.id)} value={String(index)}>
                Module {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature, index) => (
            <TabsContent key={Number(feature.id)} value={String(index)}>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{feature.name}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      Module {index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-chart-2/5 border border-chart-2/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-chart-2 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Expected Impact</p>
                        <p className="text-sm text-muted-foreground">{feature.estimatedImpact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-2">Why it fits constraints:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Software-only implementation compatible with existing 40 kWh / 300 km architecture
                      </li>
                      <li>• Deployable via OTA update within 12 months</li>
                      <li>• Cost ≤₹15,000/vehicle (software licensing + cloud services)</li>
                      <li>• No major hardware redesign required</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
