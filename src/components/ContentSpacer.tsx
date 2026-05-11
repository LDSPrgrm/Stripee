import React from 'react';
import { CreditCard, Zap, Globe, Layers, BarChart3, Lock } from 'lucide-react';

const ContentSpacer: React.FC = () => {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6 text-[#00dc82]" />,
      title: "Global Payments",
      description: "Accept payments from anywhere in the world with local payment methods and currency conversion built-in."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#00dc82]" />,
      title: "Fast Payouts",
      description: "Get paid faster with optimized routing and instant payout options for your business."
    },
    {
      icon: <Globe className="w-6 h-6 text-[#00dc82]" />,
      title: "Global Scale",
      description: "Built on a redundant, global infrastructure with 99.99%+ uptime to handle your busiest days."
    }
  ];

  return (
    <section className="relative bg-white py-32 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#00dc82]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">{feature.title}</h3>
              <p className="text-[#425466] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Unified Platform Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#0A2540] mb-6 tracking-tight leading-[1.1]">
              A fully integrated suite of <br/> payments products
            </h2>
            <p className="text-lg text-[#425466] mb-10 leading-relaxed font-medium">
              We bring together everything that's required to build websites and apps that accept payments and send payouts globally. Stripee's products power payments for online and in-person retailers, subscriptions businesses, software platforms and marketplaces.
            </p>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#00dc82]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#00dc82]"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540]">Optimized Checkout</h4>
                    <p className="text-sm text-[#425466]">Boost conversion with a pre-built checkout experience.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#00dc82]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#00dc82]"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540]">Fraud Prevention</h4>
                    <p className="text-sm text-[#425466]">Detect and block fraud with machine learning.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative mockup-container perspective-1200">
             <div className="mockup-inner relative w-full pt-10">
                {/* Decorative Dashboard Mockup */}
                <div className="bg-[#F6F9FC] rounded-3xl p-8 border border-gray-100 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-[#00dc82]"></div>
                         <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                         <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                         <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Net Revenue</div>
                         <div className="text-2xl font-bold text-[#0A2540]">$24,500.00</div>
                         <div className="text-[10px] font-bold text-[#00dc82] mt-1">+12.5%</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Success Rate</div>
                         <div className="text-2xl font-bold text-[#0A2540]">99.8%</div>
                         <div className="text-[10px] font-bold text-[#00dc82] mt-1">Excellent</div>
                      </div>
                   </div>

                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 h-48">
                      <div className="flex justify-between items-center mb-6">
                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Volume over time</div>
                         <BarChart3 className="w-4 h-4 text-gray-300" />
                      </div>
                      <div className="flex items-end gap-2 h-24">
                         {[30, 45, 35, 60, 40, 75, 50, 90, 65, 80, 55, 70].map((h, i) => (
                           <div key={i} className="flex-grow bg-[#00dc82]/20 rounded-t-sm hover:bg-[#00dc82] transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                         ))}
                      </div>
                   </div>

                   {/* Floating Elements */}
                   <div className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-gray-50 animate-bounce transition-all duration-[3000ms]">
                      <Lock className="w-5 h-5 text-[#00dc82]" />
                   </div>
                   <div className="absolute -left-4 bottom-1/4 bg-white p-4 rounded-xl shadow-xl border border-gray-50">
                      <Layers className="w-5 h-5 text-[#00dc82]" />
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContentSpacer;
