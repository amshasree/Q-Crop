import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LogIn,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sprout,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = login({ phone: phone.trim(), password });
      setIsSubmitting(false);

      if (res.success) {
        navigate(fromPage, { replace: true });
      } else {
        setErrorMsg(res.message || 'Login failed. Check mobile number and password.');
      }
    }, 400);
  };

  const handleDemoFill = () => {
    setPhone('9876543210');
    setPassword('farmer123');
    setErrorMsg('');
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-2 sm:pt-6">
      <PageHeader
        title="Farmer Login (किसान लॉगिन)"
        subtitle="Sign in to your Quantum Farming account to access your saved farm profile and advisory updates."
        breadcrumb={['Quantum Farming', 'Login']}
        icon={LogIn}
        actions={
          <StatusBadge variant="success" icon={ShieldCheck}>
            Secure Account
          </StatusBadge>
        }
      />

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-[#FFEBEE] border border-[#FFCDD2] text-[#B71C1C] flex items-center space-x-2.5 text-xs font-semibold shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#C62828] shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <SectionCard title="Enter Account Details" icon={LogIn}>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Mobile Number Input */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
              Mobile Number (10-Digit Phone) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
              <input
                id="phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 9876543210"
                className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-3 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-[#172B22] uppercase tracking-wider mb-1">
              Password (पासवर्ड) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#718078] absolute left-3 top-3" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white border border-[#E0E8E1] rounded-lg pl-9 pr-10 py-2.5 min-h-[44px] text-xs sm:text-sm text-[#172B22] focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-[#718078] hover:text-[#172B22]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
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
              icon={LogIn}
            >
              Sign In to Account
            </PrimaryButton>
          </div>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-4 pt-4 border-t border-[#E0E8E1] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span className="text-[#718078]">Testing the app?</span>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[#26734D] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Fill Demo Credentials
          </button>
        </div>
      </SectionCard>

      {/* Link to Register */}
      <div className="p-4 rounded-xl bg-white border border-[#E0E8E1] text-center text-xs text-[#718078] space-y-1 shadow-xs">
        <p>New to Quantum Farming platform?</p>
        <Link
          to="/register"
          className="text-[#123D2A] font-extrabold hover:underline inline-flex items-center gap-1 text-sm pt-1"
        >
          <UserPlus className="w-4 h-4 text-[#26734D]" /> Create New Farmer Account (रजिस्टर करें)
        </Link>
      </div>
    </div>
  );
};

export default Login;
