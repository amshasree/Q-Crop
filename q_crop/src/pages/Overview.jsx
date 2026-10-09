import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  Calculator,
  BarChart3,
  CloudSun,
  CloudRain,
  Droplets,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Info,
  Clock,
  Search,
  Eye,
  RotateCcw,
  Activity,
  Layers,
  HelpCircle,
  ShieldCheck,
  ServerOff,
  Tractor
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { StatCard } from '../components/common/StatCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Modal } from '../components/common/Modal';

import { IllustrativeYieldBarChart } from '../components/charts/IllustrativeYieldBarChart';
import { CropDistributionChart } from '../components/charts/CropDistributionChart';
import { RainfallTrendChart } from '../components/charts/RainfallTrendChart';

import {
  TODAY_FARMER_TASKS,
  MOCK_WEATHER_SUMMARY,
  MOCK_CROP_GROWTH_STATUS,
  DEMO_KPI_STATS,
  RECENT_DEMO_ACTIVITIES
} from '../data/demoData';
import { getFarmProfile } from '../utils/farmStorage';

export const Overview = () => {
  const navigate = useNavigate();

  // State management
  const [selectedCrop, setSelectedCrop] = useState('Wheat (गेहूं)');
  const [tasks, setTasks] = useState(TODAY_FARMER_TASKS);
  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    const profile = getFarmProfile();
    if (profile) {
      setSavedProfile(profile);
      if (profile.crop) setSelectedCrop(profile.crop);
    }
  }, []);

  // Toggle task completion
  const handleToggleTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleResetTasks = () => {
    setTasks(TODAY_FARMER_TASKS);
  };

  const filteredActivities = RECENT_DEMO_ACTIVITIES.filter(
    (act) =>
      act.crop.toLowerCase().includes(tableSearch.toLowerCase()) ||
      act.region.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sample Data Disclosure Banner */}
      <div className="p-3.5 rounded-xl bg-[#F1F8EC] border border-[#A3D977] text-[#123D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">
            Sample Demo Mode: All weather indicators, growth stages, tasks, and yield estimates are sample figures for farmer advisory prototyping.
          </span>
        </div>
        <StatusBadge variant="lime" size="sm" icon={ShieldCheck}>
          Sample Advisory Data
        </StatusBadge>
      </div>

      {/* Welcome Header & Location Bar */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E0E8E1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-[#26734D] uppercase tracking-wider">Kisan Advisory Dashboard</span>
            <span className="text-xs text-[#718078] font-normal border-l border-[#E0E8E1] pl-2">Kharif / Rabi Season</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B22] tracking-tight">
            Welcome back, Farmer! (नमस्कार)
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#718078] pt-1">
            <div className="flex items-center space-x-1 font-medium text-[#123D2A]">
              <MapPin className="w-4 h-4 text-[#26734D]" />
              <span>Location: {MOCK_WEATHER_SUMMARY.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5 font-medium">
              <span>Active Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="bg-[#F5F8F4] border border-[#E0E8E1] rounded px-2 py-0.5 font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
              >
                <option value="Wheat (गेहूं)">Wheat (गेहूं)</option>
                <option value="Paddy (धान)">Paddy / Rice (धान)</option>
                <option value="Maize (मक्का)">Maize (मक्का)</option>
                <option value="Cotton (कपास)">Cotton (कपास)</option>
                <option value="Sugarcane (गन्ना)">Sugarcane (गन्ना)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <PrimaryButton
            variant="primary"
            size="md"
            onClick={() => navigate('/crop-insights')}
            icon={Sprout}
          >
            Get Crop Advice
          </PrimaryButton>

          <PrimaryButton
            variant="outline"
            size="md"
            onClick={() => setFarmModalOpen(true)}
            icon={Eye}
          >
            View My Farm
          </PrimaryButton>
        </div>
      </div>

      {/* Simulated Loading State Toggle Test Bar */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
          }}
          className="text-xs text-[#718078] hover:text-[#123D2A] underline cursor-pointer"
        >
          Test UI Refresh / Loading State
        </button>
      </div>

      {isLoading ? (
        <SectionCard title="Refreshing Dashboard Data" icon={Clock}>
          <LoadingSpinner text="Updating farm widgets and weather metrics..." />
        </SectionCard>
      ) : (
        <>
          {/* Main Dashboard Widget Cards Grid (Large readable values) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Widget 1: Today's Tasks */}
            <SectionCard
              title="Today's Recommended Farm Tasks"
              subtitle="Actionable daily tasks based on current crop growth stage."
              icon={Calendar}
              action={
                tasks.length < TODAY_FARMER_TASKS.length && (
                  <PrimaryButton variant="ghost" size="sm" onClick={handleResetTasks} icon={RotateCcw}>
                    Reset Tasks
                  </PrimaryButton>
                )
              }
            >
              {tasks.length > 0 ? (
                <div className="space-y-2.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] hover:border-[#26734D] transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#172B22]">{task.title}</span>
                        <StatusBadge
                          variant={task.priority === 'High' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {task.due}
                        </StatusBadge>
                      </div>
                      <p className="text-[11px] text-[#718078] leading-relaxed">{task.description}</p>
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className="text-[11px] text-[#1B5E20] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark Done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="All Today's Tasks Completed!"
                  description="Great job! You have completed all scheduled tasks for today."
                  icon={CheckCircle2}
                  actionLabel="Reset Task List"
                  onAction={handleResetTasks}
                />
              )}
            </SectionCard>

            {/* Widget 2: Weather Summary Card */}
            <SectionCard
              title="Today's Weather Summary"
              subtitle="Sample temperature & precipitation status."
              icon={CloudSun}
              action={<StatusBadge variant="neutral">Sample Weather</StatusBadge>}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                    <span className="text-[11px] text-[#718078] block">Temperature</span>
                    <span className="text-2xl font-extrabold text-[#172B22]">{MOCK_WEATHER_SUMMARY.temperature}</span>
                    <span className="text-[10px] text-[#718078] block">Ideal for wheat growth</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1]">
                    <span className="text-[11px] text-[#718078] block">Air Humidity</span>
                    <span className="text-2xl font-extrabold text-[#26734D]">{MOCK_WEATHER_SUMMARY.humidity}</span>
                    <span className="text-[10px] text-[#718078] block">Optimal range</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#718078]">Rainfall Forecast:</span>
                    <span className="font-bold text-[#172B22]">{MOCK_WEATHER_SUMMARY.rainfallForecast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718078]">Current Season:</span>
                    <span className="font-bold text-[#123D2A]">{MOCK_WEATHER_SUMMARY.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718078]">Wind Speed:</span>
                    <span className="font-mono text-[#172B22]">{MOCK_WEATHER_SUMMARY.windSpeed}</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#718078] italic text-center">
                  [{MOCK_WEATHER_SUMMARY.dataLabel}]
                </p>
              </div>
            </SectionCard>

            {/* Widget 3: Crop Growth Stage Card */}
            <SectionCard
              title="Crop Growth Stage & Harvest Estimate"
              subtitle="Active crop development tracker."
              icon={Sprout}
              action={<StatusBadge variant="success">Sample Status</StatusBadge>}
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#123D2A]">{selectedCrop}</span>
                    <span className="font-mono text-[#26734D] font-bold">{MOCK_CROP_GROWTH_STATUS.daysPlanted}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#172B22]">{MOCK_CROP_GROWTH_STATUS.growthStage}</p>

                  {/* Progress bar */}
                  <div className="w-full bg-[#E0E8E1] rounded-full h-2">
                    <div
                      className="bg-[#26734D] h-2 rounded-full transition-all"
                      style={{ width: `${MOCK_CROP_GROWTH_STATUS.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Estimated Harvest Summary */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E0E8E1] shadow-xs">
                  <span className="text-[11px] uppercase font-bold text-[#718078] tracking-wider block">
                    Estimated Harvest Yield
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-extrabold text-[#172B22]">4.8</span>
                    <span className="text-xs font-bold text-[#26734D]">t / ha (~19 Q / acre)</span>
                  </div>
                  <p className="text-[11px] text-[#718078] mt-1">Sample benchmark calculation</p>
                </div>

                <p className="text-[10px] text-[#718078] italic text-center">
                  [{MOCK_CROP_GROWTH_STATUS.dataLabel}]
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Secondary Farmer Alert Cards: Irrigation & Pest Notices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Irrigation Reminder Card */}
            <SectionCard title="Irrigation Schedule Reminder" icon={Droplets}>
              <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                  <Droplets className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#172B22]">Next Irrigation Due: Tomorrow Morning</h4>
                  <p className="text-xs text-[#718078] leading-relaxed">
                    Crown Root Initiation (CRI) stage requires 3-5 cm field irrigation to support tillering.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Pest-Risk Notice Card */}
            <SectionCard title="Pest & Disease Risk Notice" icon={ShieldAlert}>
              <div className="p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-[#FFF3E0] text-[#B76E00] border border-[#FFE082]">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#172B22]">Pest Risk Level: Low (Yellow Rust &lt; 3%)</h4>
                  <p className="text-xs text-[#718078] leading-relaxed">
                    Current weather conditions are safe. Continue monitoring lower leaf canopy during humid mornings.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Visual Charts Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E0E8E1] pb-2">
              <h3 className="text-base font-bold text-[#172B22]">Regional Harvest Yields & Monsoon Patterns</h3>
              <StatusBadge variant="neutral">Sample Reference Data</StatusBadge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <SectionCard
                className="lg:col-span-7"
                title="Illustrative Crop Yield Comparison (t/ha)"
                subtitle="Comparing baseline reference vs simulated model harvest yields."
                icon={BarChart3}
              >
                <IllustrativeYieldBarChart height={270} />
              </SectionCard>

              <SectionCard
                className="lg:col-span-5"
                title="Sample Crop Land Distribution"
                subtitle="Percentage share of major crops in sample agricultural clusters."
                icon={Layers}
              >
                <CropDistributionChart height={270} />
              </SectionCard>
            </div>

            <SectionCard
              title="Monsoon Rainfall Trajectory (mm)"
              subtitle="Sample monthly rainfall pattern from June Kharif monsoon to Rabi winter."
              icon={CloudRain}
            >
              <RainfallTrendChart height={240} />
            </SectionCard>
          </div>

          {/* Recent Calculations Table */}
          <SectionCard
            title="Recent Farm Demonstration Calculations"
            subtitle="Log of sample yield estimations for Indian farming zones."
            icon={Activity}
            action={
              <div className="relative">
                <Search className="w-4 h-4 text-[#718078] absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search farm records..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg pl-8 pr-3 py-1 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
                />
              </div>
            }
          >
            {filteredActivities.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#172B22]">
                  <thead className="bg-[#F5F8F4] border-b border-[#E0E8E1] text-[#718078] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Run ID</th>
                      <th className="py-2.5 px-3">Crop Name</th>
                      <th className="py-2.5 px-3">Region</th>
                      <th className="py-2.5 px-3">Field Inputs</th>
                      <th className="py-2.5 px-3">Sample Output</th>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E8E1]">
                    {filteredActivities.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F5F8F4]/60 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#718078]">{row.id}</td>
                        <td className="py-2.5 px-3 font-bold text-[#123D2A]">{row.crop}</td>
                        <td className="py-2.5 px-3 text-[#718078]">{row.region}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-[#172B22]">{row.inputs}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#26734D]">{row.illustrativeYield}</td>
                        <td className="py-2.5 px-3 text-[#718078] text-[11px]">{row.timestamp}</td>
                        <td className="py-2.5 px-3">
                          <StatusBadge variant="success" size="sm">
                            {row.status}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No Matching Farm Records"
                description={`No sample records matching "${tableSearch}". Try clearing your search.`}
                icon={Activity}
                actionLabel="Reset Search"
                onAction={() => setTableSearch('')}
              />
            )}
          </SectionCard>
        </>
      )}

      {/* View My Farm Overlay Modal */}
      {farmModalOpen && (
        <Modal
          isOpen={farmModalOpen}
          onClose={() => setFarmModalOpen(false)}
          title={savedProfile ? "My Farm Profile & Field Summary" : "My Farm Profile & Field Summary (Sample Record)"}
        >
          <div className="space-y-4 text-xs text-[#172B22]">
            <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
              <span className="font-bold text-[#123D2A] text-sm">
                Farm Location: {savedProfile ? `${savedProfile.district}, ${savedProfile.state}` : 'Ludhiana District, Punjab (Indo-Gangetic Plain)'}
              </span>
              <p className="text-[#718078]">
                Village / PIN: {savedProfile ? (savedProfile.villageOrPin || 'N/A') : 'Model Town (PIN: 141001)'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white">
                <span className="text-[#718078] block">Total Land Area</span>
                <span className="text-base font-bold text-[#172B22]">
                  {savedProfile ? `${savedProfile.farmArea} ${savedProfile.areaUnit}` : '4.5 Acres (1.82 ha)'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white">
                <span className="text-[#718078] block">Soil Type</span>
                <span className="text-base font-bold text-[#172B22]">
                  {savedProfile ? savedProfile.soilType : 'Fertile Alluvial Loam'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white">
                <span className="text-[#718078] block">Primary Water Source</span>
                <span className="text-base font-bold text-[#172B22]">
                  {savedProfile ? savedProfile.irrigationMethod : 'Canal & Tube Well'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#E0E8E1] bg-white">
                <span className="text-[#718078] block">Active Crop & Stage</span>
                <span className="text-base font-bold text-[#26734D]">
                  {savedProfile ? `${savedProfile.crop}` : 'Wheat (CRI Stage)'}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#718078] italic text-center">
              {savedProfile
                ? '[Saved in Local Device Storage]'
                : '[Note: Farm details above represent a sample farm profile for demonstration purposes.]'}
            </p>

            <div className="pt-2 flex justify-between items-center">
              <PrimaryButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setFarmModalOpen(false);
                  navigate('/my-farm');
                }}
                icon={Tractor}
              >
                {savedProfile ? 'Edit Farm Setup' : 'Setup My Farm Profile'}
              </PrimaryButton>

              <PrimaryButton variant="primary" size="sm" onClick={() => setFarmModalOpen(false)}>
                Close Farm Profile
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Overview;
