import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UncertaintyBandChart } from '../components/UncertaintyBandChart';
import { calculateRangeConfidence } from '../utils/rangeModel';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function RangeConfidenceDemoSection() {
  const [distance, setDistance] = useState(250);
  const [temperature, setTemperature] = useState(20);
  const [drivingStyle, setDrivingStyle] = useState<'eco' | 'normal' | 'sport'>('normal');
  const [payload, setPayload] = useState(2);
  const [acUsage, setAcUsage] = useState(true);

  const result = calculateRangeConfidence({
    distance,
    temperature,
    drivingStyle,
    payload,
    acUsage,
  });

  return (
    <section id="demo" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-3/10 text-chart-3 mb-4">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Interactive Prototype</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Range Confidence Demo</h2>
          <p className="text-lg text-muted-foreground">
            Simulate a trip and see how our system provides uncertainty-aware range estimation, confidence
            scoring, and proactive recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Parameters</CardTitle>
              <CardDescription>Adjust the inputs to see how they affect range confidence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Trip Distance</Label>
                  <span className="text-sm font-medium">{distance} km</span>
                </div>
                <Slider
                  value={[distance]}
                  onValueChange={(v) => setDistance(v[0])}
                  min={50}
                  max={400}
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Outside Temperature</Label>
                  <span className="text-sm font-medium">{temperature}°C</span>
                </div>
                <Slider
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                  min={-10}
                  max={40}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Driving Style</Label>
                <Select value={drivingStyle} onValueChange={(v: any) => setDrivingStyle(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eco">Eco (60-80 km/h)</SelectItem>
                    <SelectItem value="normal">Normal (80-100 km/h)</SelectItem>
                    <SelectItem value="sport">Sport (100-120 km/h)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Passengers + Luggage</Label>
                  <span className="text-sm font-medium">{payload} people</span>
                </div>
                <Slider
                  value={[payload]}
                  onValueChange={(v) => setPayload(v[0])}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ac-usage">Air Conditioning</Label>
                <Switch id="ac-usage" checked={acUsage} onCheckedChange={setAcUsage} />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Range Confidence Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <Badge
                      variant={result.confidence >= 80 ? 'default' : result.confidence >= 60 ? 'secondary' : 'destructive'}
                    >
                      {result.confidence}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        result.confidence >= 80
                          ? 'bg-chart-2'
                          : result.confidence >= 60
                            ? 'bg-chart-4'
                            : 'bg-destructive'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>

                <UncertaintyBandChart
                  predicted={result.predictedRange}
                  worstCase={result.worstCase}
                  bestCase={result.bestCase}
                  distance={distance}
                />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-chart-2">{result.bestCase}</p>
                    <p className="text-xs text-muted-foreground">Best Case</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{result.predictedRange}</p>
                    <p className="text-xs text-muted-foreground">Predicted</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-destructive">{result.worstCase}</p>
                    <p className="text-xs text-muted-foreground">Worst Case</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <Alert key={index} variant={rec.type === 'warning' ? 'destructive' : 'default'}>
                    {rec.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    <AlertDescription>{rec.message}</AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
