import React from 'react';
import { ShieldAlert, Terminal, AlertTriangle, X } from 'lucide-react';

interface PhishingAwarenessProps {
  onClose: () => void;
}

const PhishingAwareness: React.FC<PhishingAwarenessProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0A2540]/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="h-2 w-full bg-red-500" />
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0A2540] tracking-tight">YOU'VE BEEN "PHISHED"!</h2>
              <p className="text-red-600 font-bold uppercase tracking-widest text-xs">Phishing Awareness Activity</p>
            </div>
            <button 
              onClick={onClose}
              className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#425466]" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <p className="text-[#0A2540] font-bold">What just happened?</p>
              </div>
              <p className="text-[#425466] leading-relaxed">
                You clicked on a highly sensationalized advertisement (clickbait) and entered your credentials into a page that looked legitimate, but was actually a trap. In the real world, your <span className="font-bold text-[#0A2540]">email, password, and MFA code</span> would now belong to a cybercriminal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-[#00dc82]" />
                  <p className="text-sm font-bold text-[#0A2540]">The Attack</p>
                </div>
                <ul className="text-xs text-[#425466] space-y-2">
                  <li className="flex gap-2"><span>•</span> <span>Clickbait used fear and urgency.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>Redirected even though you were logged in.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>Captured your credentials and MFA code.</span></li>
                </ul>
              </div>
              
              <div className="p-5 border border-gray-100 rounded-2xl bg-[#00dc82]/5 border-[#00dc82]/20">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-[#00dc82]" />
                  <p className="text-sm font-bold text-[#0A2540]">The Lesson</p>
                </div>
                <ul className="text-xs text-[#425466] space-y-2">
                  <li className="flex gap-2"><span>•</span> <span>Always check the URL before typing.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>Be wary of "Security Alerts" from ads.</span></li>
                  <li className="flex gap-2"><span>•</span> <span>Legitimate sites rarely ask for passwords again.</span></li>
                </ul>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-[#0A2540] text-white font-bold py-4 rounded-2xl hover:bg-[#0A2540]/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              I UNDERSTAND THE RISK - BACK TO DASHBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingAwareness;
