import type { Insight, SolutionFeature } from '../backend';

export const fallbackInsights: Insight[] = [
  {
    id: BigInt(0),
    title: 'Root Cause: Stranding Risk Perception',
    summary:
      'Customer feedback reveals that the fear of being stranded (especially at night on highways) is the primary driver of range anxiety, even when nominal range is sufficient.',
    implications:
      'Solution must provide real-time confidence scoring and proactive contingency planning to address perceived stranding risk without requiring larger batteries.',
  },
  {
    id: BigInt(1),
    title: 'Estimate Divergence Problem',
    summary:
      'Displayed range estimates (300 km claimed) diverge materially from real-world experience due to temperature, speed, AC usage, and payload variations not reflected in the dashboard.',
    implications:
      'Implementing uncertainty-aware range estimation with visible confidence bands can reduce estimate error by 20-30% and rebuild driver trust.',
  },
  {
    id: BigInt(2),
    title: 'Long-Trip Uncertainty',
    summary:
      'Customers report high anxiety about completing longer trips despite nominal range ratings, citing uncertainty about charging stop availability and trip time predictability.',
    implications:
      'Trip planning with charging stop confidence and buffer recommendations can materially reduce long-trip anxiety without infrastructure changes.',
  },
  {
    id: BigInt(3),
    title: 'Software-First Feasibility',
    summary:
      'Analysis shows that range anxiety can be addressed primarily through software improvements (calibrated estimates, trip planning, coaching) compatible with existing 40 kWh / 300 km architecture.',
    implications:
      'Solution can be deployed within 12 months at ≤₹15,000/vehicle cost (primarily software licensing and OTA update infrastructure) without major hardware redesign.',
  },
  {
    id: BigInt(4),
    title: 'Behavioral Variance Management',
    summary:
      'Real-world range variance is driven by controllable factors: driving style (±15%), AC usage (±10%), and payload (±8%), which customers can adjust if guided proactively.',
    implications:
      'Proactive coaching (slow down, precondition battery, reduce AC) can extend effective range by 10-20% in high-risk scenarios, reducing stranding incidents.',
  },
  {
    id: BigInt(5),
    title: 'Charging Infrastructure Perception Gap',
    summary:
      'Exit interviews show customers overestimate charging downtime and underestimate available infrastructure, leading to unnecessary anxiety even when fast charging (45 min 10-80%) is accessible.',
    implications:
      'Transparent trip planning with realistic charging time estimates and availability confidence can close the perception gap and improve trip completion confidence.',
  },
];

export const fallbackSolutionFeatures: SolutionFeature[] = [
  {
    id: BigInt(0),
    name: 'Uncertainty-Aware Range Estimation',
    description:
      'Real-time range prediction using current driving data, environmental conditions (temperature, terrain), and historical behavior. Displays confidence bands (best-case, typical, worst-case) to help drivers understand risk and plan conservatively. Calibrates continuously to reduce estimate error.',
    estimatedImpact:
      'Reduces range estimation error by 20-30%, increasing driver confidence and reducing unexpected low-battery incidents.',
  },
  {
    id: BigInt(1),
    name: 'Confidence Trip Planning with Charging Buffers',
    description:
      'Assists in planning long trips by optimizing charging stops based on real-world charging speeds (45 min fast charge), location availability, and predicted consumption patterns. Recommends conservative buffers (10-15% extra charge) for high-risk scenarios (cold weather, highway speed).',
    estimatedImpact:
      'Decreases charging-related anxiety and improves trip time predictability, reducing long-trip abandonment by 25-35%.',
  },
  {
    id: BigInt(2),
    name: 'Proactive Coaching and Contingency Recommendations',
    description:
      'Monitors real-time consumption and proactively suggests actions when confidence drops below safe thresholds: reduce speed, precondition battery, minimize AC usage, or add a charging stop. Provides contingency plans (nearest charger, safe pull-off locations) before critical battery levels.',
    estimatedImpact:
      'Extends effective range by 10-20% in high-risk scenarios and reduces roadside stranding incidents by 40-50%.',
  },
];

export const fallbackWhatIfScenarios = [
  {
    id: 0,
    name: 'Charger Offline at Planned Stop',
    description:
      'The charging station you planned to use is offline or occupied when you arrive.',
    systemResponse:
      'System detects unavailability 10 km before arrival, recalculates route with next-nearest charger, adjusts buffer recommendation (+15%), and suggests speed reduction if needed to reach alternative safely.',
    assumption:
      'Assumes real-time charger availability data (via existing networks) and conservative buffer logic to prevent stranding.',
  },
  {
    id: 1,
    name: 'Unexpected Traffic Jam (Stop-and-Go)',
    description: 'Heavy traffic reduces average speed and increases consumption due to frequent acceleration.',
    systemResponse:
      'System increases uncertainty band (+10%), recommends reducing AC usage to conserve range, and suggests alternative route if available. Updates trip plan with revised arrival time and charging buffer.',
    assumption:
      'Assumes traffic data integration (standard in mid-range vehicles) and that stop-and-go increases consumption by ~8-12%.',
  },
  {
    id: 2,
    name: 'Cold Night Highway Drive (-5°C)',
    description:
      'Driving at highway speed in cold weather significantly reduces effective range due to battery temperature and cabin heating.',
    systemResponse:
      'System displays worst-case range estimate (reduces nominal by 20-25%), recommends preconditioning battery before departure, suggests adding a charging stop, and coaches driver to reduce speed by 10-15 km/h if confidence drops below 70%.',
    assumption:
      'Assumes cold weather reduces range by 20-25% (industry standard) and that preconditioning can recover 5-8% efficiency.',
  },
  {
    id: 3,
    name: 'Inaccurate Charger Availability Data',
    description: 'Charger availability data is outdated or incorrect, leading to unexpected unavailability.',
    systemResponse:
      'System maintains conservative buffers (always plan for +10-15% extra charge) and provides fallback charger options within safe range. Alerts driver early if primary charger shows low confidence (<80% availability).',
    assumption:
      'Assumes charger data accuracy is ~85-90% and that conservative buffering prevents stranding even with data errors.',
  },
  {
    id: 4,
    name: 'Aggressive Driving Style (High Speed)',
    description: 'Driver consistently exceeds recommended speed, increasing consumption by 15-20%.',
    systemResponse:
      'System detects elevated consumption pattern, increases uncertainty band, and proactively coaches driver to reduce speed. If confidence drops below 60%, recommends adding a charging stop and displays real-time impact of speed on range.',
    assumption:
      'Assumes aggressive driving increases consumption by 15-20% and that real-time coaching can reduce speed by 10-15 km/h when needed.',
  },
  {
    id: 5,
    name: 'High Payload (4 Passengers + Luggage)',
    description: 'Vehicle is fully loaded with passengers and luggage, increasing weight and consumption.',
    systemResponse:
      'System detects increased consumption (via real-time monitoring), adjusts range estimate downward by 8-10%, and recommends conservative trip planning with additional charging buffer. Suggests reducing speed if needed to maintain confidence.',
    assumption:
      'Assumes high payload increases consumption by 8-10% and that system can detect weight via consumption patterns.',
  },
];
