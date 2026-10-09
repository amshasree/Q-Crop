import React, { useEffect, useState } from 'react';
import { Cpu, Atom } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { checkBackendHealth } from '../../services/yieldPredictionService';

export const BackendStatusBadge = ({ className = '' }) => {
  const [health, setHealth] = useState({
    classicalMlStatus: 'UNAVAILABLE',
    quantumMlStatus: 'UNAVAILABLE'
  });

  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((res) => {
      if (isMounted) {
        setHealth(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
      {/* Classical ML Status */}
      <StatusBadge
        variant={health.classicalMlStatus === 'HEALTHY' ? 'success' : 'neutral'}
        size="sm"
        icon={Cpu}
      >
        Classical ML: {health.classicalMlStatus}
      </StatusBadge>

      {/* Quantum ML Status */}
      <StatusBadge
        variant={health.quantumMlStatus === 'QPU_ONLINE' ? 'lime' : 'neutral'}
        size="sm"
        icon={Atom}
      >
        Quantum QPU: {health.quantumMlStatus}
      </StatusBadge>
    </div>
  );
};

export default BackendStatusBadge;
