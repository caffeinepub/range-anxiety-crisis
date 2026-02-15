import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fallbackWhatIfScenarios } from '../content/fallbackContent';
import { applyScenario } from '../utils/scenarioEngine';
import { Shield, AlertTriangle } from 'lucide-react';

export function WhatIfDefensibilitySection() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const scenario = fallbackWhatIfScenarios[selectedScenario];
  const scenarioResult = applyScenario(selectedScenario);

  return (
    <section id="what-if" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-4/10 text-chart-4 mb-4">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Defensibility Analysis</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">What-If Scenarios & Q&A</h2>
          <p className="text-lg text-muted-foreground">
            Anticipating panel questions: How does the system respond to edge cases and high-risk scenarios?
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={String(selectedScenario)} onValueChange={(v) => setSelectedScenario(Number(v))}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {fallbackWhatIfScenarios.map((s, index) => (
                <TabsTrigger key={s.id} value={String(index)} className="text-xs">
                  Scenario {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {fallbackWhatIfScenarios.map((s, index) => (
              <TabsContent key={s.id} value={String(index)}>
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl mb-2">{s.name}</CardTitle>
                          <CardDescription>{s.description}</CardDescription>
                        </div>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-chart-4" />
                          System Response
                        </h4>
                        <p className="text-sm text-muted-foreground">{s.systemResponse}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <h4 className="font-semibold mb-2 text-sm">Underlying Assumption</h4>
                        <p className="text-xs text-muted-foreground">{s.assumption}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Updated Confidence Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Adjusted Confidence</span>
                          <Badge
                            variant={
                              scenarioResult.confidence >= 70
                                ? 'default'
                                : scenarioResult.confidence >= 50
                                  ? 'secondary'
                                  : 'destructive'
                            }
                          >
                            {scenarioResult.confidence}%
                          </Badge>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              scenarioResult.confidence >= 70
                                ? 'bg-chart-2'
                                : scenarioResult.confidence >= 50
                                  ? 'bg-chart-4'
                                  : 'bg-destructive'
                            }`}
                            style={{ width: `${scenarioResult.confidence}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-chart-2">{scenarioResult.bestCase}</p>
                          <p className="text-xs text-muted-foreground">Best</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold">{scenarioResult.predicted}</p>
                          <p className="text-xs text-muted-foreground">Predicted</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-destructive">{scenarioResult.worstCase}</p>
                          <p className="text-xs text-muted-foreground">Worst</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Recommended Actions</h4>
                        {scenarioResult.actions.map((action, i) => (
                          <Alert key={i} variant={action.priority === 'high' ? 'destructive' : 'default'}>
                            <AlertDescription className="text-sm">{action.message}</AlertDescription>
                          </Alert>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-chart-4/5 border border-chart-4/20">
                        <p className="text-xs font-medium mb-1">Conservative Buffer Strategy</p>
                        <p className="text-xs text-muted-foreground">
                          System maintains {scenarioResult.buffer}% safety buffer and provides fallback options
                          to prevent stranding even in worst-case scenarios.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
