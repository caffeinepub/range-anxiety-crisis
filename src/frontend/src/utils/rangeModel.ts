interface RangeInputs {
  distance: number;
  temperature: number;
  drivingStyle: 'eco' | 'normal' | 'sport';
  payload: number;
  acUsage: boolean;
}

interface RangeResult {
  predictedRange: number;
  worstCase: number;
  bestCase: number;
  confidence: number;
  recommendations: Array<{ type: 'info' | 'warning'; message: string }>;
}

const BASE_RANGE = 300; // 40 kWh battery, 300 km claimed range

export function calculateRangeConfidence(inputs: RangeInputs): RangeResult {
  let rangeMultiplier = 1.0;
  let uncertaintyFactor = 0.1; // Base 10% uncertainty
  const recommendations: Array<{ type: 'info' | 'warning'; message: string }> = [];

  // Temperature impact
  if (inputs.temperature < 0) {
    rangeMultiplier *= 0.75; // -25% in freezing
    uncertaintyFactor += 0.1;
    recommendations.push({
      type: 'warning',
      message: 'Cold weather detected. Precondition battery before departure to recover 5-8% efficiency.',
    });
  } else if (inputs.temperature < 10) {
    rangeMultiplier *= 0.85; // -15% in cold
    uncertaintyFactor += 0.05;
  } else if (inputs.temperature > 35) {
    rangeMultiplier *= 0.8; // -20% in extreme heat
    uncertaintyFactor += 0.08;
    recommendations.push({
      type: 'warning',
      message: 'High temperature increases AC load. Consider reducing cabin cooling to extend range.',
    });
  }

  // Driving style impact
  if (inputs.drivingStyle === 'sport') {
    rangeMultiplier *= 0.85; // -15% aggressive
    uncertaintyFactor += 0.05;
    recommendations.push({
      type: 'warning',
      message: 'Aggressive driving detected. Reducing speed by 10-15 km/h can extend range by 10-15%.',
    });
  } else if (inputs.drivingStyle === 'eco') {
    rangeMultiplier *= 1.1; // +10% eco
    uncertaintyFactor -= 0.02;
    recommendations.push({
      type: 'info',
      message: 'Eco driving mode active. Optimal efficiency achieved.',
    });
  }

  // Payload impact
  const payloadFactor = 1 - (inputs.payload - 1) * 0.02; // -2% per additional person
  rangeMultiplier *= payloadFactor;
  if (inputs.payload >= 4) {
    uncertaintyFactor += 0.03;
    recommendations.push({
      type: 'info',
      message: 'High payload detected. Plan for 8-10% reduced range.',
    });
  }

  // AC usage impact
  if (inputs.acUsage) {
    rangeMultiplier *= 0.92; // -8% with AC
    uncertaintyFactor += 0.02;
  }

  const predictedRange = Math.round(BASE_RANGE * rangeMultiplier);
  const worstCase = Math.round(predictedRange * (1 - uncertaintyFactor));
  const bestCase = Math.round(predictedRange * (1 + uncertaintyFactor * 0.5));

  // Calculate confidence score
  const rangeBuffer = predictedRange - inputs.distance;
  let confidence = 100;

  if (rangeBuffer < 0) {
    confidence = 20; // Cannot complete trip
    recommendations.push({
      type: 'warning',
      message: 'Insufficient range. Add a charging stop or reduce trip distance.',
    });
  } else if (rangeBuffer < 30) {
    confidence = 50; // Very tight
    recommendations.push({
      type: 'warning',
      message: 'Low safety margin. Recommend adding a charging stop for 15% buffer.',
    });
  } else if (rangeBuffer < 60) {
    confidence = 70; // Moderate
    recommendations.push({
      type: 'info',
      message: 'Moderate confidence. Consider conservative driving to maintain buffer.',
    });
  } else {
    confidence = 90; // Good buffer
    recommendations.push({
      type: 'info',
      message: 'High confidence. Sufficient range with comfortable safety margin.',
    });
  }

  // Adjust confidence based on uncertainty
  confidence = Math.round(confidence * (1 - uncertaintyFactor * 0.5));

  return {
    predictedRange,
    worstCase,
    bestCase,
    confidence: Math.max(20, Math.min(95, confidence)),
    recommendations,
  };
}
