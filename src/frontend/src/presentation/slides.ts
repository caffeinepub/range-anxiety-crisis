export interface Slide {
  id: number;
  title: string;
  content: string[];
  type: 'title' | 'content' | 'visual' | 'impact';
}

export const presentationSlides: Slide[] = [
  {
    id: 0,
    title: 'Range Anxiety Crisis',
    content: [
      'A Software-First Solution',
      'Eliminating EV range anxiety without increasing battery capacity',
      'Deployable within 12 months at ≤₹15,000/vehicle',
    ],
    type: 'title',
  },
  {
    id: 1,
    title: 'Problem Statement',
    content: [
      'Major EV manufacturer reports significant customer attrition',
      'Exit interviews reveal three critical pain points:',
      '• Stranding risk (especially at night on highways)',
      '• Range estimate divergence from real-world experience',
      '• Long-trip uncertainty despite nominal range ratings',
      'Prior measures (larger batteries, infrastructure, warranties) have not resolved concerns',
    ],
    type: 'content',
  },
  {
    id: 2,
    title: 'Key Insights',
    content: [
      'Root cause: Perceived stranding risk, not actual range limitation',
      'Estimate divergence: 300 km claimed vs. real-world variance (temperature, speed, AC)',
      'Behavioral variance: ±15% driving style, ±10% AC, ±8% payload',
      'Software-first opportunity: Address anxiety through calibrated estimates, trip planning, and coaching',
      'Feasibility: Compatible with existing 40 kWh / 300 km architecture',
    ],
    type: 'content',
  },
  {
    id: 3,
    title: 'Our Solution: Three-Module System',
    content: [
      '1. Uncertainty-Aware Range Estimation',
      '   → Real-time calibration with confidence bands (best/typical/worst)',
      '2. Confidence Trip Planning with Charging Buffers',
      '   → Optimized charging stops with conservative buffers (10-15%)',
      '3. Proactive Coaching & Contingency Recommendations',
      '   → Real-time guidance (speed, AC, preconditioning) + fallback plans',
    ],
    type: 'content',
  },
  {
    id: 4,
    title: 'Prototype Demonstration',
    content: [
      'Interactive demo shows:',
      '• Uncertainty-aware range with confidence scoring',
      '• Real-time impact of temperature, speed, payload, AC',
      '• Proactive recommendations when confidence drops',
      '• Conservative buffering for high-risk scenarios',
      'All calculations transparent and deterministic',
    ],
    type: 'visual',
  },
  {
    id: 5,
    title: 'Expected Impact',
    content: [
      'Range estimate accuracy: +20-30% (reduced error)',
      'Stranding incidents: -40-50% (proactive coaching)',
      'Long-trip confidence: +25-35% (trip planning)',
      'Effective range: +10-20% in high-risk scenarios',
      'Customer retention: Projected +15-20% (reduced anxiety-driven churn)',
    ],
    type: 'impact',
  },
  {
    id: 6,
    title: 'Operational Feasibility',
    content: [
      'Timeline: 12 months (Q1: Development, Q2: Integration, Q3: Validation, Q4: Rollout)',
      'Compatibility: Software-only, no major hardware redesign',
      'Deployment: OTA update to existing fleet',
      'Infrastructure: Leverages existing CAN bus sensors + charger network APIs',
      'Scalability: Cloud-based services, linear cost scaling',
    ],
    type: 'content',
  },
  {
    id: 7,
    title: 'Cost Breakdown',
    content: [
      'Software development & testing: ₹8,000',
      'Cloud services (3 years): ₹4,000',
      'OTA update infrastructure: ₹2,000',
      'Integration & validation: ₹1,000',
      'Total per vehicle: ₹15,000',
      'Within constraint, primarily software licensing + cloud services',
    ],
    type: 'content',
  },
  {
    id: 8,
    title: 'Risks & Assumptions',
    content: [
      'Assumptions:',
      '• CAN bus provides necessary sensor data',
      '• Charger APIs provide real-time availability (85-90% accuracy)',
      '• Customer adoption rate 70%+ within first year',
      'Risks & Mitigations:',
      '• Inaccurate charger data → Conservative buffering (always +10-15%)',
      '• Integration delays → Phased deployment approach',
    ],
    type: 'content',
  },
  {
    id: 9,
    title: 'What-If Defensibility',
    content: [
      'System handles edge cases:',
      '• Charger offline → Reroute + buffer adjustment',
      '• Traffic jam → AC reduction + alternative route',
      '• Cold weather → Preconditioning + speed coaching',
      '• Aggressive driving → Real-time feedback + charging stop',
      'Conservative buffer strategy prevents stranding even in worst-case scenarios',
    ],
    type: 'content',
  },
  {
    id: 10,
    title: 'Summary',
    content: [
      'Software-first solution addresses root cause of range anxiety',
      'Three modules: Uncertainty estimation, trip planning, proactive coaching',
      'Deployable within 12 months at ≤₹15,000/vehicle',
      'Compatible with existing 40 kWh / 300 km architecture',
      'Expected impact: -40-50% stranding, +20-30% estimate accuracy',
      'Defensible against edge cases with conservative buffering',
    ],
    type: 'content',
  },
];
