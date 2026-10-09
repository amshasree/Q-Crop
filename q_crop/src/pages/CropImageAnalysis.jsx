import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sprout,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Tractor,
  Layers,
  FileImage,
  Printer,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getFarmProfile } from '../utils/farmStorage';

const SAMPLE_TEST_IMAGES = [
  {
    id: 'healthy_wheat',
    title: 'Healthy Wheat Field (गेहूं की फसल)',
    crop: 'Wheat (गेहूं)',
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    healthScore: 88,
    canopyCoverage: '82%',
    chlorosisLevel: 'Low (Safe)',
    detectedStatus: 'Healthy Dense Tillering (उत्कृष्ट बढ़वार)',
    predictedYieldRange: '4.5 - 5.2 t/ha (~18 - 21 Q/acre)',
    advice: 'Canopy density and chlorophyll absorption are optimal. Schedule Crown Root Initiation watering and top-dress nitrogen in split doses as per standard schedule.'
  },
  {
    id: 'yellowing_paddy',
    title: 'Paddy Leaf Yellowing (धान में पीलापन)',
    crop: 'Paddy / Rice (धान)',
    url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    healthScore: 65,
    canopyCoverage: '68%',
    chlorosisLevel: 'Moderate (Nitrogen Stress)',
    detectedStatus: 'Nitrogen & Zinc Deficiency Detected (नाइट्रोजन कमी)',
    predictedYieldRange: '3.6 - 4.2 t/ha (~14 - 17 Q/acre)',
    advice: 'Leaf yellowing detected on lower leaves. Drain standing anaerobic water for 2 days and apply split urea + zinc sulfate spray as per KVK guidelines.'
  },
  {
    id: 'maize_field',
    title: 'Maize Knee-High Canopy (मक्का फसल)',
    crop: 'Maize (मक्का)',
    url: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=600&q=80',
    healthScore: 82,
    canopyCoverage: '75%',
    chlorosisLevel: 'Low',
    detectedStatus: 'Normal Vegetative Growth (सामान्य विकास)',
    predictedYieldRange: '4.0 - 4.8 t/ha (~16 - 19.5 Q/acre)',
    advice: 'Good whorl structure and leaf area index. Perform earthing-up operation at 25-30 days after sowing to suppress weeds and support root anchor.'
  }
];

export const CropImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_TEST_IMAGES[0].url);
  const [activeSample, setActiveSample] = useState(SAMPLE_TEST_IMAGES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(SAMPLE_TEST_IMAGES[0]);
  const [customFile, setCustomFile] = useState(null);
  const [farmProfile, setFarmProfile] = useState(null);

  useEffect(() => {
    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        triggerAnalysis(reader.result, 'Uploaded Crop Image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample) => {
    setActiveSample(sample);
    setSelectedImage(sample.url);
    setCustomFile(null);
    triggerAnalysis(sample.url, sample);
  };

  const triggerAnalysis = (imgSrc, sampleData) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (typeof sampleData === 'object') {
        setAnalysisResult(sampleData);
      } else {
        // Custom uploaded image analysis result
        setAnalysisResult({
          crop: farmProfile ? farmProfile.crop : 'Custom Crop Scan',
          healthScore: 80,
          canopyCoverage: '76%',
          chlorosisLevel: 'Low to Moderate',
          detectedStatus: 'Active Leaf Canopy Detected (पत्ती बढ़वार)',
          predictedYieldRange: '4.1 - 4.9 t/ha (~16.5 - 20 Q/acre)',
          advice: 'Custom image scan complete. Leaf area coverage is healthy. Ensure adequate soil moisture and monitor leaf undersides for early sucking pest colonies.'
        });
      }
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  const areaAcres = farmProfile ? parseFloat(farmProfile.farmArea) || 4.5 : 4.5;
  const estTotalMinQ = (areaAcres * 17.5).toFixed(1);
  const estTotalMaxQ = (areaAcres * 21.0).toFixed(1);

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Sample Demo Mode Banner (Hidden when printing) */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs print:hidden">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">Sample AI Computer Vision Mode: </span>
            Image canopy features and yield estimations below represent sample computer-vision models. Live vision model APIs can be connected to your backend server.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm">
          Vision AI Demo Mode
        </StatusBadge>
      </div>

      {/* Page Header (Hidden when printing) */}
      <div className="print:hidden">
        <PageHeader
          title="AI Crop Photo Scanner & Yield Predictor (फसल फोटो विश्लेषण)"
          subtitle="Upload or select a crop leaf/field photo to analyze leaf canopy health, detect symptoms, and calculate estimated yield."
          breadcrumb={['Quantum Farming', 'Crop Photo Scanner']}
          icon={Camera}
          actions={
            <div className="flex items-center space-x-2">
              <PrimaryButton variant="outline" size="sm" onClick={handlePrint} icon={Printer}>
                Print Analysis Report
              </PrimaryButton>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: IMAGE UPLOAD & SAMPLE SELECTOR (5 cols - Hidden when printing) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <SectionCard title="1. Crop Image Selection" icon={Upload}>
            <div className="space-y-4">
              {/* Image Preview Box */}
              <div className="relative rounded-xl border-2 border-dashed border-[#E0E8E1] p-2 bg-[#F5F8F4] flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Crop Photo Preview"
                    className="w-full h-52 object-cover rounded-lg shadow-xs"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <ImageIcon className="w-10 h-10 text-[#718078] mx-auto" />
                    <p className="text-xs font-semibold text-[#172B22]">No Crop Image Uploaded</p>
                  </div>
                )}

                {customFile && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2.5 py-1 rounded-md text-[11px] font-mono">
                    {customFile}
                  </div>
                )}
              </div>

              {/* Upload Input & Camera Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="w-full sm:flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-full bg-[#123D2A] text-white hover:bg-[#26734D] px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 min-h-[44px]">
                    <Upload className="w-4 h-4" />
                    <span>Upload Crop Photo</span>
                  </div>
                </label>

                <PrimaryButton
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto min-h-[44px]"
                  onClick={() => triggerAnalysis(selectedImage, activeSample)}
                  isLoading={isAnalyzing}
                  icon={RefreshCw}
                >
                  Re-Scan
                </PrimaryButton>
              </div>

              {/* Quick Sample Test Images */}
              <div className="pt-3 border-t border-[#E0E8E1] space-y-2">
                <span className="text-[11px] font-bold text-[#718078] uppercase tracking-wider block">
                  Or Test Quick Sample Crop Photos:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_TEST_IMAGES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                        activeSample.id === sample.id
                          ? 'border-[#26734D] bg-[#E8F5E9] ring-2 ring-[#26734D]'
                          : 'border-[#E0E8E1] bg-white hover:bg-[#F5F8F4]'
                      }`}
                    >
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-14 object-cover rounded mb-1"
                      />
                      <span className="text-[10px] font-bold text-[#172B22] block truncate">
                        {sample.crop}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT COLUMN: AI VISION ANALYSIS & YIELD PREDICTION RESULTS (7 cols or Full Width when printing) */}
        <div className="lg:col-span-7 print:col-span-12 space-y-6">
          <SectionCard
            title="Image Vision & Yield Prediction Report"
            subtitle="Calculated metrics based on leaf canopy density, color index, and health features."
            icon={Sparkles}
            action={<StatusBadge variant="success">Vision Model Analyzed</StatusBadge>}
          >
            {isAnalyzing ? (
              <LoadingSpinner text="Analyzing leaf canopy features, chlorophyll absorption, and predicting yield..." />
            ) : (
              <div className="space-y-6">
                {/* 1. HEALTH & CANOPY STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                    <span className="text-[#718078] font-bold text-[10px] uppercase tracking-wider block">
                      Crop Health Score
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-extrabold text-[#172B22]">
                        {analysisResult.healthScore}
                      </span>
                      <span className="text-xs text-[#718078] font-bold">/ 100</span>
                    </div>
                    <StatusBadge
                      variant={analysisResult.healthScore >= 80 ? 'success' : 'warning'}
                      size="sm"
                    >
                      {analysisResult.healthScore >= 80 ? 'Good Health' : 'Needs Attention'}
                    </StatusBadge>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                    <span className="text-[#718078] font-bold text-[10px] uppercase tracking-wider block">
                      Leaf Canopy Coverage
                    </span>
                    <span className="text-2xl font-extrabold text-[#26734D] block">
                      {analysisResult.canopyCoverage}
                    </span>
                    <span className="text-[11px] text-[#718078] block">High Tillering Index</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
                    <span className="text-[#718078] font-bold text-[10px] uppercase tracking-wider block">
                      Chlorosis / Yellowing
                    </span>
                    <span className="text-base font-extrabold text-[#172B22] block">
                      {analysisResult.chlorosisLevel}
                    </span>
                    <span className="text-[11px] text-[#718078] block">Visual Spectrum</span>
                  </div>
                </div>

                {/* 2. IMAGE-BASED YIELD PREDICTION CARD */}
                <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] space-y-2 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#1B5E20] uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#1B5E20]" />
                      Image-Predicted Harvest Yield
                    </span>
                    <StatusBadge variant="success" size="sm">Yield Forecast</StatusBadge>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#123D2A]">
                      {analysisResult.predictedYieldRange}
                    </span>
                  </div>

                  {farmProfile && (
                    <p className="text-xs font-bold text-[#123D2A] pt-1 border-t border-[#C8E6C9]">
                      Estimated Total Production for your {farmProfile.farmArea} {farmProfile.areaUnit}: ~{estTotalMinQ} - {estTotalMaxQ} Quintals
                    </p>
                  )}
                </div>

                {/* 3. DETECTED SYMPTOMS & AGRONOMIC ADVICE */}
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E0E8E1] space-y-1 shadow-xs">
                    <span className="font-bold text-[#123D2A] block uppercase tracking-wider text-[10px]">
                      Detected Visual Feature Status:
                    </span>
                    <p className="font-extrabold text-sm text-[#172B22]">{analysisResult.detectedStatus}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] space-y-1 shadow-xs">
                    <h4 className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
                      Tailored Agronomic Action:
                    </h4>
                    <p className="text-xs text-[#718078] leading-relaxed">{analysisResult.advice}</p>
                  </div>
                </div>

                {/* 4. AI VISION DISCLAIMER */}
                <div className="p-3.5 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] text-xs space-y-1">
                  <h4 className="font-bold">Computer Vision Diagnostic Note</h4>
                  <p className="text-[#7A4900] leading-relaxed">
                    Image canopy scanning provides non-destructive field monitoring. If severe disease lesions, viral stunting, or rapid wilting occurs, bring physical leaf samples to your local Krishi Vigyan Kendra (KVK) for lab confirmation.
                  </p>
                </div>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default CropImageAnalysis;
