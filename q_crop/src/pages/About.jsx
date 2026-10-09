import React from 'react';
import {
  Info,
  Atom,
  Globe,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Target,
  Workflow,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { StatusBadge } from '../components/common/StatusBadge';

export const About = () => {
  const techStack = [
    {
      name: 'React 19',
      category: 'Frontend UI Framework',
      description: 'Declarative component architecture for building responsive, accessible farmer advisory dashboards.',
      status: 'Implemented Frontend',
      statusType: 'success',
      icon: Code2
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'Frontend Application Logic',
      description: 'Client-side state management, interactive parameter validation, and user interaction handling.',
      status: 'Implemented Frontend',
      statusType: 'success',
      icon: Code2
    },
    {
      name: 'Recharts',
      category: 'Data Visualization',
      description: 'Composable charting library for rendering crop yield comparisons, monsoon rainfall trends, and land share.',
      status: 'Implemented Frontend',
      statusType: 'success',
      icon: Layers
    },
    {
      name: 'Python 3.11',
      category: 'Backend & Data Processing',
      description: 'Proposed backend language for numerical analysis, soil parameter calculation, and pipeline execution.',
      status: 'Proposed Backend Architecture',
      statusType: 'neutral',
      icon: Cpu
    },
    {
      name: 'Scikit-learn',
      category: 'Classical Machine Learning',
      description: 'Proposed baseline ML framework for Random Forest and XGBoost yield prediction benchmarks.',
      status: 'Proposed Backend Architecture',
      statusType: 'neutral',
      icon: Cpu
    },
    {
      name: 'PennyLane / Qiskit',
      category: 'Quantum Circuit Simulation',
      description: 'Proposed quantum framework for Variational Quantum Eigensolver (VQE) ansatz construction & execution.',
      status: 'Proposed Quantum Engine',
      statusType: 'lime',
      icon: Atom
    }
  ];

  return (
    <div className="space-y-8">
      {/* Demonstration Banner */}
      <div className="p-4 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">Project Demonstration: </span>
            This application is a practical farmer-assistance web platform prototype designed to demonstrate crop yield calculation tools, agronomic advisories, and data visualizations for Indian agriculture.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm" icon={BookOpen}>
          Academic & Farmer Concept
        </StatusBadge>
      </div>

      {/* Page Header */}
      <PageHeader
        title="About Quantum Farming (किसान सहायता प्रोजेक्ट)"
        subtitle="Smarter Predictions. Better Harvests. A practical farmer-assistance platform exploring data-driven decisions."
        breadcrumb={['Quantum Farming', 'About Platform']}
        icon={Info}
        actions={
          <StatusBadge variant="neutral" icon={ShieldCheck}>
            Project Scope Specification
          </StatusBadge>
        }
      />

      {/* Overview & Problem Statement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Overview */}
        <SectionCard title="Project Overview" icon={Globe}>
          <div className="space-y-3 text-xs sm:text-sm text-[#718078] leading-relaxed">
            <p>
              <strong className="text-[#172B22]">Quantum Farming</strong> is a practical farmer-assistance web application designed to help farmers in India make data-driven agricultural decisions.
            </p>
            <p>
              The platform provides crop yield calculators, soil nutrient guidance (N-P-K), irrigation timing recommendations, and seasonal rainfall visualizations for Paddy, Wheat, Maize, Cotton, and Sugarcane.
            </p>
          </div>
        </SectionCard>

        {/* Problem Statement */}
        <SectionCard title="Problem Statement" icon={AlertTriangle}>
          <div className="space-y-3 text-xs sm:text-sm text-[#718078] leading-relaxed">
            <p>
              Farmers in India face unpredictable monsoon rainfall patterns, soil degradation, and unbalanced fertilizer application. Many smallholder farmers lack access to simple, plain-language digital tools that evaluate expected crop yields based on soil and weather inputs.
            </p>
            <p>
              Sub-optimal crop choices and improper fertilizer dosing lead to lower harvest output and higher input costs.
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Main Objectives */}
      <SectionCard title="Main Project Objectives" icon={Target}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
            <div className="w-6 h-6 rounded bg-[#E8F5E9] text-[#123D2A] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-[#172B22]">Accessible Farmer UI</h4>
            <p className="text-[#718078] text-[11px]">
              Build a plain-language, mobile-friendly interface suited for Indian agricultural users.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
            <div className="w-6 h-6 rounded bg-[#E8F5E9] text-[#123D2A] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-[#172B22]">Soil & Crop Advisory</h4>
            <p className="text-[#718078] text-[11px]">
              Structure practical fertilizer (N-P-K), irrigation, and pest management guidelines for major crops.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
            <div className="w-6 h-6 rounded bg-[#E8F5E9] text-[#123D2A] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-[#172B22]">Interactive Calculators</h4>
            <p className="text-[#718078] text-[11px]">
              Provide validated input forms to calculate crop yield estimates based on field parameters.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5">
            <div className="w-6 h-6 rounded bg-[#E8F5E9] text-[#123D2A] flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="font-bold text-[#172B22]">Algorithm Exploration</h4>
            <p className="text-[#718078] text-[11px]">
              Investigate classical ML and experimental quantum-enhanced computing methods for yield modeling.
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Proposed Methodology & Workflow Pipeline */}
      <SectionCard title="Proposed System Architecture & Workflow" icon={Workflow}>
        <div className="space-y-4 text-xs">
          <p className="text-[#718078]">
            The system combines user input validation, data visualization, and proposed Python API execution:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-mono text-[10px] text-[#26734D] font-bold">STEP 1</span>
              <h5 className="font-bold text-[#172B22]">Farmer Input</h5>
              <p className="text-[11px] text-[#718078]">
                Farmer enters crop type, region, soil nitrogen, rainfall, and temperature parameters.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-mono text-[10px] text-[#26734D] font-bold">STEP 2</span>
              <h5 className="font-bold text-[#172B22]">Preprocessing</h5>
              <p className="text-[11px] text-[#718078]">
                Validate inputs on the client side against reasonable agronomic ranges.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-mono text-[10px] text-[#26734D] font-bold">STEP 3</span>
              <h5 className="font-bold text-[#172B22]">Backend Execution</h5>
              <p className="text-[11px] text-[#718078]">
                Send request payload to Python backend for classical ML or quantum simulation model inference.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-mono text-[10px] text-[#26734D] font-bold">STEP 4</span>
              <h5 className="font-bold text-[#172B22]">Advisory Output</h5>
              <p className="text-[11px] text-[#718078]">
                Display expected yield output, confidence metrics, and agronomic field advice.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Technology Stack Display */}
      <SectionCard title="Technology Stack Architecture" icon={Code2}>
        <div className="space-y-3">
          <p className="text-xs text-[#718078]">
            Below is the technical stack distinguishing currently implemented frontend modules from proposed future backend/quantum engines:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech) => {
              const TechIcon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-[#F5F8F4] text-[#123D2A] border border-[#E0E8E1]">
                        <TechIcon className="w-4 h-4" />
                      </div>
                      <StatusBadge variant={tech.statusType} size="sm">
                        {tech.status}
                      </StatusBadge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#172B22]">{tech.name}</h4>
                      <p className="text-[11px] font-medium text-[#26734D]">{tech.category}</p>
                    </div>

                    <p className="text-xs text-[#718078] leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* Expected Benefits & Current Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expected Benefits */}
        <SectionCard title="Expected Project Benefits" icon={CheckCircle2}>
          <ul className="space-y-2 text-xs text-[#718078]">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#26734D] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">Practical Decision Support:</strong> Provides farmers with accessible yield calculators and fertilizer dosing advice.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#26734D] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">Input Optimization:</strong> Helps prevent excess nitrogen fertilizer usage by tailoring recommendations to soil test levels.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#26734D] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">Climate Awareness:</strong> Visualizes monsoon rainfall trends to help farmers plan sowing dates effectively.</span>
            </li>
          </ul>
        </SectionCard>

        {/* Current Limitations */}
        <SectionCard title="Current Project Limitations" icon={AlertTriangle}>
          <ul className="space-y-2 text-xs text-[#718078]">
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#B76E00] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">Frontend Demo Mode:</strong> The application currently runs in client-side demonstration mode. No live prediction API is connected.</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#B76E00] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">Sample Datasets:</strong> Charts and regional figures use sample illustrative datasets for demonstration.</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#B76E00] shrink-0 mt-0.5" />
              <span><strong className="text-[#172B22]">General Guidance:</strong> Agronomic guides are general reference benchmarks, not custom farm soil laboratory tests.</span>
            </li>
          </ul>
        </SectionCard>
      </div>

      {/* Future Scope & Conclusion */}
      <SectionCard title="Future Technical Roadmap" icon={Sparkles}>
        <div className="space-y-3 text-xs sm:text-sm text-[#718078] leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
              <strong className="text-[#123D2A] block mb-1">1. Python API Backend</strong>
              Connect a Python FastAPI backend to serve Scikit-learn Random Forest regression model inference.
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
              <strong className="text-[#123D2A] block mb-1">2. Local Language Support</strong>
              Add multi-language support (Hindi, Punjabi, Marathi, Telugu, Tamil) for better accessibility across Indian farming regions.
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
              <strong className="text-[#123D2A] block mb-1">3. Live Weather API Integration</strong>
              Fetch real-time IMD monsoon rainfall forecasts and automatic temperature updates based on user location.
            </div>
          </div>

          <div className="pt-2 border-t border-[#E0E8E1] mt-4">
            <p className="italic text-[#172B22] text-xs">
              "Quantum Farming aims to empower farmers with accessible digital tools, turning environmental data into actionable agricultural guidance."
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default About;
