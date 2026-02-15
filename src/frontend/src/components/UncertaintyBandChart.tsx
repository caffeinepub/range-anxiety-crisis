interface UncertaintyBandChartProps {
  predicted: number;
  worstCase: number;
  bestCase: number;
  distance: number;
}

export function UncertaintyBandChart({
  predicted,
  worstCase,
  bestCase,
  distance,
}: UncertaintyBandChartProps) {
  const maxRange = Math.max(bestCase, distance) + 50;
  const worstCasePercent = (worstCase / maxRange) * 100;
  const predictedPercent = (predicted / maxRange) * 100;
  const bestCasePercent = (bestCase / maxRange) * 100;
  const distancePercent = (distance / maxRange) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>0 km</span>
        <span>{maxRange} km</span>
      </div>
      <div className="relative h-16 bg-muted rounded-lg overflow-hidden">
        {/* Uncertainty band */}
        <div
          className="absolute top-0 h-full bg-gradient-to-r from-destructive/20 via-chart-4/20 to-chart-2/20"
          style={{
            left: `${worstCasePercent}%`,
            width: `${bestCasePercent - worstCasePercent}%`,
          }}
        />

        {/* Worst case marker */}
        <div
          className="absolute top-0 h-full w-1 bg-destructive"
          style={{ left: `${worstCasePercent}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-medium text-destructive whitespace-nowrap">
            {worstCase}
          </div>
        </div>

        {/* Predicted marker */}
        <div
          className="absolute top-0 h-full w-1 bg-foreground"
          style={{ left: `${predictedPercent}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
            {predicted}
          </div>
        </div>

        {/* Best case marker */}
        <div
          className="absolute top-0 h-full w-1 bg-chart-2"
          style={{ left: `${bestCasePercent}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-medium text-chart-2 whitespace-nowrap">
            {bestCase}
          </div>
        </div>

        {/* Distance marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-chart-1 opacity-50"
          style={{ left: `${distancePercent}%` }}
        >
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-chart-1 whitespace-nowrap">
            Trip: {distance}
          </div>
        </div>
      </div>
    </div>
  );
}
