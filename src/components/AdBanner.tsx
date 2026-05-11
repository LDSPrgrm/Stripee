import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────
   Fake ad data – colors drawn exclusively from the page palette
   Primary dark : #0A2540  (navy)
   Accent green : #00dc82
   Surface light: #F6F9FC
   Body text    : #425466
───────────────────────────────────────────────────────────── */
const leaderboardAds = [
  {
    brand: 'PaySwift',
    logo: '💸',
    tagline: 'Banks HATE this 1 simple trick that saves you 90% on fees! 😱',
    cta: 'SEE THE SECRET',
    badge: 'FREE MONEY?',
    dark: false,
  },
  {
    brand: 'BillingHQ',
    logo: '📉',
    tagline: 'Is your SaaS business DYING? Why 99% of founders are losing money...',
    cta: 'SAVE MY BUSINESS',
    badge: 'URGENT',
    dark: false,
  },
  {
    brand: 'VaultPay',
    logo: '🕵️',
    tagline: 'The HIDDEN payout method taking over 190 countries by storm!',
    cta: 'REVEAL THE TRUTH',
    badge: 'MUST SEE',
    dark: false,
  },
];

const sidebarAd = {
  brand: 'ChargeLite',
  logo: '🔞',
  headline: 'CHURN IS KILLING YOU!',
  body: 'Your failed payments are a GOLDMINE. Recover $10k+ in minutes with this AI hack!',
  cta: 'CLAIM MY REVENUE',
};

const sponsoredCards = [
  {
    logo: '🔥',
    brand: 'Subscript',
    headline: 'Scaling is a LIE!',
    desc: 'Stop wasting time on manual billing. This "automatic" system does 100% of the work.',
    tag: 'Secret Weapon',
  },
  {
    logo: '🚨',
    brand: 'PayBridge',
    headline: 'You ARE losing sales!',
    desc: 'If you don\'t accept these 50+ payment methods, your customers will LEAVE. Period.',
    tag: 'Last Warning',
  },
  {
    logo: '💀',
    brand: 'FraudShield',
    headline: 'YOU ARE BEING HACKED!',
    desc: 'Criminals are targeting YOUR store right now. Watch this before it\'s too late.',
    tag: 'Red Alert',
  },
];

/* ─────────────────────────────────────────────────────────────
   AdLabel – tiny "Ad" pill, two variants
───────────────────────────────────────────────────────────── */
const AdLabel = ({ light = false, className = '' }: { light?: boolean; className?: string }) => (
  <span
    className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
      light
        ? 'border-white/25 text-white/40'
        : 'border-[#425466]/20 text-[#425466]/50'
    } ${className}`}
  >
    Ad
  </span>
);

/* ─────────────────────────────────────────────────────────────
   LeaderboardBanner – full-width rotating strip
───────────────────────────────────────────────────────────── */
export const LeaderboardBanner: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const goToLogin = (brand: string) => navigate(`/login?simulation=true&brand=${brand}`);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % leaderboardAds.length);
        setVisible(true);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const ad = leaderboardAds[idx];
  const isDark = ad.dark;

  return (
    <div className="relative w-full">
      <div
        className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'} ${
          isDark
            ? 'bg-[#0A2540]'
            : 'bg-[#00dc82]/10 border-b border-[#00dc82]/25'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-center gap-4 justify-between">
          {/* left: logo + copy */}
          <div className="flex items-center gap-4">
            <span className="text-2xl">{ad.logo}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`font-extrabold text-base leading-none ${isDark ? 'text-white' : 'text-[#0A2540]'}`}>
                  {ad.brand}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                    isDark
                      ? 'bg-[#00dc82]/20 text-[#00dc82]'
                      : 'bg-[#0A2540]/10 text-[#0A2540]'
                  }`}
                >
                  {ad.badge}
                </span>
              </div>
              <p className={`text-sm ${isDark ? 'text-white/65' : 'text-[#425466]'}`}>{ad.tagline}</p>
            </div>
          </div>

          {/* right: CTA + label */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goToLogin(ad.brand)}
              className={`font-bold text-sm px-5 py-2 rounded-full transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                isDark
                  ? 'bg-[#00dc82] text-[#0A2540] hover:bg-[#00dc82]/90 shadow-[0_4px_14px_0_rgba(0,220,130,0.25)]'
                  : 'bg-[#0A2540] text-white hover:bg-[#0A2540]/85'
              }`}
            >
              {ad.cta}
            </button>
            <AdLabel light={isDark} />
          </div>
        </div>

        {/* progress bar */}
        <div className={`h-[2px] ${isDark ? 'bg-white/8' : 'bg-[#0A2540]/8'}`}>
          <div
            key={idx}
            className={`h-full ${isDark ? 'bg-[#00dc82]/50' : 'bg-[#0A2540]/20'}`}
            style={{ animation: 'adProgress 5s linear forwards' }}
          />
        </div>
      </div>

      <style>{`@keyframes adProgress { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SponsoredStrip – 3 inline sponsored product cards
───────────────────────────────────────────────────────────── */
export const SponsoredStrip: React.FC = () => {
  const navigate = useNavigate();
  const goToLogin = (brand: string) => navigate(`/login?simulation=true&brand=${brand}`);
  return (
    <div className="w-full bg-[#F6F9FC] border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-6">
          <AdLabel />
          <span className="text-[11px] text-[#425466]/50 font-semibold uppercase tracking-widest">Sponsored</span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {sponsoredCards.map((card, i) => (
            <div
              key={i}
              onClick={() => goToLogin(card.brand)}
              className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#00dc82]/30 transition-all duration-200 cursor-pointer flex flex-col gap-4"
            >
              {/* icon + brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0A2540] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:bg-[#00dc82] transition-colors duration-300">
                  {card.logo}
                </div>
                <div>
                  <div className="font-bold text-[#0A2540] text-sm">{card.brand}</div>
                  <div className="text-[10px] text-[#425466]/55 font-semibold uppercase tracking-wider">{card.tag}</div>
                </div>
              </div>

              {/* copy */}
              <div>
                <h4 className="font-bold text-[#0A2540] text-base mb-1">{card.headline}</h4>
                <p className="text-sm text-[#425466] leading-relaxed">{card.desc}</p>
              </div>

              {/* inline cta */}
              <div className="flex items-center text-[#00dc82] font-bold text-sm gap-1 group-hover:gap-2 transition-all mt-auto">
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SidebarAdFloat – fixed bottom-right, slides in after 2 s
───────────────────────────────────────────────────────────── */
export const SidebarAdFloat: React.FC = () => {
  const navigate = useNavigate();
  const goToLogin = (brand: string) => navigate(`/login?simulation=true&brand=${brand}`);
  const [dismissed, setDismissed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-64 transition-all duration-500 ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
        {/* green accent top bar */}
        <div className="h-1 w-full bg-[#00dc82]" />

        {/* label + dismiss */}
        <div className="flex items-center justify-between px-4 pt-3 pb-0">
          <AdLabel />
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-[#0A2540] text-xl leading-none transition-colors"
            aria-label="Close ad"
          >
            ×
          </button>
        </div>

        <div className="p-5 pt-3">
          <div className="text-4xl mb-3 text-center">{sidebarAd.logo}</div>
          <div className="font-extrabold text-[#0A2540] text-lg text-center mb-1 leading-snug">
            {sidebarAd.headline}
          </div>
          <p className="text-[#425466] text-xs text-center leading-relaxed mb-5">{sidebarAd.body}</p>

          <button onClick={() => goToLogin(sidebarAd.brand)} className="w-full bg-[#00dc82] text-[#0A2540] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00dc82]/90 transition-all shadow-[0_6px_20px_-4px_rgba(0,220,130,0.25)] hover:-translate-y-0.5 active:translate-y-0">
            {sidebarAd.cta}
          </button>

          <p className="text-center text-gray-400 text-[9px] mt-3 font-semibold tracking-wide">
            {sidebarAd.brand} · Sponsored
          </p>
        </div>
      </div>
    </div>
  );
};
