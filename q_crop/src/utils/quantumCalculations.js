/**
 * Quantum mathematical helper routines for frontend simulation
 */

// Calculate simulated VQE energy minimum for crop yield prediction equation
export const simulateQuantumYield = (inputs) => {
  const {
    cropType = 'wheat',
    soilMoisture = 45,
    nitrogen = 120,
    phosphorus = 40,
    potassium = 60,
    rainfall = 650,
    temperature = 22,
    circuitDepth = 8,
    quantumBackend = 'ibm_heron'
  } = inputs;

  // Base yields by crop type (tons per hectare)
  const baseYields = {
    wheat: 4.2,
    corn: 9.8,
    soybeans: 3.5,
    rice: 5.6,
    barley: 4.8,
    cotton: 2.9
  };

  const base = baseYields[cropType] || 4.5;

  // Multipliers based on ag inputs
  const moistureFactor = 1 - Math.abs(soilMoisture - 50) * 0.008;
  const nutrientFactor = Math.min(1.2, (nitrogen * 0.4 + phosphorus * 0.3 + potassium * 0.3) / 80);
  const climateFactor = 1 - Math.abs(temperature - 21) * 0.015 + (rainfall / 1000) * 0.1;

  // Quantum enhancement simulation based on circuit depth & backend fidelity
  const backendFidelity = {
    ibm_heron: 0.994,
    rigetti_ankaa: 0.988,
    ionq_aria: 0.997,
    quantinuum_h2: 0.998,
    simulator: 0.999
  }[quantumBackend] || 0.99;

  // Depth bonus: Higher circuit depth captures non-linear climate interactions better
  const quantumDepthBonus = Math.log2(circuitDepth + 1) * 0.04 * backendFidelity;

  // Classical ML vs Quantum yield prediction calculation
  const classicalYield = base * moistureFactor * nutrientFactor * climateFactor;
  const quantumYield = classicalYield * (1 + quantumDepthBonus);

  // Confidence interval calculation
  const confidenceScore = Math.min(99.4, (88 + (circuitDepth * 0.8) + (backendFidelity * 10)));
  const uncertaintyMargin = (100 - confidenceScore) * 0.03;

  return {
    quantumYield: parseFloat(quantumYield.toFixed(2)),
    classicalYield: parseFloat(classicalYield.toFixed(2)),
    yieldGain: parseFloat(((quantumYield - classicalYield) / classicalYield * 100).toFixed(1)),
    confidenceScore: parseFloat(confidenceScore.toFixed(1)),
    lowerBound: parseFloat((quantumYield - uncertaintyMargin).toFixed(2)),
    upperBound: parseFloat((quantumYield + uncertaintyMargin).toFixed(2)),
    circuitFidelity: backendFidelity,
    simulatedGateCount: circuitDepth * 24,
    coherenceUsedMs: Math.round(circuitDepth * 1.8)
  };
};

// Generate simulated quantum state histogram data
export const generateQubitStateDistribution = (qubits = 4) => {
  const totalStates = Math.pow(2, qubits);
  const distribution = [];
  let sum = 0;

  for (let i = 0; i < totalStates; i++) {
    const binaryStr = i.toString(2).padStart(qubits, '0');
    // Seed ground state with higher probability
    const prob = i === 0 ? 0.35 + Math.random() * 0.1 : Math.random() * (0.65 / (totalStates - 1));
    distribution.push({ state: `|${binaryStr}⟩`, probability: prob });
    sum += prob;
  }

  // Normalize
  return distribution.map(item => ({
    ...item,
    probability: parseFloat((item.probability / sum).toFixed(4))
  }));
};
