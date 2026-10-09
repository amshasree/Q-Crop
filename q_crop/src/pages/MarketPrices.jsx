import React, { useState, useEffect, useMemo } from 'react';
import {
  IndianRupee,
  Search,
  Filter,
  MapPin,
  RefreshCw,
  Info,
  ShieldCheck,
  Tractor,
  ServerOff,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
  AlertCircle,
  Truck,
  Layers,
  HelpCircle
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import {
  fetchMarketPrices,
  SAMPLE_MARKET_PRICES
} from '../services/marketPriceService';
import { getFarmProfile } from '../utils/farmStorage';

const CROP_FILTER_OPTIONS = [
  'All Crops',
  'Wheat (गेहूं)',
  'Paddy / Rice (धान)',
  'Maize (मक्का)',
  'Cotton (कपास)',
  'Mustard (सरसों)'
];

const STATE_FILTER_OPTIONS = [
  'All States',
  'Punjab',
  'Haryana',
  'Madhya Pradesh',
  'Gujarat',
  'Rajasthan',
  'Bihar'
];

export const MarketPrices = () => {
  // Filters state
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedState, setSelectedState] = useState('All States');
  const [searchTerm, setSearchTerm] = useState('');
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [farmProfile, setFarmProfile] = useState(null);
  const [prefillNotice, setPrefillNotice] = useState(false);

  const loadPrices = async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const res = await fetchMarketPrices({
        crop: selectedCrop,
        state: selectedState,
        search: searchTerm
      });
      if (res.success) {
        setMarketData(res);
      } else {
        setErrorState('Could not fetch market prices.');
      }
    } catch (err) {
      setErrorState('Market price API service is disconnected or unreachable.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();

    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, [selectedCrop, selectedState, searchTerm]);

  const handlePrefillFilters = () => {
    if (!farmProfile) return;

    let matchedCrop = 'Wheat (गेहूं)';
    const cStr = farmProfile.crop.toLowerCase();
    if (cStr.includes('rice') || cStr.includes('paddy')) matchedCrop = 'Paddy / Rice (धान)';
    else if (cStr.includes('wheat')) matchedCrop = 'Wheat (गेहूं)';
    else if (cStr.includes('maize')) matchedCrop = 'Maize (मक्का)';
    else if (cStr.includes('cotton')) matchedCrop = 'Cotton (कपास)';

    setSelectedCrop(matchedCrop);
    if (farmProfile.state && STATE_FILTER_OPTIONS.includes(farmProfile.state)) {
      setSelectedState(farmProfile.state);
    } else {
      setSelectedState('All States');
    }

    setPrefillNotice(true);
    setTimeout(() => setPrefillNotice(false), 3500);
  };

  const handleTestErrorState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMarketData(null);
      setErrorState('Simulated Error: Market Price API endpoint (VITE_MARKET_PRICE_API_URL) is unavailable.');
    }, 600);
  };

  // Group prices for comparison
  const comparisonRecords = useMemo(() => {
    if (!marketData?.records) return [];
    return marketData.records.slice(0, 4);
  }, [marketData]);

  return (
    <div className="space-y-6">
      {/* Sample Market Price Mode Banner */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">Sample Market Price Mode: </span>
            Prices listed below represent sample benchmark figures for prototyping. They are not live Agmarknet or e-NAM real-time feeds. Verified data can be connected via <code className="bg-[#F5F8F4] px-1 py-0.5 rounded text-[#26734D]">VITE_MARKET_PRICE_API_URL</code>.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm">
          Sample Price Data
        </StatusBadge>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Indian Mandi Market Prices (मंडी भाव)"
        subtitle="Compare modal market prices, min-max ranges, and arrival trends across agricultural mandis in India."
        breadcrumb={['Quantum Farming', 'Market Prices']}
        icon={IndianRupee}
        actions={
          <div className="flex items-center space-x-2">
            <button
              onClick={loadPrices}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white border border-[#E0E8E1] hover:bg-[#F5F8F4] text-[#123D2A] transition-colors cursor-pointer"
              title="Refresh mandi prices"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <StatusBadge variant={marketData?.isLive ? 'success' : 'warning'}>
              {marketData?.isLive ? 'Live Agmarknet Feed' : 'Sample Data'}
            </StatusBadge>
          </div>
        }
      />

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          {/* Crop Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#718078] uppercase tracking-wider mb-1">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
            >
              {CROP_FILTER_OPTIONS.map((cr) => (
                <option key={cr} value={cr}>
                  {cr}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#718078] uppercase tracking-wider mb-1">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
            >
              {STATE_FILTER_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-[11px] font-bold text-[#718078] uppercase tracking-wider mb-1">
              Search Mandi / Variety
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#718078] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search market or variety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg pl-8 pr-3 py-1.5 text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {farmProfile && (
            <PrimaryButton variant="outline" size="sm" onClick={handlePrefillFilters} icon={Tractor}>
              Prefill My Farm Crop
            </PrimaryButton>
          )}

          <button
            onClick={handleTestErrorState}
            className="text-[11px] text-[#718078] hover:text-[#123D2A] underline cursor-pointer"
          >
            Test Disconnected State
          </button>
        </div>
      </div>

      {prefillNotice && (
        <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center space-x-2 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
          <span>Filters prefilled with your saved crop ({selectedCrop})!</span>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading ? (
        <SectionCard title="Fetching Mandi Prices" icon={IndianRupee}>
          <LoadingSpinner text="Retrieving prevailing market prices and arrival records..." />
        </SectionCard>
      ) : errorState ? (
        /* ERROR / UNAVAILABLE STATE */
        <SectionCard title="Market Price Service Unavailable" icon={ServerOff}>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] flex items-start space-x-3">
              <ServerOff className="w-6 h-6 text-[#B76E00] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#172B22]">Agmarknet / Mandi API Disconnected</h4>
                <p className="text-xs text-[#718078] leading-relaxed">{errorState}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <PrimaryButton variant="primary" size="sm" onClick={loadPrices}>
                Restore Sample Prices Mode
              </PrimaryButton>
            </div>
          </div>
        </SectionCard>
      ) : (
        /* MAIN MARKET PRICES CONTENT */
        <div className="space-y-6">
          {/* MARKET PRICE COMPARISON CARD */}
          {comparisonRecords.length > 1 && (
            <SectionCard
              title="Regional Mandi Price Comparison"
              subtitle="Comparing prevailing modal prices across neighboring markets."
              icon={TrendingUp}
              action={<StatusBadge variant="neutral">Price Comparison</StatusBadge>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {comparisonRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] space-y-1.5"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#123D2A]">{rec.market}</span>
                      <span className="text-[10px] text-[#718078]">{rec.district}</span>
                    </div>
                    <span className="text-xl font-extrabold text-[#172B22] block">
                      ₹{rec.modalPrice.toLocaleString('en-IN')} / Q
                    </span>
                    <p className="text-[11px] text-[#718078]">
                      Range: ₹{rec.minPrice} - ₹{rec.maxPrice}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* MAIN PRICE TABLE */}
          <SectionCard
            title="Prevailing Mandi Rates Table"
            subtitle={`Showing ${marketData.records.length} market records.`}
            icon={Building2}
            action={<StatusBadge variant="success">{marketData.source}</StatusBadge>}
          >
            {marketData.records.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#172B22]">
                  <thead className="bg-[#F5F8F4] border-b border-[#E0E8E1] text-[#718078] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-3">Crop & Variety</th>
                      <th className="py-3 px-3">Mandi / Market</th>
                      <th className="py-3 px-3">District / State</th>
                      <th className="py-3 px-3 text-right">Modal Price</th>
                      <th className="py-3 px-3 text-right">Min - Max Range</th>
                      <th className="py-3 px-3">Updated At</th>
                      <th className="py-3 px-3">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E8E1]">
                    {marketData.records.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F5F8F4]/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-[#123D2A]">
                          {row.crop}
                          <span className="block text-[11px] font-normal text-[#718078]">{row.variety}</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#172B22]">{row.market}</td>
                        <td className="py-3 px-3 text-[#718078]">
                          {row.district}, {row.state}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-base font-extrabold text-[#26734D]">
                          ₹{row.modalPrice.toLocaleString('en-IN')} / Q
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-xs text-[#718078]">
                          ₹{row.minPrice} - ₹{row.maxPrice}
                        </td>
                        <td className="py-3 px-3 text-[11px] text-[#718078]">{row.updatedAt}</td>
                        <td className="py-3 px-3">
                          <StatusBadge variant="neutral" size="sm">
                            {row.source}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No Matching Mandi Records Found"
                description={`No market price records match your selected filters (${selectedCrop}, ${selectedState}). Try clearing search or resetting filters.`}
                icon={IndianRupee}
                actionLabel="Reset Filters"
                onAction={() => {
                  setSelectedCrop('All Crops');
                  setSelectedState('All States');
                  setSearchTerm('');
                }}
              />
            )}
          </SectionCard>

          {/* PRICE VARIATION FACTORS & NO GUARANTEE DISCLAIMER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Why Do Mandi Prices Vary?" icon={Truck}>
              <ul className="space-y-2 text-xs text-[#718078]">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-[#123D2A] shrink-0">• Grain Moisture & Quality Grade:</span>
                  <span>Produce with low moisture (&lt; 12%) and clean uniform seed size commands premium prices over damp or damaged grain.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-[#123D2A] shrink-0">• Daily Arrival Volume:</span>
                  <span>Heavy crop arrivals during peak harvest season temporarily depress spot auction rates.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-[#123D2A] shrink-0">• Freight & Transport Distance:</span>
                  <span>Mandis connected to major railway sidings or processing mills offer higher bids due to lower logistics costs.</span>
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="No Future Price Guarantee Disclaimer" icon={AlertCircle}>
              <div className="p-3.5 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] space-y-1 text-xs">
                <h4 className="font-bold text-[#172B22]">Non-Binding Prevailing Rates Notice</h4>
                <p className="text-[#7A4900] leading-relaxed">
                  Market prices change daily based on open mandi auctions and trader bidding. Listed rates are indicative benchmarks for planning purposes only. We do not guarantee future market prices or mandi purchase agreements.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
