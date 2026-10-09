import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
  ShieldCheck,
  Tractor,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
  MapPin
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { getFarmProfile } from '../utils/farmStorage';

const SAMPLE_SOIL_CARD = {
  labName: 'District Soil Testing Laboratory (KVK Sample)',
  sampleId: 'STL-2026-8841',
  testDate: '2026-09-15',
  soilPh: '6.8',
  organicCarbon: '0.55',
  nitrogen: '120',
  phosphorus: '18',
  potassium: '165',
  zinc: '0.8',
  iron: '4.5',
  sulfur: '12',
  boron: ''
};

export const SoilHealth = () => {
  const [formData, setFormData] = useState(SAMPLE_SOIL_CARD);
  const [farmProfile, setFarmProfile] = useState(null);
  const [prefilledNotice, setPrefilledNotice] = useState(false);

  useEffect(() => {
    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(SAMPLE_SOIL_CARD);
  };

  const handleClear = () => {
    setFormData({
      labName: '',
      sampleId: '',
      testDate: '',
      soilPh: '',
      organicCarbon: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      zinc: '',
      iron: '',
      sulfur: '',
      boron: ''
    });
  };

  const handlePrefillFromProfile = () => {
    if (!farmProfile) return;
    setFormData((prev) => ({
      ...prev,
      soilPh: '6.8',
      nitrogen: '120',
      organicCarbon: '0.55'
    }));
    setPrefilledNotice(true);
    setTimeout(() => setPrefilledNotice(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Status Evaluation Helpers based on ICAR / KVK benchmarks
  const evaluatePh = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return { status: 'Missing', text: 'Not Tested', color: 'neutral' };
    if (v < 6.0) return { status: 'Acidic (अम्लीय)', text: 'Below ideal range (6.0 - 7.5). May restrict nutrient uptake.', color: 'warning' };
    if (v > 7.5) return { status: 'Alkaline (क्षारीय)', text: 'Above ideal range (6.0 - 7.5). Micronutrient availability may decrease.', color: 'warning' };
    return { status: 'Optimal (उदासीन / आदर्श)', text: 'Ideal soil acidity range for most crops.', color: 'success' };
  };

  const evaluateOC = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return { status: 'Missing', text: 'Not Tested', color: 'neutral' };
    if (v < 0.50) return { status: 'Low (कम < 0.50%)', text: 'Low soil organic matter. Organic compost/FYM recommended.', color: 'error' };
    if (v > 0.75) return { status: 'High (पर्याप्त > 0.75%)', text: 'Good organic carbon level supporting soil microbes.', color: 'success' };
    return { status: 'Medium (मध्यम 0.50-0.75%)', text: 'Moderate organic matter. Keep adding compost.', color: 'success' };
  };

  const evaluateN = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return { status: 'Missing', text: 'Not Tested', color: 'neutral' };
    if (v < 280) return { status: 'Low (कम < 280 kg/ha)', text: 'Nitrogen level is low. Split nitrogen application recommended.', color: 'warning' };
    if (v > 560) return { status: 'High (पर्याप्त > 560 kg/ha)', text: 'High nitrogen availability.', color: 'success' };
    return { status: 'Medium (मध्यम 280-560 kg/ha)', text: 'Moderate available nitrogen.', color: 'success' };
  };

  const evaluateP = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return { status: 'Missing', text: 'Not Tested', color: 'neutral' };
    if (v < 11) return { status: 'Low (कम < 11 kg/ha)', text: 'Low available phosphorus for root development.', color: 'warning' };
    if (v > 25) return { status: 'High (पर्याप्त > 25 kg/ha)', text: 'Sufficient phosphorus level.', color: 'success' };
    return { status: 'Medium (मध्यम 11-25 kg/ha)', text: 'Moderate phosphorus level.', color: 'success' };
  };

  const evaluateK = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return { status: 'Missing', text: 'Not Tested', color: 'neutral' };
    if (v < 110) return { status: 'Low (कम < 110 kg/ha)', text: 'Low potassium level affecting drought resistance.', color: 'warning' };
    if (v > 280) return { status: 'High (पर्याप्त > 280 kg/ha)', text: 'Good potassium reserve.', color: 'success' };
    return { status: 'Medium (मध्यम 110-280 kg/ha)', text: 'Moderate potassium level.', color: 'success' };
  };

  // Count missing primary test values
  const missingPrimary = [];
  if (!formData.soilPh) missingPrimary.push('Soil pH');
  if (!formData.organicCarbon) missingPrimary.push('Organic Carbon (OC)');
  if (!formData.nitrogen) missingPrimary.push('Available Nitrogen (N)');
  if (!formData.phosphorus) missingPrimary.push('Available Phosphorus (P)');
  if (!formData.potassium) missingPrimary.push('Available Potassium (K)');

  const phEval = evaluatePh(formData.soilPh);
  const ocEval = evaluateOC(formData.organicCarbon);
  const nEval = evaluateN(formData.nitrogen);
  const pEval = evaluateP(formData.phosphorus);
  const kEval = evaluateK(formData.potassium);

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Sample Data Notice Banner (Hidden when printing) */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs print:hidden">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">Educational Soil Test Interface: </span>
            Values displayed below are sample benchmark figures. We do not prescribe exact chemical fertilizer dosages from incomplete data. Consult your local Soil Testing Laboratory (STL) for official fertilizer recommendations.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm">
          Sample Soil Card
        </StatusBadge>
      </div>

      {/* Page Header (Hidden when printing) */}
      <div className="print:hidden">
        <PageHeader
          title="Soil Health Card & Nutrient Analyzer (मृदा स्वास्थ्य कार्ड)"
          subtitle="Enter your soil lab test parameters to understand pH, organic carbon, primary N-P-K nutrients, and micronutrient status."
          breadcrumb={['Quantum Farming', 'Soil Health']}
          icon={FlaskConical}
          actions={
            <div className="flex items-center space-x-2">
              <PrimaryButton variant="outline" size="sm" onClick={handlePrint} icon={Printer}>
                Print Soil Summary
              </PrimaryButton>
            </div>
          }
        />
      </div>

      {/* Prefill Banner */}
      {farmProfile && (
        <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs print:hidden">
          <div className="flex items-center space-x-2.5">
            <Tractor className="w-5 h-5 text-[#26734D] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">
              Saved Farm Profile: <strong>{farmProfile.soilType}</strong> ({farmProfile.district}, {farmProfile.state})
            </span>
          </div>
          <PrimaryButton variant="primary" size="sm" onClick={handlePrefillFromProfile} icon={Tractor}>
            Prefill Soil Data from My Farm
          </PrimaryButton>
        </div>
      )}

      {prefilledNotice && (
        <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center space-x-2 text-xs font-bold shadow-xs print:hidden">
          <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
          <span>Soil pH and nitrogen prefilled from your saved farm setup!</span>
        </div>
      )}

      {/* Missing Test Results Warning Banner */}
      {missingPrimary.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] flex items-start space-x-3 shadow-xs print:hidden">
          <AlertCircle className="w-5 h-5 text-[#B76E00] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-[#172B22]">Missing Primary Soil Test Results ({missingPrimary.length})</h4>
            <p className="text-[#7A4900] leading-relaxed">
              The following key soil metrics are currently un-entered: <strong>{missingPrimary.join(', ')}</strong>.
              We recommend taking a fresh soil sample to your nearest government Soil Testing Laboratory (STL) or Krishi Vigyan Kendra (KVK).
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT FORM COLUMN (6 cols - Hidden when printing) */}
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <SectionCard title="1. Enter Soil Test Card Results" icon={FlaskConical}>
            <div className="space-y-4">
              {/* Lab & Sample ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                    Lab Name / KVK Center
                  </label>
                  <input
                    type="text"
                    value={formData.labName}
                    onChange={(e) => handleInputChange('labName', e.target.value)}
                    placeholder="e.g. District Soil Testing Lab"
                    className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                    Card / Sample ID
                  </label>
                  <input
                    type="text"
                    value={formData.sampleId}
                    onChange={(e) => handleInputChange('sampleId', e.target.value)}
                    placeholder="e.g. STL-2026-8841"
                    className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                  />
                </div>
              </div>

              {/* Primary Soil Parameters */}
              <div className="pt-2 border-t border-[#E0E8E1]">
                <h4 className="text-xs font-bold text-[#26734D] uppercase tracking-wider mb-3">
                  Primary Soil Indicators (मुख्य मृदा सूचकांक)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#172B22] mb-1">
                      Soil pH Index (0 - 14)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={formData.soilPh}
                      onChange={(e) => handleInputChange('soilPh', e.target.value)}
                      placeholder="e.g. 6.8"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Ideal: 6.0 - 7.5</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B22] mb-1">
                      Organic Carbon - OC (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      value={formData.organicCarbon}
                      onChange={(e) => handleInputChange('organicCarbon', e.target.value)}
                      placeholder="e.g. 0.55"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Ideal: &gt; 0.75%</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B22] mb-1">
                      Nitrogen - N (kg/ha)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="1000"
                      value={formData.nitrogen}
                      onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Ref range: 280 - 560 kg/ha</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B22] mb-1">
                      Phosphorus - P (kg/ha)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="500"
                      value={formData.phosphorus}
                      onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                      placeholder="e.g. 18"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Ref range: 11 - 25 kg/ha</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B22] mb-1">
                      Potassium - K (kg/ha)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="1000"
                      value={formData.potassium}
                      onChange={(e) => handleInputChange('potassium', e.target.value)}
                      placeholder="e.g. 165"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Ref range: 110 - 280 kg/ha</p>
                  </div>
                </div>
              </div>

              {/* Micronutrients */}
              <div className="pt-2 border-t border-[#E0E8E1]">
                <h4 className="text-xs font-bold text-[#26734D] uppercase tracking-wider mb-3">
                  Optional Micronutrients (सूक्ष्म पोषक तत्व - ppm)
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#172B22] mb-0.5">
                      Zinc (Zn)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.zinc}
                      onChange={(e) => handleInputChange('zinc', e.target.value)}
                      placeholder="ppm"
                      className="w-full bg-white border border-[#E0E8E1] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#172B22] mb-0.5">
                      Iron (Fe)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.iron}
                      onChange={(e) => handleInputChange('iron', e.target.value)}
                      placeholder="ppm"
                      className="w-full bg-white border border-[#E0E8E1] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#172B22] mb-0.5">
                      Sulfur (S)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.sulfur}
                      onChange={(e) => handleInputChange('sulfur', e.target.value)}
                      placeholder="ppm"
                      className="w-full bg-white border border-[#E0E8E1] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#172B22] mb-0.5">
                      Boron (B)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.boron}
                      onChange={(e) => handleInputChange('boron', e.target.value)}
                      placeholder="ppm"
                      className="w-full bg-white border border-[#E0E8E1] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#26734D]"
                    />
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-[#E0E8E1] flex items-center justify-end space-x-3">
                <PrimaryButton variant="ghost" size="sm" onClick={handleClear}>
                  Clear All
                </PrimaryButton>
                <PrimaryButton variant="outline" size="sm" onClick={handleReset} icon={RotateCcw}>
                  Reset Sample Card
                </PrimaryButton>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT SUMMARY COLUMN (6 cols or Full Width when printing) */}
        <div className="lg:col-span-6 print:col-span-12 space-y-6">
          <SectionCard
            title="Soil Health Evaluation Summary"
            subtitle="Analyzed against Indian ICAR & KVK soil rating benchmarks."
            icon={FileText}
            action={<StatusBadge variant="neutral">Educational Summary</StatusBadge>}
          >
            <div className="space-y-4">
              {/* Header Details */}
              <div className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#123D2A]">
                  <span>Lab: {formData.labName || 'Not Specified'}</span>
                  <span>Sample ID: {formData.sampleId || 'Demo Sample'}</span>
                </div>
                <p className="text-[#718078]">
                  Benchmark Standards: ICAR / State Agriculture Department Reference Ranges
                </p>
              </div>

              {/* Analyzed Parameters Cards */}
              <div className="space-y-2.5">
                {/* 1. Soil pH */}
                <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172B22]">Soil pH Index</span>
                    <p className="text-[11px] text-[#718078]">{phEval.text}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#172B22] block">
                      {formData.soilPh || '--'}
                    </span>
                    <StatusBadge variant={phEval.color} size="sm">
                      {phEval.status}
                    </StatusBadge>
                  </div>
                </div>

                {/* 2. Organic Carbon */}
                <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172B22]">Organic Carbon (OC %)</span>
                    <p className="text-[11px] text-[#718078]">{ocEval.text}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#172B22] block">
                      {formData.organicCarbon ? `${formData.organicCarbon}%` : '--'}
                    </span>
                    <StatusBadge variant={ocEval.color} size="sm">
                      {ocEval.status}
                    </StatusBadge>
                  </div>
                </div>

                {/* 3. Available Nitrogen */}
                <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172B22]">Available Nitrogen - N (kg/ha)</span>
                    <p className="text-[11px] text-[#718078]">{nEval.text}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#172B22] block">
                      {formData.nitrogen ? `${formData.nitrogen} kg/ha` : '--'}
                    </span>
                    <StatusBadge variant={nEval.color} size="sm">
                      {nEval.status}
                    </StatusBadge>
                  </div>
                </div>

                {/* 4. Available Phosphorus */}
                <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172B22]">Available Phosphorus - P (kg/ha)</span>
                    <p className="text-[11px] text-[#718078]">{pEval.text}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#172B22] block">
                      {formData.phosphorus ? `${formData.phosphorus} kg/ha` : '--'}
                    </span>
                    <StatusBadge variant={pEval.color} size="sm">
                      {pEval.status}
                    </StatusBadge>
                  </div>
                </div>

                {/* 5. Available Potassium */}
                <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#172B22]">Available Potassium - K (kg/ha)</span>
                    <p className="text-[11px] text-[#718078]">{kEval.text}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#172B22] block">
                      {formData.potassium ? `${formData.potassium} kg/ha` : '--'}
                    </span>
                    <StatusBadge variant={kEval.color} size="sm">
                      {kEval.status}
                    </StatusBadge>
                  </div>
                </div>
              </div>

              {/* Micronutrients Summary Bar */}
              {(formData.zinc || formData.iron || formData.sulfur || formData.boron) && (
                <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-xs">
                  <span className="font-bold text-[#123D2A] block">Micronutrients Tested:</span>
                  <div className="flex flex-wrap gap-3 text-[#172B22]">
                    {formData.zinc && <span>Zinc: <strong>{formData.zinc} ppm</strong></span>}
                    {formData.iron && <span>Iron: <strong>{formData.iron} ppm</strong></span>}
                    {formData.sulfur && <span>Sulfur: <strong>{formData.sulfur} ppm</strong></span>}
                    {formData.boron && <span>Boron: <strong>{formData.boron} ppm</strong></span>}
                  </div>
                </div>
              )}

              {/* Fertilizer Dosage & Diagnosis Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] space-y-1 text-xs">
                <h4 className="font-bold text-[#172B22]">Fertilizer Recommendation Disclaimer</h4>
                <p className="text-[#7A4900] leading-relaxed">
                  Exact chemical fertilizer quantities require a full lab report with crop yield targets.
                  Please consult your local Krishi Vigyan Kendra (KVK) or government Soil Testing Laboratory (STL) for official fertilizer dose calculations.
                </p>
              </div>

              {/* Soil Testing Laboratory Callout */}
              <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] space-y-1 text-xs print:hidden">
                <h4 className="font-bold">Need a Soil Health Test?</h4>
                <p className="text-[#718078] leading-relaxed">
                  Visit your nearest Krishi Vigyan Kendra (KVK) or District Agriculture Officer to obtain an official Soil Health Card (मृदा स्वास्थ्य कार्ड) for nominal fees.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;
