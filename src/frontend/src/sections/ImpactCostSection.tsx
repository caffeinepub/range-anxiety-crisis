import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Clock, Shield } from 'lucide-react';

export function ImpactCostSection() {
  const impactMetrics = [
    {
      icon: TrendingUp,
      label: 'Range Estimate Accuracy',
      value: '+20-30%',
      description: 'Reduction in estimation error through calibrated uncertainty bands',
    },
    {
      icon: Shield,
      label: 'Stranding Incidents',
      value: '-40-50%',
      description: 'Fewer roadside strandings through proactive coaching and contingencies',
    },
    {
      icon: TrendingUp,
      label: 'Long-Trip Confidence',
      value: '+25-35%',
      description: 'Increased trip completion confidence with charging stop planning',
    },
    {
      icon: TrendingUp,
      label: 'Effective Range',
      value: '+10-20%',
      description: 'Extended range in high-risk scenarios through behavioral coaching',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Expected Impact & Cost</h2>
          <p className="text-lg text-muted-foreground">
            Prototype-estimated outcomes and high-level feasibility within stated constraints
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3">
                  <metric.icon className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="text-3xl font-bold text-chart-2">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-1">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-chart-1" />
                <CardTitle>Cost Breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Software Development & Testing</span>
                <Badge variant="outline">₹8,000</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cloud Services (3 years)</span>
                <Badge variant="outline">₹4,000</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OTA Update Infrastructure</span>
                <Badge variant="outline">₹2,000</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Integration & Validation</span>
                <Badge variant="outline">₹1,000</Badge>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="font-semibold">Total per Vehicle</span>
                <Badge className="text-base">₹15,000</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-chart-3" />
                <CardTitle>Implementation Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Months 1-3: Development</span>
                  <Badge variant="secondary">Q1</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Core algorithm development, UI/UX design, initial testing
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Months 4-6: Integration</span>
                  <Badge variant="secondary">Q2</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Vehicle system integration, calibration, pilot testing
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Months 7-9: Validation</span>
                  <Badge variant="secondary">Q3</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Real-world validation, refinement, regulatory compliance
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Months 10-12: Rollout</span>
                  <Badge variant="secondary">Q4</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  OTA deployment, customer onboarding, monitoring
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 max-w-5xl mx-auto bg-muted/50">
          <CardHeader>
            <CardTitle>Key Assumptions & Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Assumptions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Existing vehicle CAN bus provides necessary sensor data</li>
                  <li>• OTA update infrastructure is available or can be added within budget</li>
                  <li>• Charger network APIs provide real-time availability data</li>
                  <li>• Customer adoption rate of 70%+ within first year</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Risks & Mitigations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Risk: Inaccurate charger data → Mitigation: Conservative buffering</li>
                  <li>• Risk: Customer resistance → Mitigation: Gradual rollout with education</li>
                  <li>• Risk: Integration delays → Mitigation: Phased deployment approach</li>
                  <li>• Risk: Regulatory approval → Mitigation: Early engagement with authorities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
