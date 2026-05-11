import React from 'react';

const LogoCloud: React.FC = () => {
  return (
    <section className="py-20 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex justify-center">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><path d="M10,20 h20 v-5 h-20 z" /></svg> {/* Placeholder Logo 1 */}
            <span className="font-bold text-xl ml-2">Amazon</span>
          </div>
          <div className="flex justify-center">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><circle cx="15" cy="15" r="10" /></svg> {/* Placeholder Logo 2 */}
            <span className="font-bold text-xl ml-2">Salesforce</span>
          </div>
          <div className="flex justify-center">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><rect x="5" y="5" width="20" height="20" /></svg> {/* Placeholder Logo 3 */}
            <span className="font-bold text-xl ml-2">Google</span>
          </div>
          <div className="flex justify-center">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><polygon points="15,5 25,25 5,25" /></svg> {/* Placeholder Logo 4 */}
            <span className="font-bold text-xl ml-2">Shopify</span>
          </div>
          <div className="flex justify-center hidden lg:flex">
            <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><path d="M5,15 Q15,5 25,15 T45,15" stroke="currentColor" strokeWidth="4" fill="none"/></svg> {/* Placeholder Logo 5 */}
            <span className="font-bold text-xl ml-2">Instacart</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
