import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  AlertCircle,
  Info,
  Sprout,
  CloudSun,
  FlaskConical,
  BarChart2,
  ShieldAlert,
  Sparkles,
  ServerOff,
  Tractor,
  CheckCircle2,
  Printer,
  Calendar,
  IndianRupee,
  TrendingUp,
  MapPin,
  HelpCircle,
  Layers,
  HardDrive
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { getFarmProfile, convertFarmArea } from '../utils/farmStorage';

// Benchmark reference yield per hectare (tonnes/ha) by crop type
const CROP_YIELD_BENCHMARKS = {
  Wheat: { min: 4.2, max: 5.2, qPerAcreMin: 17.0, qPerAcreMax: 21.0, durationDays: 135, defaultMsp: 2275, defaultCostPerAcre: 18000 },
  Paddy: { min: 4.5, max: 6.0, qPerAcreMin: 18.2, qPerAcreMax: 24.3, durationDays: 125, defaultMsp: 2300, defaultCostPerAcre: 20000 },
  Maize: { min: 3.8, max: 5.0, qPerAcreMin: 15.4, qPerAcreMax: 20.2, durationDays: 105, defaultMsp: 2225, defaultCostPerAcre: 16000 },
  Cotton: { min: 2.0, max: 3.2, qPerAcreMin: 8.1, qPerAcreMax: 13.0, durationDays: 160, defaultMsp: 7121, defaultCostPerAcre: 22000 },
  Sugarcane: { min: 70.0, max: 90.0, qPerAcreMin: 283.0, qPerAcreMax: 364.0, durationDays: 330, defaultMsp: 340, defaultCostPerAcre: 45000 }
};

const DEFAULT_PLANNER_FORM = {
  cropType: 'Wheat',
  variety: 'HD-2967',
  farmArea: '4.5',
  areaUnit: 'Acres',
  region: 'Ludhiana, Punjab',
  sowingDate: '2026-11-05',
  irrigation: 'Fully Irrigated',
  soilPh: '6.8',
  soilNitrogen: '120',
  rainfall: '450',
  temperature: '21',
  expectedPricePerQ: '2275',
  costPerAcre: '18000'
};

export const PredictYield = () => {
  const [formData, setFormData] = useState(DEFAULT_PLANNER_FORM);
  const [farmProfile, setFarmProfile] = useState(null);
  const [prefilledNotice, setPrefilledNotice] = useState(false);

  useEffect(() => {
    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // If crop changes, update default MSP & cost per acre
      if (field === 'cropType' && CROP_YIELD_BENCHMARKS[value]) {
        updated.expectedPricePerQ = String(CROP_YIELD_BENCHMARKS[value].defaultMsp);
        updated.costPerAcre = String(CROP_YIELD_BENCHMARKS[value].defaultCostPerAcre);
      }
      return updated;
    });
  };

  const handlePrefillFromProfile = () => {
    if (!farmProfile) return;

    let matchedCrop = 'Wheat';
    const cStr = farmProfile.crop.toLowerCase();
    if (cStr.includes('paddy') || cStr.includes('rice')) matchedCrop = 'Paddy';
    else if (cStr.includes('wheat')) matchedCrop = 'Wheat';
    else if (cStr.includes('maize')) matchedCrop = 'Maize';
    else if (cStr.includes('cotton')) matchedCrop = 'Cotton';
    else if (cStr.includes('sugarcane')) matchedCrop = 'Sugarcane';

    let matchedIrr = 'Fully Irrigated';
    if (farmProfile.irrigationMethod.toLowerCase().includes('rainfed')) matchedIrr = 'Rainfed Only';

    setFormData((prev) => ({
      ...prev,
      cropType: matchedCrop,
      variety: farmProfile.variety || prev.variety,
      farmArea: farmProfile.farmArea || prev.farmArea,
      areaUnit: farmProfile.areaUnit || prev.areaUnit,
      region: `${farmProfile.district}, ${farmProfile.state}`,
      sowingDate: farmProfile.sowingDate || prev.sowingDate,
      irrigation: matchedIrr,
      expectedPricePerQ: String(CROP_YIELD_BENCHMARKS[matchedCrop]?.defaultMsp || 2275),
      costPerAcre: String(CROP_YIELD_BENCHMARKS[matchedCrop]?.defaultCostPerAcre || 18000)
    }));

    setPrefilledNotice(true);
    setTimeout(() => setPrefilledNotice(false), 3500);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PLANNER_FORM);
  };

  const handlePrint = () => {
    window.print();
  };

  // CALCULATIONS
  const cropBenchmark = CROP_YIELD_BENCHMARKS[formData.cropType] || CROP_YIELD_BENCHMARKS.Wheat;
  const areaNum = parseFloat(formData.farmArea) || 1.0;

  // Convert area to acres for calculation if needed
  let areaInAcres = areaNum;
  if (formData.areaUnit === 'Hectares') areaInAcres = areaNum * 2.471;
  else if (formData.areaUnit === 'Bigha') areaInAcres = areaNum * 0.2066;
  else if (formData.areaUnit === 'Guntha') areaInAcres = areaNum * 0.025;

  // Irrigation factor
  let irrFactor = 1.0;
  if (formData.irrigation === 'Partially Irrigated') irrFactor = 0.85;
  else if (formData.irrigation === 'Rainfed Only') irrFactor = 0.68;

  // Yield ranges
  const minYieldTha = (cropBenchmark.min * irrFactor).toFixed(1);
  const maxYieldTha = (cropBenchmark.max * irrFactor).toFixed(1);

  const minQPerAcre = (cropBenchmark.qPerAcreMin * irrFactor).toFixed(1);
  const maxQPerAcre = (cropBenchmark.qPerAcreMax * irrFactor).toFixed(1);

  const totalMinQ = (areaInAcres * parseFloat(minQPerAcre)).toFixed(1);
  const totalMaxQ = (areaInAcres * parseFloat(maxQPerAcre)).toFixed(1);

  const totalMinTonnes = (parseFloat(totalMinQ) / 10).toFixed(2);
  const totalMaxTonnes = (parseFloat(totalMaxQ) / 10).toFixed(2);

  // Harvest Window Calculation
  const sowingDateObj = new Date(formData.sowingDate || '2026-11-05');
  const harvestStartObj = new Date(sowingDateObj.getTime() + (cropBenchmark.durationDays - 5) * 86400000);
  const harvestEndObj = new Date(sowingDateObj.getTime() + (cropBenchmark.durationDays + 10) * 86400000);

  const formatDateShort = (d) => {
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const harvestWindowText = `${formatDateShort(harvestStartObj)} - ${formatDateShort(harvestEndObj)}`;

  // Financial Revenue & Profit Calculations
  const pricePerQ = parseFloat(formData.expectedPricePerQ) || cropBenchmark.defaultMsp;
  const costPerAcreNum = parseFloat(formData.costPerAcre) || cropBenchmark.defaultCostPerAcre;

  const minRevenue = Math.round(parseFloat(totalMinQ) * pricePerQ);
  const maxRevenue = Math.round(parseFloat(totalMaxQ) * pricePerQ);

  const totalOperationalCost = Math.round(areaInAcres * costPerAcreNum);

  const minProfit = minRevenue - totalOperationalCost;
  const maxProfit = maxRevenue - totalOperationalCost;

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Sample Demo Mode Banner (Hidden when printing) */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs print:hidden">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">Sample Yield Calculation & Harvest Preview Mode: </span>
            The yield ranges, production totals, and revenue projections below represent sample planning benchmarks. They are not personalized live predictions until a validated AI prediction model API is connected.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm">
          Sample Harvest Preview
        </StatusBadge>
      </div>

      {/* Page Header (Hidden when printing) */}
      <div className="print:hidden">
        <PageHeader
          title="Yield & Harvest Planner (फसल पैदावार एवं कटाई योजना)"
          subtitle="Plan your expected harvest output, total production range, expected harvest window, and financial revenue estimates."
          breadcrumb={['Quantum Farming', 'Yield Planner']}
          icon={Calculator}
          actions={
            <div className="flex items-center space-x-2">
              <PrimaryButton variant="outline" size="sm" onClick={handlePrint} icon={Printer}>
                Print Harvest Plan
              </PrimaryButton>
            </div>
          }
        />
      </div>

      {/* Prefill from Saved Farm Banner */}
      {farmProfile && (
        <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs print:hidden">
          <div className="flex items-center space-x-2.5">
            <Tractor className="w-5 h-5 text-[#26734D] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">
              Saved Farm Profile: <strong>{farmProfile.crop}</strong> ({farmProfile.district}, {farmProfile.state})
            </span>
          </div>
          <PrimaryButton variant="primary" size="sm" onClick={handlePrefillFromProfile} icon={Tractor}>
            Prefill Planner from My Farm
          </PrimaryButton>
        </div>
      )}

      {prefilledNotice && (
        <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center space-x-2 text-xs font-bold shadow-xs print:hidden">
          <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
          <span>Form prefilled with your saved farm crop, area, location, and sowing date!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT EDITABLE FORM COLUMN (6 cols - Hidden when printing) */}
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <SectionCard title="1. Farm, Crop & Economic Parameters" icon={Sprout}>
            <div className="space-y-4">
              {/* SECTION A: CROP & LAND */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#26734D] uppercase tracking-wider">
                  Crop & Land Parameters
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cropType" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Target Crop <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="cropType"
                      value={formData.cropType}
                      onChange={(e) => handleInputChange('cropType', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
                    >
                      <option value="Wheat">Wheat (गेहूं)</option>
                      <option value="Paddy">Paddy / Rice (धान)</option>
                      <option value="Maize">Maize (मक्का)</option>
                      <option value="Cotton">Cotton (कपास)</option>
                      <option value="Sugarcane">Sugarcane (गन्ना)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="variety" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Crop Variety (किसम)
                    </label>
                    <input
                      id="variety"
                      type="text"
                      value={formData.variety}
                      onChange={(e) => handleInputChange('variety', e.target.value)}
                      placeholder="e.g. HD-2967 / PR-126"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="farmArea" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Farm Area <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="farmArea"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={formData.farmArea}
                      onChange={(e) => handleInputChange('farmArea', e.target.value)}
                      placeholder="e.g. 4.5"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="areaUnit" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Area Unit <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="areaUnit"
                      value={formData.areaUnit}
                      onChange={(e) => handleInputChange('areaUnit', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    >
                      <option value="Acres">Acres (एकड़)</option>
                      <option value="Hectares">Hectares (हेक्टेयर)</option>
                      <option value="Bigha">Bigha (बीघा)</option>
                      <option value="Guntha">Guntha (गुंठा)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label htmlFor="region" className="block text-xs font-semibold text-[#172B22] mb-1">
                      District & State
                    </label>
                    <input
                      id="region"
                      type="text"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      placeholder="e.g. Ludhiana, Punjab"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="sowingDate" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Sowing / Planting Date
                    </label>
                    <input
                      id="sowingDate"
                      type="date"
                      value={formData.sowingDate}
                      onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: IRRIGATION, SOIL & WEATHER */}
              <div className="pt-3 border-t border-[#E0E8E1] space-y-3">
                <h4 className="text-xs font-bold text-[#26734D] uppercase tracking-wider">
                  Irrigation, Soil & Weather Inputs
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="irrigation" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Irrigation Method
                    </label>
                    <select
                      id="irrigation"
                      value={formData.irrigation}
                      onChange={(e) => handleInputChange('irrigation', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    >
                      <option value="Fully Irrigated">Fully Irrigated (Canal / Tube well)</option>
                      <option value="Partially Irrigated">Partially Irrigated</option>
                      <option value="Rainfed Only">Rainfed Only (Monsoon dependent)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="soilPh" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Soil pH Level
                    </label>
                    <input
                      id="soilPh"
                      type="number"
                      step="0.1"
                      value={formData.soilPh}
                      onChange={(e) => handleInputChange('soilPh', e.target.value)}
                      placeholder="e.g. 6.8"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="soilNitrogen" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Soil Nitrogen (N - kg/ha)
                    </label>
                    <input
                      id="soilNitrogen"
                      type="number"
                      value={formData.soilNitrogen}
                      onChange={(e) => handleInputChange('soilNitrogen', e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="rainfall" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Seasonal Rainfall (mm)
                    </label>
                    <input
                      id="rainfall"
                      type="number"
                      value={formData.rainfall}
                      onChange={(e) => handleInputChange('rainfall', e.target.value)}
                      placeholder="e.g. 450"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: ECONOMICS & MARKET PRICES */}
              <div className="pt-3 border-t border-[#E0E8E1] space-y-3">
                <h4 className="text-xs font-bold text-[#26734D] uppercase tracking-wider">
                  Market Price & Expense Estimation
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expectedPricePerQ" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Expected Selling Price (₹ / Quintal)
                    </label>
                    <input
                      id="expectedPricePerQ"
                      type="number"
                      value={formData.expectedPricePerQ}
                      onChange={(e) => handleInputChange('expectedPricePerQ', e.target.value)}
                      placeholder="e.g. 2275"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Govt MSP benchmark: ₹{cropBenchmark.defaultMsp}/Q</p>
                  </div>

                  <div>
                    <label htmlFor="costPerAcre" className="block text-xs font-semibold text-[#172B22] mb-1">
                      Operational Cost (₹ / Acre)
                    </label>
                    <input
                      id="costPerAcre"
                      type="number"
                      value={formData.costPerAcre}
                      onChange={(e) => handleInputChange('costPerAcre', e.target.value)}
                      placeholder="e.g. 18000"
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    />
                    <p className="text-[11px] text-[#718078] mt-0.5">Includes seed, labor & water</p>
                  </div>
                </div>
              </div>

              {/* Reset Action */}
              <div className="pt-4 border-t border-[#E0E8E1] flex justify-end">
                <PrimaryButton variant="outline" size="sm" onClick={handleReset} icon={RotateCcw}>
                  Reset Defaults
                </PrimaryButton>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT HARVEST PLANNER OUTPUT (6 cols or Full Width when printing) */}
        <div className="lg:col-span-6 print:col-span-12 space-y-6">
          <SectionCard
            title="Harvest & Production Plan Summary"
            subtitle={`Calculated for ${formData.cropType} (${formData.variety || 'Standard'}) across ${formData.farmArea} ${formData.areaUnit}`}
            icon={BarChart2}
            action={<StatusBadge variant="success">Planning Forecast</StatusBadge>}
          >
            <div className="space-y-6">
              {/* 1. YIELD RANGE CARD */}
              <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase font-extrabold text-[#718078] tracking-wider">
                    Expected Yield Range
                  </span>
                  <StatusBadge variant="neutral" size="sm">Standard Benchmark</StatusBadge>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#172B22]">
                    {minYieldTha} - {maxYieldTha}
                  </span>
                  <span className="text-sm font-bold text-[#26734D]">t / ha</span>
                </div>

                <p className="text-xs font-semibold text-[#123D2A]">
                  Equivalent to ~{minQPerAcre} - {maxQPerAcre} Quintals per acre
                </p>
              </div>

              {/* 2. TOTAL PRODUCTION & HARVEST WINDOW GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-[#E0E8E1] bg-white space-y-1 shadow-xs">
                  <span className="text-[#718078] font-bold block uppercase tracking-wider text-[10px]">
                    Estimated Total Farm Production
                  </span>
                  <span className="text-xl font-extrabold text-[#172B22] block">
                    {totalMinQ} - {totalMaxQ} Q
                  </span>
                  <p className="text-[11px] text-[#718078]">
                    (~{totalMinTonnes} - {totalMaxTonnes} Tonnes total)
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E0E8E1] bg-white space-y-1 shadow-xs">
                  <span className="text-[#718078] font-bold block uppercase tracking-wider text-[10px]">
                    Expected Harvest Window
                  </span>
                  <span className="text-base font-extrabold text-[#26734D] block">
                    {harvestWindowText}
                  </span>
                  <p className="text-[11px] text-[#718078]">
                    Duration: ~{cropBenchmark.durationDays} days from sowing
                  </p>
                </div>
              </div>

              {/* 3. SEPARATED REVENUE & PROFIT ANALYSIS */}
              <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] space-y-3 shadow-xs">
                <h4 className="text-xs font-bold text-[#172B22] uppercase tracking-wider flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-[#26734D]" />
                  Financial Revenue & Profit Estimate
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                    <span className="text-[#718078] block text-[11px]">Estimated Gross Revenue</span>
                    <span className="text-base font-bold text-[#172B22]">
                      {formatCurrency(minRevenue)} - {formatCurrency(maxRevenue)}
                    </span>
                    <p className="text-[10px] text-[#718078] mt-0.5">Based on ₹{pricePerQ}/Q</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9]">
                    <span className="text-[#1B5E20] block text-[11px]">Estimated Net Profit</span>
                    <span className="text-base font-extrabold text-[#1B5E20]">
                      {formatCurrency(minProfit)} - {formatCurrency(maxProfit)}
                    </span>
                    <p className="text-[10px] text-[#1B5E20] mt-0.5">Less {formatCurrency(totalOperationalCost)} cost</p>
                  </div>
                </div>

                <p className="text-[11px] text-[#718078] italic">
                  Note: Revenue and profit estimates depend on actual market mandi prices and weather during harvest.
                </p>
              </div>

              {/* 4. KEY ASSUMPTIONS & RISK UNCERTAINTY FACTORS */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                  <span className="font-bold text-[#123D2A] block">Key Agronomic Assumptions:</span>
                  <ul className="space-y-1 list-disc list-inside text-[#718078]">
                    <li>Timely CRI stage irrigation and balanced basal fertilizer application.</li>
                    <li>Normal weather conditions during flowering and grain filling.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF8E1] border border-[#FFE082] space-y-1 text-[#B76E00]">
                  <span className="font-bold text-[#172B22] block flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#B76E00]" />
                    Factors That Could Change Yield:
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-[#7A4900]">
                    <li>Unseasonal heat waves during March (terminal heat stress) can reduce grain weight by 10-15%.</li>
                    <li>Standing waterlogging or severe Yellow Rust infection without timely fungicide spray.</li>
                  </ul>
                </div>
              </div>

              {/* Plain Language Summary Explanation */}
              <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] text-xs space-y-1">
                <h4 className="font-bold">Plain Language Summary (सरल भाषा व्याख्या)</h4>
                <p className="text-[#718078] leading-relaxed">
                  Based on {formData.farmArea} {formData.areaUnit} of {formData.cropType} sown on {formData.sowingDate}, your expected harvest output is approximately <strong>{totalMinQ} to {totalMaxQ} Quintals</strong> between <strong>{harvestWindowText}</strong>.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default PredictYield;
