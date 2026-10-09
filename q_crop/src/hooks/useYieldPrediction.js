import { useState, useCallback } from 'react';
import { simulateQuantumYield } from '../utils/quantumCalculations';

export const useYieldPrediction = () => {
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    region: 'midwest',
    soilMoisture: 48,
    nitrogen: 120,
    phosphorus: 40,
    potassium: 60,
    rainfall: 650,
    temperature: 22,
    circuitDepth: 8,
    quantumBackend: 'ibm_heron'
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStep, setCalculationStep] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const runPrediction = useCallback(async () => {
    setIsCalculating(true);
    setResult(null);

    const steps = [
      'Mapping Agri-Variables to Qubit Hamiltonians...',
      'Executing Variational Quantum Eigensolver (VQE)...',
      'Applying Zero-Noise Extrapolation (ZNE) Error Mitigation...',
      'Computing Non-Linear Quantum Climate Tensor Correlations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCalculationStep(steps[i]);
      await new Promise(res => setTimeout(res, 500));
    }

    const output = simulateQuantumYield(formData);
    const newResult = {
      ...output,
      inputs: { ...formData },
      timestamp: new Date().toLocaleTimeString()
    };

    setResult(newResult);
    setHistory(prev => [newResult, ...prev.slice(0, 4)]);
    setIsCalculating(false);
    setCalculationStep('');
  }, [formData]);

  return {
    formData,
    updateForm,
    runPrediction,
    isCalculating,
    calculationStep,
    result,
    history
  };
};
