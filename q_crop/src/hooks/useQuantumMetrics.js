import { useState, useEffect } from 'react';
import { QUANTUM_BACKENDS } from '../data/mockData';

export const useQuantumMetrics = () => {
  const [backends, setBackends] = useState(QUANTUM_BACKENDS);
  const [activeJobs, setActiveJobs] = useState(14);
  const [avgCoherenceT1, setAvgCoherenceT1] = useState(184.2); // microseconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuation in live quantum telemetry
      setActiveJobs(prev => Math.max(8, prev + Math.floor(Math.random() * 5) - 2));
      setAvgCoherenceT1(prev => parseFloat((184 + (Math.random() * 4 - 2)).toFixed(1)));
      
      setBackends(prev =>
        prev.map(backend => ({
          ...backend,
          latency: backend.id === 'simulator' ? '5ms' : `${Math.floor(15 + Math.random() * 50)}ms`
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return {
    backends,
    activeJobs,
    avgCoherenceT1,
    systemStatus: 'Optimal (All Quantum Nodes Synced)'
  };
};
