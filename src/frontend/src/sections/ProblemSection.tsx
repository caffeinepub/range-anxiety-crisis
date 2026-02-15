import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, MapPin } from 'lucide-react';

export function ProblemSection() {
  const painPoints = [
    {
      icon: AlertTriangle,
      title: 'Stranding Risk',
      description:
        'Customers report being stranded on highways late at night with insufficient accessible charging infrastructure, creating fear and brand attrition.',
    },
    {
      icon: TrendingDown,
      title: 'Estimate Divergence',
      description:
        'Displayed range estimates (300 km claimed) diverge materially from real-world experience due to temperature, speed, and AC usage variations.',
    },
    {
      icon: MapPin,
      title: 'Long-Trip Uncertainty',
      description:
        'Perceived uncertainty about completing longer trips despite nominal range ratings, leading to trip abandonment and customer churn.',
    },
  ];

  return (
    <section id="problem" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The Range Anxiety Crisis</h2>
          <p className="text-lg text-muted-foreground">
            A major EV manufacturer reports significant customer attrition despite larger batteries,
            accelerated infrastructure, and warranty extensions. Exit interviews reveal three critical pain
            points:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Vehicle Profile & Constraints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Representative Parameters</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Battery capacity: ~40 kWh</li>
                    <li>• Claimed range: ~300 km</li>
                    <li>• Fast charge time: ~45 minutes (10% → 80%)</li>
                    <li>• Home charge time: ~6 hours</li>
                    <li>• Price segment: mid-range consumer vehicles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Solution Constraints</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Implementation horizon: ≤ 12 months</li>
                    <li>• Cost per vehicle: ≤ ₹15,000</li>
                    <li>• Compatible with existing architecture</li>
                    <li>• No major hardware redesigns</li>
                    <li>• Must be deployable at scale</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
