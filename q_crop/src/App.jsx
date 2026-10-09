import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Overview } from './pages/Overview';
import { MyFarm } from './pages/MyFarm';
import { Weather } from './pages/Weather';
import { SoilHealth } from './pages/SoilHealth';
import { MarketPrices } from './pages/MarketPrices';
import { PredictYield } from './pages/PredictYield';
import { CropImageAnalysis } from './pages/CropImageAnalysis';
import { Analytics } from './pages/Analytics';
import { CropInsights } from './pages/CropInsights';
import { QuantumTechnology } from './pages/QuantumTechnology';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Feature Routes (Login Required) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-image-analysis"
            element={
              <ProtectedRoute>
                <CropImageAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-farm"
            element={
              <ProtectedRoute>
                <MyFarm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soil-health"
            element={
              <ProtectedRoute>
                <SoilHealth />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-prices"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <PredictYield />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-insights"
            element={
              <ProtectedRoute>
                <CropInsights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quantum-tech"
            element={
              <ProtectedRoute>
                <QuantumTechnology />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
