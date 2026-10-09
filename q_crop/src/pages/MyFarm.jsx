import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Tractor,
  Sprout,
  Droplets,
  FlaskConical,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Edit,
  Trash2,
  Save,
  RotateCcw,
  Info,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Calculator,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import {
  getFarmProfile,
  saveFarmProfile,
  clearFarmProfile,
  convertFarmArea,
  DEFAULT_FARM_PROFILE
} from '../utils/farmStorage';

const INDIAN_STATES = [
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'West Bengal',
  'Bihar',
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Odisha',
  'Assam',
  'Other'
];

const SOIL_TYPES = [
  { value: 'Alluvial Loam', label: 'Alluvial Loam (दोमट मिट्टी - Indo-Gangetic Plains)' },
  { value: 'Clay / Black Cotton', label: 'Clay / Black Cotton Soil (काली मिट्टी - Deccan/Central India)' },
  { value: 'Sandy Loam', label: 'Sandy Loam (बलुई दोमट - Arid/Rajasthan/Western UP)' },
  { value: 'Red Soil', label: 'Red Soil (लाल मिट्टी - Southern/Eastern Plateau)' },
  { value: 'Laterite Soil', label: 'Laterite Soil (लैटेराइट - Coastal/High Rainfall)' },
  { value: 'Don\'t Know / Unsure', label: 'Don\'t Know / Unsure (सामान्य उपजाऊ मिट्टी)' }
];

const IRRIGATION_METHODS = [
  { value: 'Canal Irrigation', label: 'Canal Irrigation (नहरी सिंचाई - Government Canal Network)' },
  { value: 'Tube Well / Groundwater', label: 'Tube Well / Groundwater (ट्यूबवेल / समरसेबल - Borewell)' },
  { value: 'Drip Irrigation', label: 'Drip Irrigation (टपक सिंचाई - Micro Irrigation)' },
  { value: 'Sprinkler System', label: 'Sprinkler System (फव्वारा सिंचाई - Overhead Sprinkler)' },
  { value: 'Rainfed (Monsoon)', label: 'Rainfed / Monsoon Dependent (वर्षा आधारित - Natural Rain)' }
];

const CROPS = [
  { value: 'Wheat (गेहूं)', label: 'Wheat (गेहूं)' },
  { value: 'Paddy / Rice (धान)', label: 'Paddy / Rice (धान)' },
  { value: 'Maize (मक्का)', label: 'Maize (मक्का)' },
  { value: 'Cotton (कपास)', label: 'Cotton (कपास)' },
  { value: 'Sugarcane (गन्ना)', label: 'Sugarcane (गन्ना)' },
  { value: 'Mustard (सरसों)', label: 'Mustard (सरसों)' },
  { value: 'Gram / Pulses (चना/दाल)', label: 'Gram / Pulses (चना/दाल)' }
];

const GROWTH_STAGES = [
  'Germination / Seedling Stage (अंकुरण)',
  'Vegetative / CRI Stage (वानस्पतिक विकास / जड़ विकास)',
  'Tillering / Flowering Stage (कल्ले निकलना / फूल आना)',
  'Grain Filling / Pod Formation (दाना भरना)',
  'Mature / Ready for Harvest (पकाई / कटाई योग्य)'
];

export const MyFarm = () => {
  const navigate = useNavigate();

  // State management
  const [savedProfile, setSavedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Land, 2: Soil & Water, 3: Crop, 4: Review
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Form state
  const [formData, setFormData] = useState(DEFAULT_FARM_PROFILE);
  const [errors, setErrors] = useState({});

  // Load profile on mount
  useEffect(() => {
    const existing = getFarmProfile();
    if (existing) {
      setSavedProfile(existing);
      setFormData(existing);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setCurrentStep(1);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Step validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.state) newErrors.state = 'Please select your state.';
      if (!formData.district || !formData.district.trim()) newErrors.district = 'Please enter your district name.';
      const area = parseFloat(formData.farmArea);
      if (isNaN(area) || area <= 0) newErrors.farmArea = 'Enter a valid positive farm area.';
    }

    if (step === 3) {
      if (!formData.crop) newErrors.crop = 'Please select your primary crop.';
      if (!formData.sowingDate) newErrors.sowingDate = 'Please select sowing or transplanting date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();

    // Validate all steps before final save
    const step1Valid = validateStep(1);
    const step3Valid = validateStep(3);

    if (!step1Valid || !step3Valid) {
      if (!step1Valid) setCurrentStep(1);
      else if (!step3Valid) setCurrentStep(3);
      return;
    }

    const res = saveFarmProfile(formData);
    if (res.success) {
      const updated = getFarmProfile();
      setSavedProfile(updated);
      setIsEditing(false);
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 4000);
    }
  };

  const handleClear = () => {
    clearFarmProfile();
    setSavedProfile(null);
    setFormData(DEFAULT_FARM_PROFILE);
    setIsEditing(true);
    setCurrentStep(1);
    setClearModalOpen(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setCurrentStep(1);
  };

  const areaConversionText = convertFarmArea(formData.farmArea, formData.areaUnit);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Farm Profile & Setup (मेरा खेत प्रोफ़ाइल)"
        subtitle="Set up your farm details locally to personalize crop recommendations, irrigation alerts, and yield calculations."
        breadcrumb={['Quantum Farming', 'My Farm Setup']}
        icon={Tractor}
        actions={
          savedProfile && !isEditing ? (
            <StatusBadge variant="success" icon={ShieldCheck}>
              Farm Setup Saved Locally
            </StatusBadge>
          ) : (
            <StatusBadge variant="warning">Setup In Progress</StatusBadge>
          )
        }
      />

      {/* Local Storage Privacy & Data Protection Notice */}
      <div className="p-4 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] space-y-2 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <HardDrive className="w-5 h-5 text-[#26734D] shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold">
            Local Browser Storage Protection Notice (स्थानीय संग्रहण सूचना)
          </h4>
        </div>
        <p className="text-xs text-[#718078] leading-relaxed">
          Your farm information is stored <strong>exclusively in your local browser storage (LocalStorage)</strong> on this device.
          It is <strong>not uploaded or backed up to any cloud server</strong>. We do not collect or request any personal identification numbers (no Aadhaar, phone number, or full address).
        </p>
      </div>

      {/* Save Success Banner */}
      {saveSuccessNotice && (
        <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#26734D] shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              Farm profile saved successfully on this device!
            </span>
          </div>
          <StatusBadge variant="success" size="sm">
            Saved
          </StatusBadge>
        </div>
      )}

      {/* READ-ONLY VIEW (When profile is saved & user is not editing) */}
      {savedProfile && !isEditing ? (
        <div className="space-y-6">
          <SectionCard
            title="Active Farm Profile Summary"
            subtitle="Your current saved land, soil, and crop details."
            icon={Tractor}
            action={
              <div className="flex items-center space-x-2">
                <PrimaryButton variant="outline" size="sm" onClick={handleStartEdit} icon={Edit}>
                  Edit Profile
                </PrimaryButton>
                <PrimaryButton variant="ghost" size="sm" onClick={() => setClearModalOpen(true)} icon={Trash2}>
                  Clear Data
                </PrimaryButton>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card 1: Location & Land Size */}
              <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-3">
                <div className="flex items-center space-x-2 text-[#123D2A] font-bold text-xs">
                  <MapPin className="w-4 h-4 text-[#26734D]" />
                  <span>LOCATION & LAND SIZE</span>
                </div>
                <div className="space-y-1">
                  <span className="text-lg font-extrabold text-[#172B22] block">
                    {savedProfile.district}, {savedProfile.state}
                  </span>
                  <p className="text-xs text-[#718078]">
                    Village / PIN: <span className="font-semibold text-[#172B22]">{savedProfile.villageOrPin}</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E0E8E1]">
                  <span className="text-[11px] text-[#718078] block">Total Farm Area</span>
                  <span className="text-2xl font-extrabold text-[#26734D]">
                    {savedProfile.farmArea} {savedProfile.areaUnit}
                  </span>
                  <p className="text-[11px] font-mono text-[#718078]">
                    {convertFarmArea(savedProfile.farmArea, savedProfile.areaUnit)}
                  </p>
                </div>
              </div>

              {/* Card 2: Soil & Water */}
              <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-3">
                <div className="flex items-center space-x-2 text-[#123D2A] font-bold text-xs">
                  <FlaskConical className="w-4 h-4 text-[#26734D]" />
                  <span>SOIL & IRRIGATION</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#718078] block">Soil Type:</span>
                    <span className="font-bold text-[#172B22]">{savedProfile.soilType}</span>
                  </div>
                  <div>
                    <span className="text-[#718078] block">Irrigation Source:</span>
                    <span className="font-bold text-[#123D2A]">{savedProfile.irrigationMethod}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Active Crop & Growth */}
              <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-3">
                <div className="flex items-center space-x-2 text-[#123D2A] font-bold text-xs">
                  <Sprout className="w-4 h-4 text-[#26734D]" />
                  <span>ACTIVE CROP & STAGE</span>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-lg font-extrabold text-[#172B22] block">
                    {savedProfile.crop}
                  </span>
                  {savedProfile.variety && (
                    <p className="text-[#718078]">
                      Variety: <span className="font-semibold text-[#172B22]">{savedProfile.variety}</span>
                    </p>
                  )}
                  <p className="text-[#718078]">
                    Sown Date: <span className="font-mono font-semibold text-[#172B22]">{savedProfile.sowingDate}</span>
                  </p>
                  <div className="pt-2">
                    <StatusBadge variant="success" size="sm">
                      {savedProfile.growthStage}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions using Farm Profile */}
            <div className="mt-6 pt-6 border-t border-[#E0E8E1] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#718078]">
                Use your saved farm profile across tools:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <PrimaryButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/predict')}
                  icon={Calculator}
                >
                  Estimate Yield for this Farm
                </PrimaryButton>
                <PrimaryButton
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/crop-insights')}
                  icon={Sprout}
                >
                  View Crop Advisory
                </PrimaryButton>
              </div>
            </div>
          </SectionCard>
        </div>
      ) : (
        /* GUIDED SETUP FORM WIZARD */
        <div className="space-y-6">
          {/* Step Indicator Progress Bar */}
          <div className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#172B22] mb-3">
              <span className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#26734D]' : ''}`}>
                1. Land & Location
              </span>
              <span className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#26734D]' : ''}`}>
                2. Soil & Water
              </span>
              <span className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#26734D]' : ''}`}>
                3. Crop & Planting
              </span>
              <span className={`flex items-center gap-1.5 ${currentStep === 4 ? 'text-[#26734D]' : ''}`}>
                4. Review & Save
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full bg-[#E0E8E1] rounded-full h-2">
              <div
                className="bg-[#26734D] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
            {/* STEP 1: LAND & LOCATION */}
            {currentStep === 1 && (
              <SectionCard
                title="Step 1: Land Area & Location Details"
                subtitle="Enter where your farm is located and total land area."
                icon={MapPin}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        State (राज्य) <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none ${
                          errors.state ? 'border-red-500' : 'border-[#E0E8E1] focus:border-[#26734D]'
                        }`}
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="text-[11px] text-red-600 mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label htmlFor="district" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        District (ज़िला) <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="district"
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="e.g. Ludhiana / Karnal / Bathinda"
                        className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none ${
                          errors.district ? 'border-red-500' : 'border-[#E0E8E1] focus:border-[#26734D]'
                        }`}
                      />
                      {errors.district && <p className="text-[11px] text-red-600 mt-1">{errors.district}</p>}
                    </div>

                    <div>
                      <label htmlFor="villageOrPin" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Village or PIN Code (गांव / पिन कोड)
                      </label>
                      <input
                        id="villageOrPin"
                        type="text"
                        value={formData.villageOrPin}
                        onChange={(e) => handleInputChange('villageOrPin', e.target.value)}
                        placeholder="e.g. Village Model Town or 141001"
                        className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                      />
                      <p className="text-[11px] text-[#718078] mt-1">Optional. Do not enter street address.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label htmlFor="farmArea" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Farm Area (खेत का आकार) <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="farmArea"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={formData.farmArea}
                        onChange={(e) => handleInputChange('farmArea', e.target.value)}
                        placeholder="e.g. 4.5"
                        className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none ${
                          errors.farmArea ? 'border-red-500' : 'border-[#E0E8E1] focus:border-[#26734D]'
                        }`}
                      />
                      {errors.farmArea && <p className="text-[11px] text-red-600 mt-1">{errors.farmArea}</p>}
                    </div>

                    <div>
                      <label htmlFor="areaUnit" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Measurement Unit (इकाई) <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="areaUnit"
                        value={formData.areaUnit}
                        onChange={(e) => handleInputChange('areaUnit', e.target.value)}
                        className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                      >
                        <option value="Acres">Acres (एकड़)</option>
                        <option value="Hectares">Hectares (हेक्टेयर)</option>
                        <option value="Bigha">Bigha (बीघा)</option>
                        <option value="Guntha">Guntha (गुंठा)</option>
                      </select>
                    </div>
                  </div>

                  {areaConversionText && (
                    <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] text-xs text-[#26734D] font-mono">
                      Equivalent standard area: {areaConversionText}
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {/* STEP 2: SOIL & WATER */}
            {currentStep === 2 && (
              <SectionCard
                title="Step 2: Soil Type & Irrigation Method"
                subtitle="Select soil texture and primary water source."
                icon={FlaskConical}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="soilType" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                      Soil Type if Known (मिट्टी का प्रकार)
                    </label>
                    <select
                      id="soilType"
                      value={formData.soilType}
                      onChange={(e) => handleInputChange('soilType', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    >
                      {SOIL_TYPES.map((st) => (
                        <option key={st.value} value={st.value}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#718078] mt-1">
                      If unsure, select "Don't Know / Unsure". Standard loam defaults will be used for calculations.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="irrigationMethod" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                      Primary Irrigation Method (सिंचाई का साधन)
                    </label>
                    <select
                      id="irrigationMethod"
                      value={formData.irrigationMethod}
                      onChange={(e) => handleInputChange('irrigationMethod', e.target.value)}
                      className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                    >
                      {IRRIGATION_METHODS.map((im) => (
                        <option key={im.value} value={im.value}>
                          {im.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* STEP 3: CROP & PLANTING */}
            {currentStep === 3 && (
              <SectionCard
                title="Step 3: Target Crop & Growth Stage"
                subtitle="Select crop variety, sowing date, and development stage."
                icon={Sprout}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="crop" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Primary Crop (मुख्य फसल) <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="crop"
                        value={formData.crop}
                        onChange={(e) => handleInputChange('crop', e.target.value)}
                        className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none ${
                          errors.crop ? 'border-red-500' : 'border-[#E0E8E1] focus:border-[#26734D]'
                        }`}
                      >
                        {CROPS.map((cr) => (
                          <option key={cr.value} value={cr.value}>
                            {cr.label}
                          </option>
                        ))}
                      </select>
                      {errors.crop && <p className="text-[11px] text-red-600 mt-1">{errors.crop}</p>}
                    </div>

                    <div>
                      <label htmlFor="variety" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Crop Variety if Known (किसम / वैरायटी)
                      </label>
                      <input
                        id="variety"
                        type="text"
                        value={formData.variety}
                        onChange={(e) => handleInputChange('variety', e.target.value)}
                        placeholder="e.g. HD-2967 / PR-126 / RASI 659"
                        className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sowingDate" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Sowing / Transplanting Date (बुवाई की तारीख) <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="sowingDate"
                        type="date"
                        value={formData.sowingDate}
                        onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                        className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none ${
                          errors.sowingDate ? 'border-red-500' : 'border-[#E0E8E1] focus:border-[#26734D]'
                        }`}
                      />
                      {errors.sowingDate && <p className="text-[11px] text-red-600 mt-1">{errors.sowingDate}</p>}
                    </div>

                    <div>
                      <label htmlFor="growthStage" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                        Current Growth Stage (फसल की अवस्था)
                      </label>
                      <select
                        id="growthStage"
                        value={formData.growthStage}
                        onChange={(e) => handleInputChange('growthStage', e.target.value)}
                        className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
                      >
                        {GROWTH_STAGES.map((gs) => (
                          <option key={gs} value={gs}>
                            {gs}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {currentStep === 4 && (
              <SectionCard
                title="Step 4: Review & Confirm Farm Setup"
                subtitle="Review your entered information before saving to browser local storage."
                icon={CheckCircle2}
              >
                <div className="space-y-4 text-xs text-[#172B22]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#123D2A]">1. Location & Land</span>
                        <button onClick={() => setCurrentStep(1)} className="text-[#26734D] hover:underline font-semibold text-[11px]">
                          Edit
                        </button>
                      </div>
                      <p>State: <strong>{formData.state}</strong></p>
                      <p>District: <strong>{formData.district}</strong></p>
                      <p>Village/PIN: <strong>{formData.villageOrPin || 'N/A'}</strong></p>
                      <p>Area: <strong>{formData.farmArea} {formData.areaUnit}</strong> ({areaConversionText})</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#123D2A]">2. Soil & Water</span>
                        <button onClick={() => setCurrentStep(2)} className="text-[#26734D] hover:underline font-semibold text-[11px]">
                          Edit
                        </button>
                      </div>
                      <p>Soil Type: <strong>{formData.soilType}</strong></p>
                      <p>Irrigation: <strong>{formData.irrigationMethod}</strong></p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 md:col-span-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#123D2A]">3. Crop & Planting</span>
                        <button onClick={() => setCurrentStep(3)} className="text-[#26734D] hover:underline font-semibold text-[11px]">
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <p>Crop: <strong>{formData.crop}</strong></p>
                        <p>Variety: <strong>{formData.variety || 'Not specified'}</strong></p>
                        <p>Sowing Date: <strong>{formData.sowingDate}</strong></p>
                        <p>Growth Stage: <strong>{formData.growthStage}</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] flex items-center space-x-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Saving will update your local browser profile. You can edit or clear this data anytime.</span>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Form Step Navigation Buttons */}
            <div className="pt-4 border-t border-[#E0E8E1] flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <PrimaryButton variant="outline" size="md" onClick={handlePrevStep} icon={ChevronLeft}>
                    Previous Step
                  </PrimaryButton>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {savedProfile && (
                  <PrimaryButton variant="ghost" size="md" onClick={() => setIsEditing(false)}>
                    Cancel
                  </PrimaryButton>
                )}

                {currentStep < 4 ? (
                  <PrimaryButton variant="primary" size="md" onClick={handleNextStep} icon={ChevronRight}>
                    Next Step
                  </PrimaryButton>
                ) : (
                  <PrimaryButton variant="primary" size="md" onClick={handleSave} icon={Save}>
                    Save Farm Profile
                  </PrimaryButton>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Modal for Clear Data */}
      {clearModalOpen && (
        <Modal
          isOpen={clearModalOpen}
          onClose={() => setClearModalOpen(false)}
          title="Clear Saved Farm Profile?"
        >
          <div className="space-y-4 text-xs text-[#172B22]">
            <p className="leading-relaxed">
              Are you sure you want to delete your saved farm profile from this browser? This will reset all local farm inputs and default settings.
            </p>

            <div className="pt-2 flex justify-end space-x-3">
              <PrimaryButton variant="outline" size="sm" onClick={() => setClearModalOpen(false)}>
                Cancel
              </PrimaryButton>
              <PrimaryButton variant="primary" size="sm" onClick={handleClear} icon={Trash2}>
                Confirm Clear
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyFarm;
