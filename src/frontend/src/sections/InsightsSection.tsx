import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetInsights } from '../hooks/useQueries';
import { fallbackInsights } from '../content/fallbackContent';
import { Lightbulb } from 'lucide-react';

export function InsightsSection() {
  const { data: backendInsights, isLoading } = useGetInsights();
  const insights = backendInsights && backendInsights.length > 0 ? backendInsights : fallbackInsights;

  return (
    <section id="insights" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-1/10 text-chart-1 mb-4">
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm font-medium">Data-Driven Analysis</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Key Insights</h2>
          <p className="text-lg text-muted-foreground">
            Synthesis of customer feedback, vehicle parameters, and constraint analysis reveals actionable
            opportunities to reduce range anxiety without hardware changes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {insights.map((insight, index) => (
            <Card key={Number(insight.id)} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{insight.summary}</p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground">{insight.implications}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
