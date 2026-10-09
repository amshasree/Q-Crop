import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  User,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { useAuth } from '../context/AuthContext';

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
  'Other'
];

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: 'Punjab',
    district: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.district.trim()) {
      setErrorMsg('Please enter your district name.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both password inputs.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = register({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        state: formData.state,
        district: formData.district.trim(),
        password: formData.password
      });

      setIsSubmitting(false);

      if (res.success) {
        navigate('/my-farm');
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    }, 400);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 pt-2 sm:pt-6">
      <PageHeader
        title="Create Farmer Account (नయా किसान पंजीकरण)"
        subtitle="Register to personalize crop advice, record soil tests, and save your farm profile."
        breadcrumb={['Quantum Farming', 'Register']}
        icon={UserPlus}
        actions={
          <StatusBadge variant="success" icon={ShieldCheck}>
            Free Platform Access
          </StatusBadge>
        }
      />

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-[#FFEBEE] border border-[#FFCDD2] text-[#B71C1C] flex items-center space-x-2.5 text-xs font-semibold shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#C62828] shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <SectionCard title="Farmer Registration Form" icon={UserPlus}>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
              Full Name (किसान का नाम) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="e.g. Gurpreet Singh / Ramesh Kumar"
                className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
              />
            </div>
          </div>

          {/* Mobile Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                Mobile Number (10-Digits) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="farmer@example.com"
                className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
              />
            </div>
          </div>

          {/* State & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                State (राज्य) <span className="text-red-600">*</span>
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full bg-white border border-[#E0E8E1] rounded-lg px-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                District (ज़िला) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
                <input
                  id="district"
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="e.g. Ludhiana / Karnal"
                  className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
                />
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-8 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-8 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center min-h-[44px]"
              isLoading={isSubmitting}
              icon={UserPlus}
            >
              Complete Registration & Create Account
            </PrimaryButton>
          </div>
        </form>
      </SectionCard>

      {/* Link to Login */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-center text-xs text-[#718078] space-y-1 shadow-xs">
        <p>Already have a farmer account?</p>
        <Link
          to="/login"
          className="text-[#123D2A] font-extrabold hover:underline inline-flex items-center gap-1 text-sm pt-1"
        >
          <LogIn className="w-4 h-4 text-[#26734D]" /> Sign In to Existing Account
        </Link>
      </div>
    </div>
  );
};

export default Register;
