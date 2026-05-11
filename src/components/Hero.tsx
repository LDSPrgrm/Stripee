import React from 'react';
import { ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import GradientBackground from './GradientBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden flex flex-col justify-center">
      <GradientBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 animate-fade-in z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm mb-8 hover:bg-white/20 transition-all cursor-pointer shadow-sm backdrop-blur-md group">
              <span className="flex h-2 w-2 rounded-full bg-[#00dc82] animate-pulse mr-1"></span>
              <span>Announcing Stripee Sessions 2026</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            
            <h1 className="text-5xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[0.95] mb-8 drop-shadow-md">
              Financial <br/> infrastructure <br/>
              <span className="text-gradient">for the internet</span>
            </h1>
            
            <p className="text-[1.15rem] text-white/90 mb-10 max-w-lg leading-relaxed font-medium drop-shadow-sm">
              Millions of companies of all sizes—from startups to Fortune 500s—use Stripee's software and APIs to accept payments, send payouts, and manage their businesses online.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <button className="bg-white text-[#0A2540] px-7 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 flex items-center gap-2 group w-full sm:w-auto justify-center">
                Start now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2 group w-full sm:w-auto justify-center border border-transparent hover:border-white/40">
                Contact sales <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column - 3D Mockup */}
          <div className="lg:col-span-7 hidden lg:block relative mockup-container perspective-1200 pl-10 z-10">
            <div className="mockup-inner relative w-full pt-10">
              
              {/* Main IDE Window */}
              <div className="dark-glass-panel rounded-2xl overflow-hidden relative shadow-2xl z-10 w-full max-w-2xl ml-auto border border-white/20">
                {/* macOS Window Controls */}
                <div className="h-10 bg-[#0A2540]/60 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                  <div className="ml-4 flex gap-4 text-xs font-mono text-[#8F9CA8]">
                    <span className="text-white bg-white/10 px-2 py-0.5 rounded cursor-pointer">payment.js</span>
                    <span className="cursor-pointer hover:text-white transition-colors">webhook.ts</span>
                  </div>
                </div>
                
                {/* Editor Content */}
                <div className="p-6 bg-[#0A2540]/90 text-[#8F9CA8] font-mono text-[13px] leading-loose rounded-b-2xl">
                  <div className="flex">
                    <span className="text-[#FF7ED2] mr-2">const</span> 
                    <span className="text-white">Stripee</span> 
                    <span className="text-[#FF7ED2] mx-2">=</span> 
                    <span className="text-[#2ED3A8]">require</span>
                    <span className="text-white">('Stripee')(</span>
                    <span className="text-[#FFD368]">'sk_test_4eC39HqLyjWDa...'</span>
                    <span className="text-white">);</span>
                  </div>
                  <div className="mt-4 flex">
                    <span className="text-[#8F9CA8] italic mr-2">// Create a PaymentIntent</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#FF7ED2] mr-2">const</span>
                    <span className="text-white">paymentIntent</span>
                    <span className="text-[#FF7ED2] mx-2">=</span>
                    <span className="text-[#FF7ED2] mr-2">await</span>
                    <span className="text-white">stripe.paymentIntents.</span>
                    <span className="text-[#2ED3A8]">create</span>
                    <span className="text-white">({'{'}</span>
                  </div>
                  <div className="ml-6 border-l border-white/10 pl-4 py-1">
                    <span className="text-[#86B3F9]">amount:</span> <span className="text-[#FF9B00]">2000</span><span className="text-white">,</span><br/>
                    <span className="text-[#86B3F9]">currency:</span> <span className="text-[#FFD368]">'usd'</span><span className="text-white">,</span><br/>
                    <span className="text-[#86B3F9]">automatic_payment_methods: {'{'}</span><br/>
                    <div className="ml-4">
                      <span className="text-[#86B3F9]">enabled:</span> <span className="text-[#FF7ED2]">true</span><span className="text-white">,</span>
                    </div>
                    <span className="text-white">{'}'},</span>
                  </div>
                  <span className="text-white">{'}'});</span>
                  
                  <div className="mt-4 flex items-center bg-[#1A3A5A] p-2 rounded text-[#2ED3A8]">
                    <span className="mr-2">~</span> <span className="text-white">node payment.js</span>
                    <span className="ml-auto flex h-2 w-2 rounded-full bg-[#2ED3A8] animate-pulse"></span>
                  </div>
                </div>
              </div>
              
              {/* Floating UI Element 1 - Success Toast */}
              <div className="absolute -left-16 top-1/3 glass-panel p-4 rounded-xl w-64 z-20 float-1 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#27C93F]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#27C93F]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#425466] mb-0.5">Payment successful</div>
                  <div className="text-[10px] text-[#425466]/70">card ending in 4242</div>
                </div>
                <div className="ml-auto text-sm font-bold text-[#0A2540]">$20.00</div>
              </div>
              
              {/* Floating UI Element 2 - Dashboard Widget */}
              <div className="absolute -right-12 bottom-12 glass-panel p-5 rounded-2xl w-72 z-20 float-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00dc82]" />
                    <div className="text-xs font-bold text-[#0A2540]">Fraud Prevention</div>
                  </div>
                  <div className="flex h-2 w-2 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold text-[#425466] mb-1">
                      <span>Risk score</span>
                      <span className="text-[#27C93F]">Low (12)</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[12%] h-full bg-[#27C93F] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-[10px] font-semibold text-[#425466] mb-1">
                      <span>Network validation</span>
                      <span className="text-[#0A2540]">Passed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Element 3 - Mini sparkline */}
              <div className="absolute left-1/4 -bottom-10 glass-panel py-3 px-4 rounded-xl z-20 float-3 shadow-lg flex items-center gap-3">
                 <Zap className="w-4 h-4 text-[#FF9B00]" />
                 <div className="text-xs font-bold text-[#0A2540]">Fastest API Response</div>
                 <div className="flex items-end gap-0.5 h-4 ml-2">
                    {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="w-1.5 bg-[#00dc82] rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
