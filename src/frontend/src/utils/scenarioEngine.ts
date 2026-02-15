interface ScenarioResult {
  confidence: number;
  predicted: number;
  worstCase: number;
  bestCase: number;
  buffer: number;
  actions: Array<{ priority: 'high' | 'medium' | 'low'; message: string }>;
}

export function applyScenario(scenarioId: number): ScenarioResult {
  const baseRange = 300;

  switch (scenarioId) {
    case 0: // Charger Offline
      return {
        confidence: 65,
        predicted: 280,
        worstCase: 240,
        bestCase: 310,
        buffer: 15,
        actions: [
          {
            priority: 'high',
            message: 'Reroute to alternative charger 12 km ahead. Reduce speed to 85 km/h.',
          },
          {
            priority: 'medium',
            message: 'Minimize AC usage to conserve 5-8% additional range.',
          },
        ],
      };

    case 1: // Traffic Jam
      return {
        confidence: 70,
        predicted: 270,
        worstCase: 245,
        bestCase: 295,
        buffer: 10,
        actions: [
          {
            priority: 'medium',
            message: 'Stop-and-go traffic detected. Reduce AC to extend range.',
          },
          {
            priority: 'low',
            message: 'Alternative route available with 8 min delay but smoother flow.',
          },
        ],
      };

    case 2: // Cold Night Highway
      return {
        confidence: 55,
        predicted: 220,
        worstCase: 170,
        bestCase: 260,
        buffer: 20,
        actions: [
          {
            priority: 'high',
            message: 'Add charging stop at 140 km mark. Precondition battery now.',
          },
          {
            priority: 'high',
            message: 'Reduce highway speed to 90 km/h to maintain safe buffer.',
          },
        ],
      };

    case 3: // Inaccurate Charger Data
      return {
        confidence: 75,
        predicted: 290,
        worstCase: 250,
        bestCase: 320,
        buffer: 15,
        actions: [
          {
            priority: 'medium',
            message: 'Primary charger confidence: 85%. Fallback charger identified 8 km away.',
          },
          {
            priority: 'low',
            message: 'Plan for +15% buffer to account for potential unavailability.',
          },
        ],
      };

    case 4: // Aggressive Driving
      return {
        confidence: 60,
        predicted: 250,
        worstCase: 210,
        bestCase: 280,
        buffer: 12,
        actions: [
          {
            priority: 'high',
            message: 'High consumption detected. Reduce speed by 15 km/h to extend range 12-15%.',
          },
          {
            priority: 'medium',
            message: 'Consider adding charging stop if speed cannot be reduced.',
          },
        ],
      };

    case 5: // High Payload
      return {
        confidence: 72,
        predicted: 275,
        worstCase: 245,
        bestCase: 300,
        buffer: 10,
        actions: [
          {
            priority: 'medium',
            message: 'Full load detected. Plan for 8-10% reduced range.',
          },
          {
            priority: 'low',
            message: 'Maintain moderate speed (80-90 km/h) for optimal efficiency.',
          },
        ],
      };

    default:
      return {
        confidence: 85,
        predicted: 300,
        worstCase: 270,
        bestCase: 330,
        buffer: 10,
        actions: [
          {
            priority: 'low',
            message: 'Normal conditions. Maintain current driving pattern.',
          },
        ],
      };
  }
}
