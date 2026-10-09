import React from 'react';
import {
  Atom,
  Cpu,
  Zap,
  BookOpen,
  Layers,
  Info,
  CheckCircle2,
  AlertTriangle,
  BarChart2,
  Workflow,
  Scale
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { StatusBadge } from '../components/common/StatusBadge';

export const QuantumTechnology = () => {
  const comparisonData = [
    {
      type: 'Classical Machine Learning',
      approach: 'Regression & Decision Trees (e.g. Random Forest, XGBoost)',
      hardware: 'Standard CPU / GPU Clusters',
      maturity: 'Production Ready (High)',
      benefits: 'Fast training, interpretable features, handles tabular crop data easily.',
      limitations: 'Struggles with high-dimensional non-linear weather interaction tensors.'
    },
    {
      type: 'Quantum Machine Learning',
      approach: 'Full Quantum Circuits & State Vector Mapping (QNN)',
      hardware: 'Physical QPU (Trapped-Ion / Superconducting)',
      maturity: 'Early Research Phase (Low)',
      benefits: 'Exponential state space (2^N), processes complex multi-variable interactions.',
      limitations: 'High quantum noise, decoherence, limited physical qubit counts.'
    },
    {
      type: 'Hybrid Quantum-Classical ML',
      approach: 'Classical Preprocessing + Variational Quantum Circuit (VQE / VQC)',
      hardware: 'Hybrid Classical CPU + QPU Simulator',
      maturity: 'Active Research (Medium)',
      benefits: 'Combines classical optimizers (SPSA/Adam) with quantum state encoding.',
      limitations: 'Communication overhead, NISQ quantum gate noise.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Current Project Status Notice Banner */}
      <div className="p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#B76E00] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">Project Status Notice: </span>
            This application is an interactive frontend prototype demonstrating agricultural concepts. The quantum prediction model has not been executed on physical QPU hardware yet. No claim of real-world quantum advantage is made without experimental evidence.
          </div>
        </div>
        <StatusBadge variant="warning" size="sm" icon={AlertTriangle}>
          Prototype Scope Notice
        </StatusBadge>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Science Behind the Platform (तकनीकी जानकारी)"
        subtitle="A beginner-friendly guide explaining how computers and quantum algorithms process soil & weather data to assist farmers."
        breadcrumb={['Quantum Farming', 'Science & Technology']}
        icon={Atom}
        actions={
          <StatusBadge variant="lime" icon={BookOpen}>
            Educational Guide
          </StatusBadge>
        }
      />

      {/* Section 1: Classical Machine Learning */}
      <SectionCard title="1. Classical Computing in Agriculture" icon={Cpu}>
        <div className="space-y-3 text-xs sm:text-sm text-[#718078] leading-relaxed">
          <p>
            In traditional computer science, models such as <strong className="text-[#172B22]">Linear Regression</strong> and <strong className="text-[#172B22]">Random Forest</strong> analyze historical farm records to discover mathematical patterns between field inputs and crop yield.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#123D2A] block">1. Field Inputs</span>
              <p className="text-[#718078]">Soil N-P-K, pH, temperature, seasonal rainfall, and humidity levels.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#123D2A] block">2. Pattern Learning</span>
              <p className="text-[#718078]">Algorithms evaluate relationships between soil nutrients and plant growth.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#123D2A] block">3. Yield Output</span>
              <p className="text-[#718078]">Estimated harvest output in tonnes per hectare (t/ha or Quintals/acre).</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 2: Quantum Computing Fundamentals */}
      <SectionCard title="2. Quantum Computing Basics Explained Simply" icon={Atom}>
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-[#718078]">
            Quantum computing introduces key physical principles that enable computers to evaluate complex environmental interactions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#123D2A] font-bold flex items-center justify-center text-sm font-mono">
                |ψ⟩
              </div>
              <h4 className="font-bold text-[#172B22]">Qubits & Superposition</h4>
              <p className="text-[#718078] leading-relaxed">
                Unlike regular bits (0 or 1), a qubit can exist in a superposition state α|0⟩ + β|1⟩, evaluating multiple combinations simultaneously.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#123D2A] font-bold flex items-center justify-center text-sm font-mono">
                U(θ)
              </div>
              <h4 className="font-bold text-[#172B22]">Quantum Circuits</h4>
              <p className="text-[#718078] leading-relaxed">
                Sequences of quantum logic gates (Hadamard H, rotation gates Ry) executed step-by-step on qubits to transform state vectors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#123D2A] font-bold flex items-center justify-center text-sm font-mono">
                Φ(x)
              </div>
              <h4 className="font-bold text-[#172B22]">Quantum Feature Maps</h4>
              <p className="text-[#718078] leading-relaxed">
                Functions converting soil and weather numbers into quantum state vectors |Φ(x)⟩ to capture non-linear weather interactions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#123D2A] font-bold flex items-center justify-center text-sm font-mono">
                K(x,y)
              </div>
              <h4 className="font-bold text-[#172B22]">Quantum Kernels</h4>
              <p className="text-[#718078] leading-relaxed">
                Measuring overlap K(x,y) = |⟨Φ(x)|Φ(y)⟩|² between quantum states to compare field conditions across regions.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 3: Hybrid Quantum-Classical System */}
      <SectionCard title="3. Hybrid Quantum-Classical System" icon={Layers}>
        <div className="space-y-3 text-xs sm:text-sm text-[#718078] leading-relaxed">
          <p>
            Near-term quantum computers work alongside classical computers in a <strong className="text-[#123D2A]">hybrid setup</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
              <h4 className="font-bold text-[#172B22] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#26734D]" />
                Classical Processing
              </h4>
              <p className="text-[#718078]">
                Cleans farm input data, normalizes values, and runs optimization loops (SPSA/Adam) to update parameters.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
              <h4 className="font-bold text-[#172B22] flex items-center gap-1.5">
                <Atom className="w-4 h-4 text-[#26734D]" />
                Quantum Processing
              </h4>
              <p className="text-[#718078]">
                Executes variational quantum circuits (VQE ansatz) to calculate ground state energy vectors corresponding to yield estimates.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 4: Proposed System Workflow */}
      <SectionCard title="4. Proposed System Workflow" icon={Workflow}>
        <div className="space-y-4">
          <p className="text-xs text-[#718078]">
            5-step pipeline illustrating how data moves from farm input to yield estimation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-center">
              <div className="w-6 h-6 rounded-full bg-[#123D2A] text-white flex items-center justify-center font-bold text-[10px] mx-auto">
                1
              </div>
              <h5 className="font-bold text-[#172B22]">Agri Input</h5>
              <p className="text-[11px] text-[#718078]">Soil N-P-K, pH, rainfall & temp.</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-center">
              <div className="w-6 h-6 rounded-full bg-[#123D2A] text-white flex items-center justify-center font-bold text-[10px] mx-auto">
                2
              </div>
              <h5 className="font-bold text-[#172B22]">Preprocessing</h5>
              <p className="text-[11px] text-[#718078]">Normalization & feature scaling.</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-center">
              <div className="w-6 h-6 rounded-full bg-[#123D2A] text-white flex items-center justify-center font-bold text-[10px] mx-auto">
                3
              </div>
              <h5 className="font-bold text-[#172B22]">Hybrid Model</h5>
              <p className="text-[11px] text-[#718078]">Classical ML + VQE quantum ansatz.</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-center">
              <div className="w-6 h-6 rounded-full bg-[#123D2A] text-white flex items-center justify-center font-bold text-[10px] mx-auto">
                4
              </div>
              <h5 className="font-bold text-[#172B22]">Evaluation</h5>
              <p className="text-[11px] text-[#718078]">Compute MAE, RMSE, and R² scores.</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F1F8EC] border border-[#A3D977] space-y-1 text-center">
              <div className="w-6 h-6 rounded-full bg-[#26734D] text-white flex items-center justify-center font-bold text-[10px] mx-auto">
                5
              </div>
              <h5 className="font-bold text-[#123D2A]">Yield Output</h5>
              <p className="text-[11px] text-[#123D2A]">Render output harvest estimate (t/ha).</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 5: Model Comparison Table */}
      <SectionCard title="5. Technical Model Comparison Matrix" icon={Scale}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#E0E8E1]">
            <thead className="bg-[#F5F8F4] border-b border-[#E0E8E1] text-[#172B22] font-semibold">
              <tr>
                <th className="p-3 border-r border-[#E0E8E1]">Model Approach</th>
                <th className="p-3 border-r border-[#E0E8E1]">Algorithmic Method</th>
                <th className="p-3 border-r border-[#E0E8E1]">Hardware</th>
                <th className="p-3 border-r border-[#E0E8E1]">Maturity</th>
                <th className="p-3 border-r border-[#E0E8E1]">Potential Benefits</th>
                <th className="p-3">Key Limitations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E8E1] text-[#718078]">
              {comparisonData.map((row) => (
                <tr key={row.type} className="hover:bg-[#F5F8F4]/50 transition-colors">
                  <td className="p-3 font-bold text-[#172B22] border-r border-[#E0E8E1]">{row.type}</td>
                  <td className="p-3 border-r border-[#E0E8E1]">{row.approach}</td>
                  <td className="p-3 border-r border-[#E0E8E1] font-mono text-[11px] text-[#172B22]">{row.hardware}</td>
                  <td className="p-3 border-r border-[#E0E8E1] font-medium text-[#123D2A]">{row.maturity}</td>
                  <td className="p-3 border-r border-[#E0E8E1] text-[#26734D]">{row.benefits}</td>
                  <td className="p-3 text-[#B76E00]">{row.limitations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Section 6: Evaluation Methodology */}
      <SectionCard title="6. Model Evaluation Metrics" icon={BarChart2}>
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-[#718078]">
            To compare algorithms fairly, models are evaluated on identical test datasets using standard metrics:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <h4 className="font-bold text-[#172B22]">Mean Absolute Error (MAE)</h4>
              <p className="text-[#718078] leading-relaxed">
                <span className="font-mono text-[#123D2A] font-bold">MAE = (1/n) × Σ |yᵢ - ŷᵢ|</span>. Measures average yield prediction error in tonnes per hectare (t/ha).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <h4 className="font-bold text-[#172B22]">Root Mean Squared Error (RMSE)</h4>
              <p className="text-[#718078] leading-relaxed">
                <span className="font-mono text-[#123D2A] font-bold">RMSE = √[ (1/n) × Σ (yᵢ - ŷᵢ)² ]</span>. Penalizes large outlier errors more heavily.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <h4 className="font-bold text-[#172B22]">Coefficient of Determination (R²)</h4>
              <p className="text-[#718078] leading-relaxed">
                <span className="font-mono text-[#123D2A] font-bold">R² ∈ [0.0, 1.0]</span>. Measures the proportion of crop yield variance explained by soil & weather features.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 7: Current Project Status */}
      <SectionCard title="7. Current Prototype Scope Statement" icon={Info}>
        <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-2 text-xs text-[#718078] leading-relaxed">
          <h4 className="font-bold text-[#172B22] text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
            Frontend Prototype Scope Statement
          </h4>
          <p>
            This website functions as a <strong className="text-[#172B22]">frontend demonstration prototype</strong> designed for farmers, students, and project evaluators. It presents user interface forms, data visualization dashboards, and educational concepts.
          </p>
          <p>
            No real quantum advantage or live prediction servers are deployed currently. All outputs are sample figures for demonstration purposes.
          </p>
        </div>
      </SectionCard>
    </div>
  );
};

export default QuantumTechnology;
