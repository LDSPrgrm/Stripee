import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LogOut, User, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-[#0A2540] font-extrabold text-2xl tracking-tighter">Stripee</Link>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#0A2540]">
            <a href="#" className="hover:text-[#00dc82] transition-colors">Products</a>
            <a href="#" className="hover:text-[#00dc82] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#00dc82] transition-colors">Developers</a>
            <a href="#" className="hover:text-[#00dc82] transition-colors">Resources</a>
            <a href="#" className="hover:text-[#00dc82] transition-colors">Pricing</a>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[15px] font-semibold">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#425466] hover:text-[#0A2540] transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="group relative">
                <button className="flex items-center gap-2 pl-4 border-l border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#00dc82] flex items-center justify-center text-white shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#0A2540] hidden sm:block">{user?.email?.split('@')[0]}</span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>
                    <p className="text-sm font-bold text-[#0A2540] truncate">{user?.email}</p>
                  </div>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-[#425466] hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1 border-t border-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-[#0A2540] hover:text-[#00dc82] transition-colors hidden sm:block">Sign in</Link>
              <Link to="/login" className="bg-[#0A2540] text-white px-5 py-2 rounded-full hover:bg-[#425466] transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 group">
                Start now <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
