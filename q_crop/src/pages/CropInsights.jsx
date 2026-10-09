import React, { useState, useEffect, useMemo } from 'react';
import {
  Sprout,
  Search,
  Filter,
  Info,
  Thermometer,
  CloudRain,
  Droplets,
  Sun,
  CloudSun,
  ShieldCheck,
  ChevronRight,
  FlaskConical,
  Calendar,
  AlertTriangle,
  Bug,
  Scissors,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Tractor,
  ShieldAlert,
  CameraOff
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { CROPS_REFERENCE_DATA, CROP_CATEGORIES } from '../data/crops';
import {
  ADVISORY_CROPS,
  ADVISORY_GROWTH_STAGES,
  ADVISORY_CONCERNS,
  getCropAdvisory
} from '../data/cropAdvisoryData';
import { getFarmProfile } from '../utils/farmStorage';

export const CropInsights = () => {
  // Active Tab: 'advisor' | 'reference'
  const [activeTab, setActiveTab] = useState('advisor');

  // Crop Advisor form state
  const [selectedCropId, setSelectedCropId] = useState('rice');
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('vegetative');
  const [selectedConcernId, setSelectedConcernId] = useState('yellowing');
  const [farmProfile, setFarmProfile] = useState(null);
  const [prefilledNotice, setPrefilledNotice] = useState(false);
  const [uncertainModalOpen, setUncertainModalOpen] = useState(false);

  // Reference Cards Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeModalCrop, setActiveModalCrop] = useState(null);

  // Check saved profile on mount
  useEffect(() => {
    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, []);

  const handlePrefillFromProfile = () => {
    if (!farmProfile) return;

    let matchedCropId = 'rice';
    const cropStr = farmProfile.crop.toLowerCase();
    if (cropStr.includes('rice') || cropStr.includes('paddy')) matchedCropId = 'rice';
    else if (cropStr.includes('wheat')) matchedCropId = 'wheat';
    else if (cropStr.includes('maize')) matchedCropId = 'maize';
    else if (cropStr.includes('cotton')) matchedCropId = 'cotton';
    else if (cropStr.includes('pulse') || cropStr.includes('gram')) matchedCropId = 'pulses';

    let matchedStage = 'vegetative';
    const stageStr = (farmProfile.growthStage || '').toLowerCase();
    if (stageStr.includes('germination') || stageStr.includes('seedling')) matchedStage = 'seedling';
    else if (stageStr.includes('cri') || stageStr.includes('vegetative')) matchedStage = 'vegetative';
    else if (stageStr.includes('flowering') || stageStr.includes('tiller')) matchedStage = 'flowering';
    else if (stageStr.includes('grain') || stageStr.includes('pod')) matchedStage = 'grain_filling';
    else if (stageStr.includes('mature') || stageStr.includes('harvest')) matchedStage = 'maturity';

    setSelectedCropId(matchedCropId);
    setSelectedGrowthStage(matchedStage);
    setPrefilledNotice(true);
    setTimeout(() => setPrefilledNotice(false), 3500);
  };

  // Get active crop advisory content
  const activeAdvisory = useMemo(() => {
    return getCropAdvisory(selectedCropId, selectedConcernId);
  }, [selectedCropId, selectedConcernId]);

  // Icon map for reference cards
  const iconMap = {
    Sprout,
    Droplets,
    Sun,
    CloudSun
  };

  // Filter reference crops
  const filteredCrops = useMemo(() => {
    return CROPS_REFERENCE_DATA.filter((crop) => {
      const matchesSearch =
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* General Educational Content Banner */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">General Agricultural Educational Advisory: </span>
            This advisor provides standard ICAR/KVK agronomic practices. It does not generate chemical pesticide dosages or region-specific commercial formulas.
          </div>
        </div>
        <StatusBadge variant="neutral" size="sm">
          General Educational Guide
        </StatusBadge>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Kisan Crop Advisor & Agronomic Care (फसल सलाहकार)"
        subtitle="Select your crop, growth stage, and observed concern to view recommended field checks, non-chemical actions, and expert help triggers."
        breadcrumb={['Quantum Farming', 'Crop Advisor']}
        icon={Sprout}
        actions={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'advisor'
                  ? 'bg-[#123D2A] text-white shadow-xs'
                  : 'bg-white text-[#718078] border border-[#E0E8E1] hover:text-[#172B22]'
              }`}
            >
              Interactive Crop Advisor
            </button>
            <button
              onClick={() => setActiveTab('reference')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reference'
                  ? 'bg-[#123D2A] text-white shadow-xs'
                  : 'bg-white text-[#718078] border border-[#E0E8E1] hover:text-[#172B22]'
              }`}
            >
              Crop Reference Library
            </button>
          </div>
        }
      />

      {/* TAB 1: INTERACTIVE CROP ADVISOR */}
      {activeTab === 'advisor' && (
        <div className="space-y-6">
          {/* Prefill from My Farm Banner */}
          {farmProfile && (
            <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-2.5">
                <Tractor className="w-5 h-5 text-[#26734D] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">
                  Saved Farm Profile: <strong>{farmProfile.crop}</strong> ({farmProfile.district}, {farmProfile.state})
                </span>
              </div>
              <PrimaryButton variant="primary" size="sm" onClick={handlePrefillFromProfile} icon={Tractor}>
                Prefill Advisor from My Farm
              </PrimaryButton>
            </div>
          )}

          {prefilledNotice && (
            <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center space-x-2 text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
              <span>Selected crop and growth stage prefilled from your saved farm setup!</span>
            </div>
          )}

          {/* Interactive Selection Toolbar */}
          <SectionCard
            title="Step 1: Select Your Crop, Growth Stage & Concern"
            subtitle="Choose parameters to generate targeted agronomic guidance."
            icon={Filter}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Select Crop */}
              <div>
                <label className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1.5">
                  1. Target Crop (फसल)
                </label>
                <select
                  value={selectedCropId}
                  onChange={(e) => setSelectedCropId(e.target.value)}
                  className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
                >
                  {ADVISORY_CROPS.map((cr) => (
                    <option key={cr.id} value={cr.id}>
                      {cr.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Growth Stage */}
              <div>
                <label className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1.5">
                  2. Growth Stage (फसल अवस्था)
                </label>
                <select
                  value={selectedGrowthStage}
                  onChange={(e) => setSelectedGrowthStage(e.target.value)}
                  className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
                >
                  {ADVISORY_GROWTH_STAGES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Concern */}
              <div>
                <label className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1.5">
                  3. Field Concern (समस्या / लक्षण)
                </label>
                <select
                  value={selectedConcernId}
                  onChange={(e) => setSelectedConcernId(e.target.value)}
                  className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
                >
                  {ADVISORY_CONCERNS.map((cn) => (
                    <option key={cn.id} value={cn.id}>
                      {cn.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </SectionCard>

          {/* ADVISORY OUTPUT PANEL */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-[#E0E8E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#26734D] uppercase tracking-wider block">
                  Agronomic Advisory Guidance
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#172B22]">
                  {activeAdvisory.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <StatusBadge variant="success" size="sm" icon={ShieldCheck}>
                  KVK Aligned Advice
                </StatusBadge>
                <PrimaryButton
                  variant="outline"
                  size="sm"
                  onClick={() => setUncertainModalOpen(true)}
                  icon={HelpCircle}
                >
                  Uncertain Diagnosis?
                </PrimaryButton>
              </div>
            </div>

            {/* 4 Structured Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: What to Check */}
              <SectionCard
                title="1. What to Check in the Field (खेत में क्या जांचें)"
                subtitle="Visual observations for leaves, roots, soil moisture, and weather."
                icon={Search}
              >
                <ul className="space-y-2.5 text-xs text-[#172B22]">
                  {activeAdvisory.whatToCheck.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                      <span className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-bold shrink-0 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Card 2: What to Do Next */}
              <SectionCard
                title="2. Practical Next Steps (किसान क्या करें)"
                subtitle="Non-chemical agronomic measures and practical field actions."
                icon={CheckCircle2}
              >
                <ul className="space-y-2.5 text-xs text-[#172B22]">
                  {activeAdvisory.whatToNext.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium text-[#123D2A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Card 3: What to Avoid */}
              <SectionCard
                title="3. Practices to Avoid (क्या न करें)"
                subtitle="Actions that worsen plant stress or waste farm inputs."
                icon={AlertCircle}
              >
                <ul className="space-y-2.5 text-xs text-[#172B22]">
                  {activeAdvisory.whatToAvoid.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#FFF8E1] border border-[#FFE082]">
                      <AlertTriangle className="w-4 h-4 text-[#B76E00] shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-[#7A4900]">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Card 4: When to Seek Expert Help */}
              <SectionCard
                title="4. When to Seek Local Expert Help (कृषि वैज्ञानिक परामर्श)"
                subtitle="Thresholds for contacting Krishi Vigyan Kendra (KVK) or extension officers."
                icon={ShieldAlert}
              >
                <ul className="space-y-2.5 text-xs text-[#172B22]">
                  {activeAdvisory.seekHelpWhen.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#FFEBEE] border border-[#FFCDD2]">
                      <ShieldAlert className="w-4 h-4 text-[#C62828] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-semibold text-[#B71C1C]">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            {/* Photo Diagnosis & AI Claim Disclaimer Box */}
            <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] flex items-start space-x-3 text-xs text-[#718078]">
              <CameraOff className="w-5 h-5 text-[#26734D] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-[#172B22]">Photo Diagnosis & AI Claim Disclaimer</h4>
                <p className="leading-relaxed">
                  We do not claim automated AI image diagnosis. If symptoms are ambiguous or severe, please bring physical leaf or plant samples to your local Krishi Vigyan Kendra (KVK) or Block Agriculture Officer for lab verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CROP REFERENCE LIBRARY */}
      {activeTab === 'reference' && (
        <div className="space-y-6">
          {/* Search and Category Filter Toolbar */}
          <div className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#718078] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search crops by name (e.g. Wheat, Rice, Cotton)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {CROP_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#123D2A] text-white font-semibold'
                      : 'bg-[#F5F8F4] text-[#718078] hover:text-[#172B22] border border-[#E0E8E1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Cards Grid */}
          {filteredCrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCrops.map((crop) => {
                const CropIcon = iconMap[crop.iconName] || Sprout;
                return (
                  <div
                    key={crop.id}
                    className="bg-white rounded-xl p-5 border border-[#E0E8E1] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="p-2.5 rounded-lg bg-[#E8F5E9] text-[#123D2A] border border-[#C8E6C9]">
                            <CropIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-[#172B22]">{crop.name}</h3>
                            <span className="text-[11px] font-medium text-[#718078]">{crop.category}</span>
                          </div>
                        </div>
                        <StatusBadge variant="neutral" size="sm">Reference Data</StatusBadge>
                      </div>

                      <p className="text-xs text-[#718078] leading-relaxed">{crop.shortDescription}</p>

                      <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] text-xs space-y-1">
                        <span className="font-semibold text-[#123D2A]">Growing Conditions:</span>
                        <p className="text-[#172B22] text-[11px] leading-relaxed">{crop.growingConditions}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded-lg border border-[#E0E8E1] bg-white flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-[#26734D] shrink-0" />
                          <div>
                            <p className="text-[10px] text-[#718078]">Ref. Temp Range</p>
                            <p className="text-xs font-bold text-[#172B22]">{crop.tempRange}</p>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-[#E0E8E1] bg-white flex items-center space-x-2">
                          <CloudRain className="w-4 h-4 text-[#26734D] shrink-0" />
                          <div>
                            <p className="text-[10px] text-[#718078]">Ref. Rainfall Range</p>
                            <p className="text-xs font-bold text-[#172B22]">{crop.rainfallRange}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E0E8E1]">
                      <PrimaryButton
                        variant="outline"
                        size="sm"
                        className="w-full justify-between"
                        onClick={() => setActiveModalCrop(crop)}
                      >
                        <span>View Reference Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </PrimaryButton>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No Crops Found"
              description={`No crops match your search "${searchTerm}" in ${selectedCategory}. Try resetting your search or category filter.`}
              icon={Sprout}
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
            />
          )}
        </div>
      )}

      {/* Expanded Crop Details Modal */}
      {activeModalCrop && (
        <Modal
          isOpen={Boolean(activeModalCrop)}
          onClose={() => setActiveModalCrop(null)}
          title={`${activeModalCrop.name} - Detailed Reference Profile`}
        >
          <div className="space-y-5 text-xs text-[#172B22]">
            <div className="p-3 rounded-lg bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#26734D] shrink-0" />
              <span>General Agronomic Benchmark (Non-Personalized Reference)</span>
            </div>

            <p className="text-xs text-[#718078] leading-relaxed">{activeModalCrop.details}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                <span className="text-[#718078] font-medium block mb-1">Optimal Soil pH</span>
                <span className="text-sm font-bold text-[#123D2A]">{activeModalCrop.soilPhRange}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                <span className="text-[#718078] font-medium block mb-1">Optimal Nitrogen (N)</span>
                <span className="text-sm font-bold text-[#123D2A]">{activeModalCrop.nitrogenRange}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                <span className="text-[#718078] font-medium block mb-1">Typical Harvest Window</span>
                <span className="text-sm font-bold text-[#123D2A]">{activeModalCrop.harvestWindow}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                <span className="text-[#718078] font-medium block mb-1">Irrigation System</span>
                <span className="text-sm font-bold text-[#123D2A]">{activeModalCrop.irrigationType}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#172B22]">Common Pathogens & Pest Reference:</span>
              <p className="text-[#718078]">{activeModalCrop.commonPests}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <PrimaryButton variant="primary" size="sm" onClick={() => setActiveModalCrop(null)}>
                Close Reference Profile
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Uncertain Diagnosis Modal */}
      {uncertainModalOpen && (
        <Modal
          isOpen={uncertainModalOpen}
          onClose={() => setUncertainModalOpen(false)}
          title="Uncertain Diagnosis? Additional Field Checklist"
        >
          <div className="space-y-4 text-xs text-[#172B22]">
            <div className="p-3.5 rounded-lg bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] space-y-1">
              <h4 className="font-bold">When Crop Symptoms Are Ambiguous</h4>
              <p className="text-[#7A4900] leading-relaxed">
                Overlapping symptoms (e.g. root rot vs nitrogen deficiency) require closer physical verification before taking action.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#123D2A] block">Recommended Checklist Questions:</span>
              <ul className="space-y-1.5 list-disc list-inside text-[#718078]">
                <li>Did symptoms appear suddenly after a heavy rain or cold night?</li>
                <li>Are neighboring fields of the same crop showing similar leaf symptoms?</li>
                <li>When was the last fertilizer or herbicide application made?</li>
                <li>Are root tips healthy white or brown/rotted?</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#172B22]">Local Extension Contact Advice:</span>
              <p className="text-[#718078]">
                Contact your nearest Krishi Vigyan Kendra (KVK) officer or Kisan Call Center (Toll Free: 1800-180-1551) with plant samples for lab confirmation.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <PrimaryButton variant="primary" size="sm" onClick={() => setUncertainModalOpen(false)}>
                Close Checklist
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CropInsights;
