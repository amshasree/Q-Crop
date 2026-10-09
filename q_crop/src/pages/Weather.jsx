import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  RefreshCw,
  Info,
  ShieldCheck,
  AlertTriangle,
  Tractor,
  ShieldAlert,
  ServerOff,
  CheckCircle2,
  Calendar,
  CloudLightning,
  Umbrella
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import {
  fetchWeatherData,
  POPULAR_FARM_LOCATIONS
} from '../services/weatherService';
import { getFarmProfile } from '../utils/farmStorage';

export const Weather = () => {
  // State
  const [selectedLocation, setSelectedLocation] = useState('Ludhiana, Punjab');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [farmProfile, setFarmProfile] = useState(null);
  const [prefillNotice, setPrefillNotice] = useState(false);

  // Icon map for forecast
  const forecastIconMap = {
    Sun,
    CloudSun,
    CloudRain,
    CloudLightning
  };

  const loadWeather = async (location) => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const res = await fetchWeatherData(location);
      if (res.success) {
        setWeatherData(res);
      } else {
        setErrorState('Could not fetch weather data.');
      }
    } catch (err) {
      setErrorState('Weather service API is currently disconnected or unreachable.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation);

    const profile = getFarmProfile();
    if (profile) {
      setFarmProfile(profile);
    }
  }, []);

  const handleLocationChange = (newLoc) => {
    setSelectedLocation(newLoc);
    loadWeather(newLoc);
  };

  const handlePrefillLocation = () => {
    if (!farmProfile) return;
    const farmLoc = `${farmProfile.district}, ${farmProfile.state}`;
    setSelectedLocation(farmLoc);
    loadWeather(farmLoc);
    setPrefillNotice(true);
    setTimeout(() => setPrefillNotice(false), 3500);
  };

  const handleTestErrorState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setWeatherData(null);
      setErrorState('Simulated Error: Weather service API endpoint (VITE_WEATHER_API_URL) is unavailable.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Sample Weather Data Banner */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-[#718078] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#172B22]">Sample Weather Data Mode: </span>
            All meteorological values below represent sample benchmark figures for prototyping. They are not live meteorological feeds. Live weather API can be connected via <code className="bg-[#F5F8F4] px-1 py-0.5 rounded text-[#26734D]">VITE_WEATHER_API_URL</code>.
          </div>
        </div>
        <StatusBadge variant="lime" size="sm">
          Sample Weather Mode
        </StatusBadge>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Agri-Weather & Forecast Center (मौसम व कृषि सलाह)"
        subtitle="Check temperature, rainfall probability, humidity, and wind conditions tailored for daily farming operations."
        breadcrumb={['Quantum Farming', 'Weather Center']}
        icon={CloudSun}
        actions={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => loadWeather(selectedLocation)}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white border border-[#E0E8E1] hover:bg-[#F5F8F4] text-[#123D2A] transition-colors cursor-pointer"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <StatusBadge variant={weatherData?.isLive ? 'success' : 'warning'}>
              {weatherData?.isLive ? 'Live API Feed' : 'Sample Data'}
            </StatusBadge>
          </div>
        }
      />

      {/* Location Selector Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E0E8E1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1">
          <MapPin className="w-5 h-5 text-[#26734D] shrink-0" />
          <div className="flex-1 space-y-1">
            <label htmlFor="location-select" className="text-[11px] uppercase font-bold text-[#718078] tracking-wider block">
              Select Farming District / Region
            </label>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full sm:max-w-xs bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold text-[#123D2A] focus:outline-none focus:border-[#26734D]"
            >
              {POPULAR_FARM_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name} ({loc.region})
                </option>
              ))}
              {!POPULAR_FARM_LOCATIONS.some((l) => l.name === selectedLocation) && (
                <option value={selectedLocation}>{selectedLocation}</option>
              )}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {farmProfile && (
            <PrimaryButton variant="outline" size="sm" onClick={handlePrefillLocation} icon={Tractor}>
              Use My Farm Location
            </PrimaryButton>
          )}

          <button
            onClick={handleTestErrorState}
            className="text-[11px] text-[#718078] hover:text-[#123D2A] underline cursor-pointer"
          >
            Test Unavailable API State
          </button>
        </div>
      </div>

      {prefillNotice && (
        <div className="p-3 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] text-[#1B5E20] flex items-center space-x-2 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#26734D]" />
          <span>Weather location set to your saved farm district ({selectedLocation})!</span>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading ? (
        <SectionCard title="Fetching Weather Conditions" icon={CloudSun}>
          <LoadingSpinner text="Retrieving meteorological metrics and multi-day agricultural forecast..." />
        </SectionCard>
      ) : errorState ? (
        /* ERROR / UNAVAILABLE STATE */
        <SectionCard title="Weather Service Unavailable" icon={ServerOff}>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-[#B76E00] flex items-start space-x-3">
              <ServerOff className="w-6 h-6 text-[#B76E00] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#172B22]">Weather Service API Disconnected</h4>
                <p className="text-xs text-[#718078] leading-relaxed">{errorState}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <PrimaryButton variant="primary" size="sm" onClick={() => loadWeather('Ludhiana, Punjab')}>
                Restore Sample Data Mode
              </PrimaryButton>
            </div>
          </div>
        </SectionCard>
      ) : (
        /* MAIN WEATHER CONTENT */
        <div className="space-y-6">
          {/* Top Row: Current Weather & Farming Implications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* CURRENT WEATHER CARD (5 cols) */}
            <div className="lg:col-span-5">
              <SectionCard
                title="Current Weather Conditions"
                subtitle={`Location: ${weatherData.location}`}
                icon={CloudSun}
                action={<StatusBadge variant="neutral">{weatherData.updatedAt}</StatusBadge>}
              >
                <div className="space-y-6">
                  {/* Large Temp Banner */}
                  <div className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#172B22]">
                          {weatherData.current.temperature}°C
                        </span>
                        <span className="text-xs font-semibold text-[#718078]">
                          Feels like {weatherData.current.feelsLike}°C
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#26734D] mt-1">
                        {weatherData.current.condition}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#E8F5E9] text-[#123D2A] border border-[#C8E6C9]">
                      <CloudSun className="w-10 h-10" />
                    </div>
                  </div>

                  {/* 4 Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white border border-[#E0E8E1]">
                      <div className="flex items-center space-x-1.5 text-[#718078] mb-1">
                        <Droplets className="w-4 h-4 text-[#26734D]" />
                        <span>Air Humidity</span>
                      </div>
                      <span className="text-lg font-bold text-[#172B22]">{weatherData.current.humidity}%</span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[#E0E8E1]">
                      <div className="flex items-center space-x-1.5 text-[#718078] mb-1">
                        <Wind className="w-4 h-4 text-[#26734D]" />
                        <span>Wind Speed</span>
                      </div>
                      <span className="text-lg font-bold text-[#172B22]">
                        {weatherData.current.windSpeed} km/h ({weatherData.current.windDirection})
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[#E0E8E1]">
                      <div className="flex items-center space-x-1.5 text-[#718078] mb-1">
                        <Umbrella className="w-4 h-4 text-[#26734D]" />
                        <span>Rainfall Chance</span>
                      </div>
                      <span className="text-lg font-bold text-[#26734D]">
                        {weatherData.current.rainfallChance}% ({weatherData.current.rainfallAmount} mm)
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[#E0E8E1]">
                      <div className="flex items-center space-x-1.5 text-[#718078] mb-1">
                        <Sun className="w-4 h-4 text-[#26734D]" />
                        <span>UV Index</span>
                      </div>
                      <span className="text-lg font-bold text-[#172B22]">{weatherData.current.uvIndex}</span>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* FARMING IMPLICATIONS ADVISORY (7 cols) */}
            <div className="lg:col-span-7">
              <SectionCard
                title="Farming Weather Implications & Advisory"
                subtitle="Practical suggestions based on current & upcoming forecast."
                icon={Tractor}
                action={<StatusBadge variant="success">Agricultural Guidance</StatusBadge>}
              >
                <div className="space-y-3.5">
                  {weatherData.farmingImplications.map((imp) => (
                    <div
                      key={imp.id}
                      className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                        imp.type === 'warning'
                          ? 'bg-[#FFF8E1] border-[#FFE082] text-[#7A4900]'
                          : imp.type === 'caution'
                          ? 'bg-[#FFEBEE] border-[#FFCDD2] text-[#B71C1C]'
                          : 'bg-[#F1F8EC] border-[#A3D977] text-[#123D2A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold uppercase tracking-wider text-[10px]">
                          {imp.category}
                        </span>
                        <StatusBadge
                          variant={imp.type === 'warning' ? 'warning' : imp.type === 'caution' ? 'error' : 'success'}
                          size="sm"
                        >
                          {imp.type === 'warning' ? 'Caution Action' : imp.type === 'caution' ? 'Water Advisory' : 'Field Advisory'}
                        </StatusBadge>
                      </div>
                      <h4 className="font-bold text-sm text-[#172B22]">{imp.title}</h4>
                      <p className="leading-relaxed text-[#718078]">{imp.advice}</p>
                    </div>
                  ))}

                  {/* Safety Note on Severe Alerts */}
                  <div className="p-3 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] text-[11px] text-[#718078] italic">
                    Emergency Alert Note: Automated severe weather warnings are disabled in sample demo mode to prevent false emergency alerts.
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>

          {/* MULTI-DAY FORECAST SECTION */}
          <SectionCard
            title="5-Day Meteorological Forecast"
            subtitle="Daily temperature ranges, rainfall probability, expected amount, and wind conditions."
            icon={Calendar}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {weatherData.forecast.map((fc, idx) => {
                const FcIcon = forecastIconMap[fc.iconName] || CloudSun;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F5F8F4] border border-[#E0E8E1] hover:border-[#26734D] transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1 text-center">
                      <span className="text-xs font-extrabold text-[#172B22] block">{fc.day}</span>
                      <span className="text-[10px] text-[#718078] block font-mono">{fc.date}</span>
                    </div>

                    <div className="flex justify-center my-1 text-[#26734D]">
                      <FcIcon className="w-8 h-8" />
                    </div>

                    <div className="text-center">
                      <span className="text-lg font-extrabold text-[#172B22]">
                        {fc.highTemp}° / <span className="text-[#718078] font-semibold">{fc.lowTemp}°C</span>
                      </span>
                      <p className="text-[11px] font-semibold text-[#26734D] mt-0.5">{fc.condition}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E0E8E1] space-y-1 text-[11px] text-[#718078]">
                      <div className="flex justify-between">
                        <span>Rain Chance:</span>
                        <span className="font-bold text-[#172B22]">{fc.rainChance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-bold text-[#26734D]">{fc.rainAmount} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind:</span>
                        <span className="font-mono">{fc.windSpeed} km/h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
};

export default Weather;
