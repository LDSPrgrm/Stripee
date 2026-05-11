import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Bell, 
  Settings, 
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LeaderboardBanner, SponsoredStrip, SidebarAdFloat } from '../components/AdBanner';

const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, transRes] = await Promise.all([
          fetch('http://localhost:5000/api/dashboard/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/dashboard/transactions', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const statsData = await statsRes.json();
        const transData = await transRes.json();

        setStats(statsData.stats);
        setTransactions(transData.transactions);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogout = () => {
    console.log('Dashboard: calling logout');
    logout();
    navigate('/');
  };

  const getIcon = (label: string) => {
    switch (label) {
      case 'Total Balance': return <Wallet className="w-5 h-5" />;
      case 'Net Revenue': return <TrendingUp className="w-5 h-5" />;
      case 'Active Subscriptions': return <Users className="w-5 h-5" />;
      case 'Pending Payouts': return <ArrowLeftRight className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 text-[#0A2540] flex flex-col hidden lg:flex">
        <div className="p-8">
          <div className="text-2xl font-extrabold tracking-tighter mb-12">Stripee</div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#00dc82]/10 rounded-lg font-bold text-sm text-[#0A2540]">
              <LayoutDashboard className="w-4 h-4 text-[#00dc82]" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all text-[#425466] hover:text-[#0A2540]">
              <ArrowLeftRight className="w-4 h-4" />
              Payments
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all text-[#425466] hover:text-[#0A2540]">
              <Users className="w-4 h-4" />
              Customers
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all text-[#425466] hover:text-[#0A2540]">
              <CreditCard className="w-4 h-4" />
              Subscriptions
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all text-[#425466] hover:text-[#0A2540]">
              <BarChart3 className="w-4 h-4" />
              Reports
            </a>
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-gray-50 space-y-2">
           <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all text-[#425466] hover:text-[#0A2540]">
              <Settings className="w-4 h-4" />
              Settings
            </a>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg font-semibold text-sm transition-all text-red-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10">
        <LeaderboardBanner />
        {/* Header */}
        <header className="flex items-center justify-between my-10">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2540]">Welcome back, {user?.email?.split('@')[0] || 'User'}</h1>
            <p className="text-sm text-[#425466]">Here's what's happening with your business today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00dc82]/50 w-64 transition-all"
              />
            </div>
            <button className="p-2.5 rounded-full bg-white border border-gray-200 text-[#0A2540] hover:bg-gray-50 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="relative">
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#00dc82] border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
              ></div>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>
                    <p className="text-sm font-bold text-[#0A2540] truncate">{user?.email}</p>
                  </div>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-[#425466] hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1 border-t border-gray-50 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all cursor-default">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F6F9FC] flex items-center justify-center text-[#0A2540] group-hover:bg-[#00dc82] group-hover:text-white transition-all duration-300">
                  {getIcon(stat.label)}
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-[#00dc82]' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-[#0A2540] tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <SponsoredStrip />
        </div>

        {/* Chart and Transactions Section */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
               <h2 className="font-bold text-[#0A2540]">Recent Transactions</h2>
               <button className="text-xs font-bold text-[#635BFF] hover:text-[#0A2540] transition-all">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-[#F6F9FC]/50">
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Type</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-all cursor-pointer group">
                      <td className="px-8 py-5 text-sm font-semibold text-[#0A2540]">{t.customer}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          t.status === 'Succeeded' ? 'bg-[#00dc82]/10 text-[#00dc82]' : 
                          t.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 
                          'bg-red-100 text-red-600'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-[#425466]">{t.type}</td>
                      <td className="px-8 py-5 text-sm text-gray-400">{t.date}</td>
                      <td className="px-8 py-5 text-right text-sm font-bold text-[#0A2540]">{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Summary Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 relative overflow-hidden shadow-sm group hover:shadow-md transition-all">
               <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2 text-[#0A2540]">Get started with Stripee</h3>
                  <p className="text-[#425466] text-sm mb-8 leading-relaxed">Connect your bank account to start receiving payouts and accept live payments.</p>
                  <button className="bg-[#0A2540] text-white w-full py-3 rounded-xl font-bold hover:bg-[#425466] transition-all flex items-center justify-center gap-2 group">
                     Complete setup <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
               <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#635BFF]/5 rounded-full blur-2xl group-hover:bg-[#635BFF]/10 transition-colors"></div>
               <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-[#00dc82]/5 rounded-full blur-xl group-hover:bg-[#00dc82]/10 transition-colors"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#0A2540]">Payout Schedule</h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#0A2540] transition-colors" />
               </div>
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F9FC] border border-gray-100 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <ArrowDownRight className="w-5 h-5 text-[#635BFF]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#425466]">Next payout</div>
                    <div className="font-bold text-[#0A2540] font-mono">$4,250.00</div>
                  </div>
                  <div className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider">May 12</div>
               </div>
               <button className="text-sm font-bold text-[#0A2540] hover:text-[#00dc82] transition-all w-full text-center flex items-center justify-center gap-2">
                 View settings <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </main>
      <SidebarAdFloat />
    </div>
  );
};

export default Dashboard;
