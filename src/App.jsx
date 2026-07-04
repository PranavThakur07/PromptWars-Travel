import React, { useState, useEffect } from 'react';
import {
  Compass, Copy, Check, RotateCcw, Heart, Sparkles,
  Map, Gem, Utensils, Globe, Briefcase, PenTool,
  Calendar, ChevronDown, X
} from 'lucide-react';

import { useLocalStorage } from './hooks/useLocalStorage';
import heroImg from './assets/hero.png';
import { generateTravelPlan, checkBackendHealth } from './services/gemini';
import { formatTravelPlanAsText, copyToClipboard } from './utils/helpers';

import ThemeToggle from './components/Common/ThemeToggle';
import ErrorState from './components/Common/ErrorState';
import FormSection from './components/FormSection';
import InteractiveMap from './components/InteractiveMap';
import ItineraryTimeline from './components/ItineraryTimeline';
import HiddenGemsCard from './components/HiddenGemsCard';
import FoodExplorer from './components/FoodExplorer';
import EtiquetteEtc from './components/EtiquetteEtc';
import BudgetTravelPlanner from './components/BudgetTravelPlanner';
import LanguagePacker from './components/LanguagePacker';
import TravelJournalPostcard from './components/TravelJournalPostcard';

const TABS = [
  { id: 'overview',   label: 'Overview',    emoji: '🗺️', icon: Map },
  { id: 'itinerary',  label: 'Itinerary',   emoji: '📅', icon: Calendar },
  { id: 'gems',       label: 'Hidden Gems', emoji: '💎', icon: Gem },
  { id: 'food',       label: 'Cuisine',     emoji: '🍜', icon: Utensils },
  { id: 'culture',    label: 'Culture',     emoji: '🌐', icon: Globe },
  { id: 'essentials', label: 'Essentials',  emoji: '🎒', icon: Briefcase },
  { id: 'journal',    label: 'Journal',     emoji: '📝', icon: PenTool },
];

const TRAVEL_QUOTES = [
  "The world is a book, and those who do not travel read only one page.",
  "Not all those who wander are lost.",
  "To travel is to live.",
  "Adventure is worthwhile in itself.",
  "Fill your life with experiences, not things.",
  "Every journey begins with a single step forward.",
];

const LOADING_MESSAGES = [
  "Consulting ancient cartographers…",
  "Deciphering local legends…",
  "Unearthing hidden pathways…",
  "Translating cultural secrets…",
  "Mapping undiscovered stories…",
  "Charting your expedition route…",
];

export default function App() {
  const [travelPlan, setTravelPlan]   = useLocalStorage('current_travel_plan', null);
  const [lastInputs, setLastInputs]   = useLocalStorage('last_travel_inputs', null);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState(null);
  const [copied, setCopied]           = useState(false);
  const [showToast, setShowToast]     = useState(false);
  const [serverHealth, setServerHealth] = useState(null);
  const [activeTab, setActiveTab]     = useState('overview');
  const [formVisible, setFormVisible] = useState(false);
  const [loadingMsg, setLoadingMsg]   = useState(0);
  const [quoteIdx]                    = useState(() => Math.floor(Math.random() * TRAVEL_QUOTES.length));

  useEffect(() => {
    checkBackendHealth().then(setServerHealth).catch(() => {});
  }, []);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) return;
    const id = setInterval(() => setLoadingMsg(p => (p + 1) % LOADING_MESSAGES.length), 2600);
    return () => clearInterval(id);
  }, [isLoading]);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    setError(null);
    setShowToast(false);
    setLastInputs(formData);
    setFormVisible(false);
    try {
      const plan = await generateTravelPlan(formData);
      setTravelPlan(plan);
      setActiveTab('overview');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to compile travel plan. Check your backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry  = () => { if (lastInputs) handleGenerate(lastInputs); };
  const handleReset  = () => { setTravelPlan(null); setLastInputs(null); setError(null); setShowToast(false); setFormVisible(false); };

  const handleCopy = async () => {
    if (!travelPlan) return;
    try {
      const text = formatTravelPlanAsText(travelPlan, lastInputs?.destination || 'My Destination');
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* silent */ }
  };

  const dest   = lastInputs?.destination || '';
  const budget = Number(lastInputs?.budget) || 1500;

  // ══════════════════════════════════════════════
  // LOADING SCREEN
  // ══════════════════════════════════════════════
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(155deg, #0F0A04 0%, #1C1008 40%, #2A170C 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 30, padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <style>{`
          @keyframes stamp-drop {
            0% { transform: scale(2.5) rotate(-45deg); opacity: 0; }
            80% { transform: scale(0.95) rotate(-15deg); opacity: 1; }
            100% { transform: scale(1) rotate(-12deg); opacity: 0.9; }
          }
          @keyframes line-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.45; }
          }
          .stamp-animate {
            animation: stamp-drop 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          .line-animate {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: line-draw 4.5s ease-in-out infinite;
          }
          .pulse-glow {
            animation: glow-pulse 3s ease-in-out infinite;
          }
        `}</style>

        {/* Background rings */}
        <div className="pulse-glow" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(218, 165, 32, 0.04)', pointerEvents: 'none' }} />

        {/* Animated graphics container */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}>
          {/* Animated compass */}
          <div style={{ position: 'relative', width: 130, height: 130 }}>
            <div className="spin-slow" style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(218, 165, 32, 0.22)',
              boxShadow: '0 0 15px rgba(218, 165, 32, 0.08)',
            }} />
            <div className="spin-reverse" style={{
              position: 'absolute', inset: 12,
              borderRadius: '50%',
              border: '1.5px dashed rgba(218, 165, 32, 0.15)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Compass size={48} className="compass-needle" style={{ color: '#DAA520' }} />
            </div>
          </div>

          {/* Map route drawing simulation */}
          <div style={{ width: 140, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="140" height="90" viewBox="0 0 100 60" fill="none">
              <path className="line-animate" d="M10,45 C25,20 40,55 55,25 C65,10 80,40 90,20" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="10" cy="45" r="4" fill="#C0392B" />
              <path d="M 90 20 L 83 23 L 87 15 Z" fill="#C0392B" />
            </svg>
          </div>

          {/* Passport Stamp */}
          <div className="stamp-animate" style={{
            border: '4px double #C0392B',
            borderRadius: '50%',
            width: 100, height: 100,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: '#C0392B',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: 'rgba(192, 57, 43, 0.03)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <span style={{ fontSize: '0.52rem', opacity: 0.8 }}>COMPASS AI</span>
            <span style={{ fontSize: '1.4rem', margin: '2px 0' }}>✈️</span>
            <span style={{ fontSize: '0.58rem', fontWeight: 800 }}>EXPLORING</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 460, zIndex: 10, marginTop: 20 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.1rem', fontWeight: 900,
            color: '#F5E6C8', marginBottom: 12, lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            Unfolding Your Expedition…
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem', fontWeight: 600,
            color: 'rgba(212,184,150,0.85)',
            letterSpacing: '0.04em',
            minHeight: 24,
            transition: 'opacity 0.3s',
            background: 'rgba(0,0,0,0.25)',
            padding: '8px 20px',
            borderRadius: '99px',
            border: '1px solid rgba(218, 165, 32, 0.1)',
            display: 'inline-block',
          }}>
            {dest ? `📚 Surveying coordinates for ${dest}…` : LOADING_MESSAGES[loadingMsg]}
          </p>
        </div>

        {/* Bouncing dots */}
        <div style={{ display: 'flex', gap: 10, zIndex: 10 }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="loading-dot" style={{ width: 10, height: 10, animationDelay: `${i * 0.22}s` }} />
          ))}
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.2rem', fontStyle: 'italic',
          color: 'rgba(245,230,200,0.4)',
          textAlign: 'center', maxWidth: 440,
          zIndex: 10,
          lineHeight: 1.5,
          marginTop: 20,
        }}>
          "{TRAVEL_QUOTES[quoteIdx]}"
        </p>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // HERO — no plan
  // ══════════════════════════════════════════════
  if (!travelPlan && !error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Fixed header */}
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(15, 10, 4, 0.88)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(184,134,11,0.14)',
          padding: '13px 24px',
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <LogoMark spin />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {serverHealth && <LiveBadge />}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="hero-section hero-grid hero-glow" style={{ paddingTop: 80, display: 'flex', alignItems: 'center' }}>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', top: '12%', right: '6%', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(184,134,11,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(184,134,11,0.05)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto', padding: '40px 24px 60px', position: 'relative' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading and Search Card */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Eyebrow */}
                <div className="animate-fade-up delay-100" style={{
                  fontSize: '0.7rem', fontWeight: 800,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#DAA520', display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  <Sparkles size={13} /> AI-Powered Cultural Expedition Guide
                </div>

                {/* Heading */}
                <h1 className="animate-fade-up delay-200" style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                  fontWeight: 900, color: '#F5E6C8',
                  lineHeight: 1.1, letterSpacing: '-0.02em',
                }}>
                  Explore Beyond Maps.<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #F0C040 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Experience Every Story.
                  </span>
                </h1>

                {/* Quote */}
                <p className="animate-fade-up delay-300" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.25rem', fontStyle: 'italic',
                  color: 'rgba(245,230,200,0.65)',
                  lineHeight: 1.5, borderLeft: '2px solid #DAA520', paddingLeft: 14,
                }}>
                  "The world is a book, and those who do not travel read only one page."
                </p>

                {/* Search Form Card */}
                <div className="animate-fade-up delay-400" style={{
                  background: 'rgba(28, 16, 8, 0.75)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(184,134,11,0.25)',
                  borderRadius: 24, padding: '24px 28px',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                }}>
                  <FormSection
                    onSubmit={handleGenerate}
                    isLoading={isLoading}
                    initialValues={lastInputs}
                    heroMode
                  />
                </div>

                {/* Feature Strip */}
                <div className="animate-fade-up delay-500 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] font-bold text-rgba(245,230,200,0.35) font-display">
                  {['✦ SINGLE REQ', '✦ INTERACTIVE MAPS', '✦ EXPLORER DIARY', '✦ ACCESSIBLE WCAG'].map(f => (
                    <span key={f} style={{ color: 'rgba(245,230,200,0.45)', letterSpacing: '0.08em' }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Right Column: Immersive Travel Plate Art */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="animate-fade-up delay-300" style={{ position: 'relative', width: '100%', maxWidth: 440 }}>
                  
                  {/* Decorative map plate backing */}
                  <div style={{
                    position: 'absolute', inset: -14,
                    border: '1px solid rgba(184,134,11,0.18)',
                    borderRadius: 24, pointerEvents: 'none',
                  }} />
                  
                  {/* Frame */}
                  <div className="deckled-border" style={{
                    background: '#1C1008',
                    border: '8px solid #2C1810',
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
                    transform: 'rotate(1deg)',
                  }}>
                    {/* Immersive Image */}
                    <div style={{ position: 'relative', aspectRatio: '4/5', display: 'flex', overflow: 'hidden' }}>
                      <img 
                        src={heroImg} 
                        alt="Expedition collage illustration" 
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          opacity: 0.9, filter: 'sepia(10%) contrast(105%)',
                        }}
                      />
                      
                      {/* Vignette overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(15,10,4,0.7) 100%)',
                        pointerEvents: 'none',
                      }} />
                      
                      {/* Floating compass overlay */}
                      <div style={{
                        position: 'absolute', bottom: 20, left: 20,
                        background: 'rgba(15,10,4,0.75)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(184,134,11,0.3)',
                        borderRadius: '50%',
                        width: 76, height: 76,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div className="spin-slow" style={{ position: 'absolute', inset: 4, borderRadius: '50%', border: '1px dashed rgba(184,134,11,0.2)' }} />
                        <Compass size={32} className="compass-needle" style={{ color: '#DAA520' }} />
                      </div>

                      {/* Photo Label Plate */}
                      <div style={{
                        position: 'absolute', top: 20, right: 20,
                        background: '#FFFDF9', color: '#1C1008',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.62rem', fontWeight: 900,
                        padding: '6px 12px', borderRadius: 6,
                        border: '1px solid rgba(184,134,11,0.4)',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      }}>
                        Plate I · Compass Rose
                      </div>
                    </div>

                    {/* Captions area */}
                    <div style={{
                      padding: '16px 20px', background: '#2C1810',
                      borderTop: '1px solid rgba(184,134,11,0.15)',
                      textAlign: 'left',
                    }}>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.95rem', fontWeight: 700, color: '#F5E6C8',
                        lineHeight: 1.3,
                      }}>
                        The Explorer's Almanac
                      </div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.78rem', fontStyle: 'italic', color: 'rgba(212,184,150,0.65)',
                        marginTop: 4, lineHeight: 1.4,
                      }}>
                        AI-generated guide mapping local secrets, traditional foods, budgets, and historical backstories across thousands of destinations.
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        <AppFooter />
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // ERROR STATE
  // ══════════════════════════════════════════════
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
        <DashboardHeader dest={dest} onCopy={handleCopy} copied={copied} onRetry={handleRetry} onReset={handleReset} serverHealth={serverHealth} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <ErrorState message={error} onRetry={handleRetry} />
        </main>
        <AppFooter />
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // EXPLORER DASHBOARD
  // ══════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <DashboardHeader dest={dest} onCopy={handleCopy} copied={copied} onRetry={handleRetry} onReset={handleReset} serverHealth={serverHealth} />

      {/* Success toast */}
      {showToast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 200,
          background: 'linear-gradient(135deg, #B8860B 0%, #F0C040 100%)',
          color: '#1C1008', padding: '12px 20px', borderRadius: 14,
          fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '0.85rem',
          boxShadow: '0 8px 32px rgba(184,134,11,0.45)',
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <Check size={16} /> Journey Guide Ready!
        </div>
      )}

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px 16px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <div style={{ position: 'sticky', top: 72, maxHeight: 'calc(100vh - 88px)', overflowY: 'auto', paddingRight: 2 }}>

            {/* Modify Journey */}
            <div style={{ marginBottom: 14 }}>
              <button
                onClick={() => setFormVisible(v => !v)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-card)', border: '1px solid var(--border-mid)',
                  borderRadius: 12, cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 800,
                  fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}
              >
                <span>⚙️ Modify Journey</span>
                <ChevronDown size={15} style={{
                  color: 'var(--accent)',
                  transform: formVisible ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }} />
              </button>
              {formVisible && (
                <div style={{
                  marginTop: 8, background: 'var(--bg-card)',
                  border: '1px solid var(--border)', borderRadius: 12,
                  padding: '16px', animation: 'slide-up 0.3s ease both',
                }}>
                  <FormSection onSubmit={handleGenerate} isLoading={isLoading} initialValues={lastInputs} compact />
                </div>
              )}
            </div>

            {/* Trip summary */}
            {lastInputs && (
              <div className="explorer-card" style={{ padding: 18, marginBottom: 14 }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem', fontWeight: 700,
                  color: 'var(--text)', marginBottom: 14,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  🧳 Trip Overview
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  {[
                    { e: '📍', l: 'Destination', v: dest || '—' },
                    { e: '👥', l: 'Travelers',   v: `${lastInputs.travelers || 1} person${(lastInputs.travelers || 1) > 1 ? 's' : ''}` },
                    { e: '✈️', l: 'Style',        v: lastInputs.travelStyle || '—' },
                    { e: '💰', l: 'Budget',       v: `$${lastInputs.budget || '—'} USD` },
                    { e: '📅', l: 'From',         v: lastInputs.startDate || '—' },
                    { e: '📅', l: 'Until',        v: lastInputs.endDate || '—' },
                  ].map(({ e, l, v }) => (
                    <div key={l} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 11px' }}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', fontFamily: "'Outfit', sans-serif", marginBottom: 3 }}>{e} {l}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>{v}</div>
                    </div>
                  ))}
                </div>
                {lastInputs.interests?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', fontFamily: "'Outfit', sans-serif", marginBottom: 7 }}>🎯 Interests</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {lastInputs.interests.map(i => <span key={i} className="badge badge-gold">{i}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mini map */}
            <div className="explorer-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Map size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Explorer Map</span>
              </div>
              <InteractiveMap plan={travelPlan} compact />
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div>
            {/* Tab bar */}
            <div className="tab-bar" style={{ marginBottom: 20 }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn${activeTab === tab.id ? ' tab-active' : ''}`}
                >
                  <span style={{ fontSize: '0.85rem' }}>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div key={activeTab} style={{ animation: 'fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>

              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Story */}
                  {travelPlan.story && (
                    <div className="explorer-card" style={{ padding: '32px 36px' }}>
                      <div className="section-header">
                        <div className="section-icon"><Sparkles size={18} /></div>
                        <div>
                          <div className="section-title">Destination Story</div>
                          <div className="section-subtitle">Your AI-curated cultural narrative</div>
                        </div>
                      </div>
                      <p className="journal-drop-cap" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.25rem', fontStyle: 'italic',
                        lineHeight: 1.8, color: 'var(--text-secondary)',
                      }}>
                        {travelPlan.story}
                      </p>
                    </div>
                  )}

                  {/* Quick stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                    {[
                      { emoji: '💎', count: travelPlan.hiddenGems?.length, label: 'Hidden Gems' },
                      { emoji: '🍜', count: travelPlan.food?.length,        label: 'Food Dishes' },
                      { emoji: '🎭', count: travelPlan.events?.length,       label: 'Local Events' },
                      { emoji: '🏛️', count: travelPlan.heritage?.length,     label: 'Heritage Sites' },
                      { emoji: '📦', count: travelPlan.packing?.length,      label: 'Pack Items' },
                      { emoji: '🗣️', count: travelPlan.localPhrases?.length, label: 'Local Phrases' },
                    ].filter(s => s.count).map(s => (
                      <div key={s.label} className="gold-card" style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{s.emoji}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{s.count}</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary'  && <ItineraryTimeline itinerary={travelPlan.itinerary} />}
              {activeTab === 'gems'       && <HiddenGemsCard hiddenGems={travelPlan.hiddenGems} heritage={travelPlan.heritage} />}
              {activeTab === 'food'       && <FoodExplorer food={travelPlan.food} />}
              {activeTab === 'culture'    && <EtiquetteEtc culture={travelPlan.culture} events={travelPlan.events} safetyTips={travelPlan.safetyTips} />}
              {activeTab === 'essentials' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <LanguagePacker packing={travelPlan.packing} localPhrases={travelPlan.localPhrases} />
                  <BudgetTravelPlanner budget={travelPlan.budget} userBudget={budget} />
                </div>
              )}
              {activeTab === 'journal'    && (
                <TravelJournalPostcard
                  travelJournal={travelPlan.travelJournal}
                  instagramCaption={travelPlan.instagramCaption}
                  destination={dest}
                />
              )}
            </div>
          </div>

        </div>
      </div>
      <AppFooter />
    </div>
  );
}

/* ── Shared sub-components ── */

function LogoMark({ spin, small }) {
  const sz = small ? 30 : 36;
  const iconSz = small ? 15 : 18;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: sz, height: sz, borderRadius: small ? 8 : 10,
        background: 'linear-gradient(135deg, #B8860B, #DAA520)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Compass size={iconSz} style={{ color: '#1C1008' }} className={spin ? 'spin-slow' : ''} />
      </div>
      <div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, fontSize: small ? '0.85rem' : '1rem',
          color: small ? 'var(--text)' : '#F5E6C8',
          lineHeight: 1,
        }}>Culture Compass AI</div>
        <div style={{
          fontSize: '0.55rem', fontWeight: 800,
          color: '#B8860B', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginTop: 2,
        }}>Powered by Gemini</div>
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <span style={{
      fontSize: '0.62rem', fontWeight: 800,
      background: 'rgba(45,80,22,0.15)',
      color: '#7DC055',
      border: '1px solid rgba(45,80,22,0.25)',
      padding: '3px 10px', borderRadius: 9999,
      fontFamily: "'Outfit', sans-serif",
      letterSpacing: '0.06em',
    }}>● Live API</span>
  );
}

function DashboardHeader({ dest, onCopy, copied, onRetry, onReset, serverHealth }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--header-glass)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border)',
      padding: '11px 20px',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark small />
          {dest && (
            <>
              <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>🧭</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{dest}</span>
              </div>
            </>
          )}
          {serverHealth && <LiveBadge />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onCopy} className="btn-secondary">
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Guide</>}
          </button>
          <button onClick={onRetry} className="btn-secondary"><RotateCcw size={13} /> Re-plan</button>
          <button onClick={onReset} className="btn-secondary"><X size={13} /> New Journey</button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer style={{
      maxWidth: 1440, margin: '32px auto 0',
      padding: '20px 24px',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      fontSize: '0.72rem', fontWeight: 600,
      color: 'var(--text-faint)',
      fontFamily: "'Outfit', sans-serif",
    }}>
      Crafted with <Heart size={11} style={{ color: '#C0392B', fill: '#C0392B', margin: '0 2px' }} /> for PromptWars ·
      Powered by Google Gemini 2.5 Flash
    </footer>
  );
}
