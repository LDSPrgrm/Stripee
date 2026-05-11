import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F6F9FC] py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        
        <div className="col-span-2 lg:col-span-1">
          <div className="font-bold text-xl text-stripe-dark mb-4">stripe</div>
          <p className="text-sm text-stripe-slate">
            © 2026 Stripee, Inc.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stripe-dark mb-4">Products</h3>
          <ul className="space-y-3 text-sm text-stripe-slate">
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Payments</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Billing</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Connect</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Checkout</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Terminal</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-stripe-dark mb-4">Developers</h3>
          <ul className="space-y-3 text-sm text-stripe-slate">
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Status</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-stripe-dark mb-4">Resources</h3>
          <ul className="space-y-3 text-sm text-stripe-slate">
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Guides</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Sales</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-stripe-dark mb-4">Company</h3>
          <ul className="space-y-3 text-sm text-stripe-slate">
            <li><a href="#" className="hover:text-stripe-dark transition-colors">About</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Customers</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-stripe-dark transition-colors">Newsroom</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
