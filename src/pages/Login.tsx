import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PhishingAwareness from '../components/PhishingAwareness';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const BRAND_STYLES: Record<string, { logo: string; name: string; color: string; bgColor: string }> = {
  PaySwift: { logo: '💸', name: 'PaySwift', color: '#00dc82', bgColor: 'bg-[#00dc82]/10' },
  BillingHQ: { logo: '📉', name: 'BillingHQ', color: '#635BFF', bgColor: 'bg-[#635BFF]/10' },
  VaultPay: { logo: '🕵️', name: 'VaultPay', color: '#0A2540', bgColor: 'bg-[#0A2540]/10' },
  ChargeLite: { logo: '🔞', name: 'ChargeLite', color: '#ff4d4d', bgColor: 'bg-[#ff4d4d]/10' },
  Subscript: { logo: '🔥', name: 'Subscript', color: '#9333ea', bgColor: 'bg-[#9333ea]/10' },
  PayBridge: { logo: '🚨', name: 'PayBridge', color: '#f59e0b', bgColor: 'bg-[#f59e0b]/10' },
  FraudShield: { logo: '💀', name: 'FraudShield', color: '#425466', bgColor: 'bg-[#425466]/10' },
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [authData, setAuthData] = useState<{ token: string; user: any } | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSimulation = searchParams.get('simulation') === 'true';
  const brandParam = searchParams.get('brand') || '';
  const [showAwareness, setShowAwareness] = useState(false);

  const brandInfo = isSimulation && BRAND_STYLES[brandParam] 
    ? BRAND_STYLES[brandParam] 
    : { logo: '', name: 'Stripee', color: '#0A2540', bgColor: 'bg-[#0A2540]/10' };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (isSimulation) {
      // Transition to OTP step in simulation mode
      setTimeout(() => {
        setStep('otp');
        setSuccess('A verification code has been sent to your email.');
      }, 800);
      return;
    }

    const endpoint = isRegistering ? '/api/register' : '/api/login';
    const baseUrl = 'http://localhost:5000';

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isRegistering) {
        setSuccess('Registration successful! You can now log in.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
      } else {
        // Just transition to OTP step
        setStep('otp');
        setSuccess('Please enter the 6-digit verification code sent to your email.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    if (isSimulation) {
      // Capture OTP and show awareness modal
      setTimeout(() => {
        setShowAwareness(true);
      }, 800);
      return;
    }

    try {
      const baseUrl = 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      login(data.token, data.user);
      setSuccess('Verification successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message);
      // Clear OTP
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {showAwareness && (
        <PhishingAwareness 
          onClose={() => {
            setShowAwareness(false);
            navigate('/');
          }} 
        />
      )}
      
      
      <div className="w-full max-w-[400px] animate-fade-in relative z-10">
        
        <Link to="/" className="flex flex-col items-center mb-12 group">
          {brandInfo.logo && <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">{brandInfo.logo}</span>}
          <span className="text-[#0A2540] font-extrabold text-4xl tracking-tighter drop-shadow-sm">
            {brandInfo.name}
          </span>
        </Link>
        
        <div className="glass-panel p-8 rounded-2xl shadow-[0_40px_80px_-20px_rgba(10,37,64,0.15)] relative overflow-hidden">
          {isSimulation && <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: brandInfo.color }} />}
          <h2 className="text-2xl font-bold text-[#0A2540] mb-8 tracking-tight">
            {isRegistering ? 'Create your account' : 'Sign in to your account'}
          </h2>

          {step === 'auth' ? (
            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#425466] mb-2">Email address</label>
                <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6F9FC] border border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': `${brandInfo.color}80`, borderColor: email ? brandInfo.color : undefined } as any}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#425466]">Password</label>
                  {!isRegistering && (
                    <a href="#" className="text-xs font-bold text-[#635BFF] hover:text-[#0A2540] transition-colors">Forgot your password?</a>
                  )}
                </div>
                <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F6F9FC] border border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': `${brandInfo.color}80`, borderColor: password ? brandInfo.color : undefined } as any}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
              {success && <div className="text-[#00dc82] text-xs font-bold bg-[#00dc82]/10 p-3 rounded-lg border border-[#00dc82]/20">{success}</div>}

              <button 
                type="submit" 
                className="w-full text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group mt-2"
                style={{ backgroundColor: brandInfo.color }}
              >
                {isRegistering ? 'Register' : 'Continue'} 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-8">
              <div className="text-center">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold bg-[#F6F9FC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00dc82]/50 focus:border-[#00dc82] transition-all"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 text-center">{error}</div>}
              {success && <div className="text-[#00dc82] text-xs font-bold bg-[#00dc82]/10 p-3 rounded-lg border border-[#00dc82]/20 text-center">{success}</div>}

              <div className="space-y-4">
                <button type="submit" className="w-full bg-[#0A2540] text-white py-3 rounded-lg font-bold hover:bg-[#425466] transition-all flex items-center justify-center gap-2 group">
                  Verify Code
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('auth')}
                  className="w-full text-sm font-bold text-[#635BFF] hover:text-[#0A2540] transition-colors"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-grow bg-gray-100"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                <div className="h-[1px] flex-grow bg-gray-100"></div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg text-sm font-bold text-[#0A2540] hover:bg-gray-50 transition-all">
                  <GithubIcon className="w-4 h-4" /> Github
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg text-sm font-bold text-[#0A2540] hover:bg-gray-50 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Google
                </button>
             </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#425466]">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-bold text-[#635BFF] hover:text-[#0A2540] transition-colors"
          >
            {isRegistering ? 'Sign in' : 'Register now'}
          </button>
        </div>

        <div className="mt-12 text-center flex items-center justify-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
           <a href="#" className="hover:text-[#0A2540] transition-colors">Privacy & Terms</a>
           <a href="#" className="hover:text-[#0A2540] transition-colors">Contact</a>
        </div>

      </div>
    </div>
  );
};

export default Login;
