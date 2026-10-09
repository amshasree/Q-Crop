import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Filter,
  RotateCcw,
  CloudRain,
  Thermometer,
  Layers,
  Info,
  Globe,
  ScatterChart as ScatterIcon
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { StatCard } from '../components/common/StatCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { CropYieldComparisonBarChart } from '../components/charts/CropYieldComparisonBarChart';
import { RainfallYieldScatterPlot } from '../components/charts/RainfallYieldScatterPlot';
import { RainfallTrendChart } from '../components/charts/RainfallTrendChart';
import { TemperatureTrendChart } from '../components/charts/TemperatureTrendChart';
import { CropDistributionChart } from '../components/charts/CropDistributionChart';
import { ANALYTICS_SAMPLE_RECORDS } from '../data/demoData';

export const Analytics = () => {
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredRecords = useMemo(() => {
    return ANALYTICS_SAMPLE_RECORDS.filter((rec) => {
      const matchCrop = selectedCrop === 'All' || rec.crop.toLowerCase().includes(selectedCrop.toLowerCase());
      const matchSeason = selectedSeason === 'All' || rec.season === selectedSeason;
      const matchRegion = selectedRegion === 'All' || rec.region.toLowerCase().includes(selectedRegion.toLowerCase());
      return matchCrop && matchSeason && matchRegion;
    });
  }, [selectedCrop, selectedSeason, selectedRegion]);

  const recordCount = filteredRecords.length;

  const avgIllustrativeYield = useMemo(() => {
    if (recordCount === 0) return 'N/A';
    const total = filteredRecords.reduce((sum, r) => sum + r.illustrativeYield, 0);
    return `${(total / recordCount).toFixed(2)} t/ha`;
  }, [filteredRecords, recordCount]);

  const aggregatedCropYieldData = useMemo(() => {
    if (recordCount === 0) return [];
    const map = {};
    filteredRecords.forEach((r) => {
      if (!map[r.crop]) {
        map[r.crop] = { crop: r.crop, totalYield: 0, totalBaseline: 0, count: 0 };
      }
      map[r.crop].totalYield += r.illustrativeYield;
      map[r.crop].totalBaseline += r.baselineYield;
      map[r.crop].count += 1;
    });

    return Object.values(map).map((item) => ({
      crop: item.crop,
      illustrativeYield: parseFloat((item.totalYield / item.count).toFixed(2)),
      baselineYield: parseFloat((item.totalBaseline / item.count).toFixed(2))
    }));
  }, [filteredRecords, recordCount]);

  const handleResetFilters = () => {
    setSelectedCrop('All');
    setSelectedSeason('All');
    setSelectedRegion('All');
  };

  const hasActiveFilters = selectedCrop !== 'All' || selectedSeason !== 'All' || selectedRegion !== 'All';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Crop Trends & Weather Benchmarks"
        subtitle="Compare sample harvest yields across Indian states and analyze monsoon rainfall trends."
        breadcrumb={['Quantum Farming', 'Crop Trends']}
        icon={BarChart3}
        actions={
          <StatusBadge variant="neutral" icon={Info}>
            Illustrative Reference Charts
          </StatusBadge>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#E0E8E1] pb-2">
          <div className="flex items-center space-x-2 text-[#123D2A] font-bold text-xs uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#26734D]" />
            <span>Select Region & Crop Filters</span>
          </div>
          {hasActiveFilters && (
            <PrimaryButton variant="ghost" size="sm" onClick={handleResetFilters} icon={RotateCcw}>
              Reset Filters
            </PrimaryButton>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cropFilter" className="block text-[11px] font-bold text-[#718078] mb-1">
              Crop Name
            </label>
            <select
              id="cropFilter"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
            >
              <option value="All">All Crops (Paddy, Wheat, Maize, Cotton, Sugarcane)</option>
              <option value="Paddy">Paddy / Rice (धान)</option>
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Maize">Maize (मक्का)</option>
              <option value="Cotton">Cotton (कपास)</option>
              <option value="Sugarcane">Sugarcane (गन्ना)</option>
            </select>
          </div>

          <div>
            <label htmlFor="seasonFilter" className="block text-[11px] font-bold text-[#718078] mb-1">
              Crop Season
            </label>
            <select
              id="seasonFilter"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
            >
              <option value="All">All Seasons</option>
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Rabi">Rabi (Winter)</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          <div>
            <label htmlFor="regionFilter" className="block text-[11px] font-bold text-[#718078] mb-1">
              Farming Zone / Region
            </label>
            <select
              id="regionFilter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs text-[#172B22] focus:outline-none focus:border-[#26734D]"
            >
              <option value="All">All Regions</option>
              <option value="Indo-Gangetic Plain">Indo-Gangetic Plain (Punjab/Haryana/UP)</option>
              <option value="Deccan Plateau">Deccan Plateau (Maharashtra/MP/Karnataka)</option>
              <option value="Coastal Andhra">Coastal Andhra & Tamil Nadu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sample Records"
          value={recordCount}
          unit="Records"
          subtitle="Filtered demonstration records"
          icon={BarChart3}
        />
        <StatCard
          title="Selected Crop"
          value={selectedCrop === 'All' ? 'All Crops' : selectedCrop}
          subtitle="Filtered crop scope"
          icon={Globe}
        />
        <StatCard
          title="Avg Sample Yield"
          value={avgIllustrativeYield}
          subtitle="Illustrative average"
          icon={TrendingUp}
        />
        <StatCard
          title="Selected Season"
          value={selectedSeason === 'All' ? 'All Seasons' : selectedSeason}
          subtitle="Filtered season scope"
          icon={Filter}
        />
      </div>

      {/* Charts Grid */}
      {recordCount > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <SectionCard
              className="lg:col-span-6"
              title="1. Crop Yield Comparison (t/ha)"
              subtitle="Comparing baseline reference vs illustrative yield estimates across crops."
              icon={BarChart3}
            >
              <CropYieldComparisonBarChart data={aggregatedCropYieldData} height={280} />
            </SectionCard>

            <SectionCard
              className="lg:col-span-6"
              title="2. Rainfall vs Yield Scatter Plot"
              subtitle="Showing sample relationship between seasonal rainfall (mm) and yield (t/ha)."
              icon={ScatterIcon}
            >
              <RainfallYieldScatterPlot records={filteredRecords} height={280} />
            </SectionCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <SectionCard
              className="lg:col-span-6"
              title="3. Monsoon Rainfall Trajectory (mm)"
              subtitle="Sample monthly rainfall pattern from June Kharif monsoon to Rabi winter."
              icon={CloudRain}
            >
              <RainfallTrendChart height={260} />
            </SectionCard>

            <SectionCard
              className="lg:col-span-6"
              title="4. Seasonal Temperature Trajectory (°C)"
              subtitle="Sample monthly average temperature pattern across farming zones."
              icon={Thermometer}
            >
              <TemperatureTrendChart height={260} />
            </SectionCard>
          </div>

          <SectionCard
            title="5. Sample Crop Area Share"
            subtitle="Percentage area share of major crops in sample agricultural clusters."
            icon={Layers}
          >
            <CropDistributionChart height={260} />
          </SectionCard>
        </div>
      ) : (
        <EmptyState
          title="No Matching Demo Records"
          description={`No sample records match Crop: "${selectedCrop}", Season: "${selectedSeason}", Region: "${selectedRegion}". Click below to reset filters.`}
          icon={Filter}
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};

export default Analytics;
