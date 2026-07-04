import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Compass } from 'lucide-react';

const TRAVEL_STYLES = [
  { value: 'Solo',      emoji: '🧳' },
  { value: 'Couple',    emoji: '💑' },
  { value: 'Family',    emoji: '👨‍👩‍👧‍👦' },
  { value: 'Friends',   emoji: '🫂' },
  { value: 'Adventure', emoji: '⛺' },
  { value: 'Business',  emoji: '💼' },
];

const INTERESTS_LIST = [
  { label: 'History',      emoji: '🏛️' },
  { label: 'Food',         emoji: '🍜' },
  { label: 'Art',          emoji: '🎨' },
  { label: 'Nature',       emoji: '🌿' },
  { label: 'Architecture', emoji: '🏰' },
  { label: 'Music',        emoji: '🎵' },
  { label: 'Shopping',     emoji: '🛍️' },
  { label: 'Festivals',    emoji: '🎊' },
  { label: 'Local Life',   emoji: '🏘️' },
  { label: 'Nightlife',    emoji: '🌙' },
  { label: 'Photography',  emoji: '📸' },
  { label: 'Wellness',     emoji: '🧘' },
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Arabic', 'Portuguese', 'Italian', 'Hindi'];

const CURATED_ERAS = {
  kyoto: [
    'Present Day (Modern Era)',
    'Heian Period (794 - 1185)',
    'Samurai Era / Sengoku (1467 - 1603)',
    'Meiji Restoration (1868 - 1912)',
    'Future Kyoto (2050)'
  ],
  delhi: [
    'Present Day (Modern Era)',
    'Indraprastha Era (Ancient)',
    'Delhi Sultanate (1206 - 1526)',
    'Mughal Era (1526 - 1857)',
    'British Raj (1858 - 1947)',
    'Future Delhi (2050)'
  ],
  rome: [
    'Present Day (Modern Era)',
    'Roman Republic (509 BCE - 27 BCE)',
    'Roman Empire (27 BCE - 476 CE)',
    'Renaissance Period (1400 - 1600)',
    'Future Rome (2050)'
  ],
  paris: [
    'Present Day (Modern Era)',
    'Medieval Paris (1100 - 1400)',
    'Belle Époque (1871 - 1914)',
    'Future Paris (2050)'
  ],
  mumbai: [
    'Present Day (Modern Era)',
    'Maurya Empire (250 BCE)',
    'Portuguese Bombay (1534 - 1661)',
    'British East India Company (1661 - 1858)',
    'Future Mumbai (2050)'
  ],
  default: [
    'Present Day (Modern Era)',
    'Future Era (2050)'
  ]
};

function getErasForDestination(dest) {
  if (!dest) return CURATED_ERAS.default;
  const d = dest.toLowerCase();
  if (d.includes('kyoto')) return CURATED_ERAS.kyoto;
  if (d.includes('delhi')) return CURATED_ERAS.delhi;
  if (d.includes('rome')) return CURATED_ERAS.rome;
  if (d.includes('paris')) return CURATED_ERAS.paris;
  if (d.includes('mumbai')) return CURATED_ERAS.mumbai;
  return CURATED_ERAS.default;
}

export default function FormSection({ onSubmit, isLoading, initialValues, heroMode, compact }) {
  const [form, setForm] = useState({
    destination:   initialValues?.destination   || '',
    startDate:     initialValues?.startDate     || '',
    endDate:       initialValues?.endDate       || '',
    budget:        initialValues?.budget        || '',
    travelers:     initialValues?.travelers     || 2,
    travelStyle:   initialValues?.travelStyle   || 'Couple',
    interests:     initialValues?.interests     || ['History', 'Food'],
    language:      initialValues?.language      || 'English',
    accessibility: initialValues?.accessibility || '',
    era:           initialValues?.era           || 'Present Day (Modern Era)',
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleInterest = (label) => {
    set('interests', form.interests.includes(label)
      ? form.interests.filter(i => i !== label)
      : [...form.interests, label]
    );
  };

  const handleDestinationChange = (val) => {
    set('destination', val);
    const newEras = getErasForDestination(val);
    if (!newEras.includes(form.era)) {
      set('era', newEras[0]);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.destination.trim()) e.destination = 'Where would you like to go?';
    if (!form.startDate)          e.startDate   = 'When does your journey begin?';
    if (!form.endDate)            e.endDate     = 'When does your journey end?';
    if (!form.budget || Number(form.budget) <= 0) e.budget = 'Enter your travel budget';
    if (form.interests.length === 0)  e.interests = 'Choose at least one interest';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      budget:    Number(form.budget),
      travelers: Number(form.travelers),
    });
  };

  // Style classes based on mode
  const inputCls  = heroMode ? 'hero-input'       : 'explorer-input';
  const labelCls  = heroMode ? 'hero-label'       : 'explorer-label';
  const tagCls    = heroMode ? 'hero-tag'         : 'interest-tag';
  const tagSelCls = heroMode ? 'hero-tag-selected': 'interest-selected';
  const pillCls   = heroMode ? 'hero-style-pill'  : 'style-pill';
  const pillSelCls= heroMode ? 'hero-style-selected' : 'style-selected';
  const errColor  = heroMode ? 'rgba(255,100,100,0.8)' : '#C0392B';

  const inputStyle = heroMode ? {} : {};
  const selectBg   = heroMode
    ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(245,230,200,0.9)' }
    : { background: 'var(--bg-input)', color: 'var(--text)' };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!compact && (
        <div style={{
          textAlign: 'center', marginBottom: 22,
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: heroMode ? '1.3rem' : '1.1rem',
            fontWeight: 700,
            color: heroMode ? 'rgba(245,230,200,0.9)' : 'var(--text)',
            marginBottom: 4,
          }}>
            🗺️ Where would you like to explore?
          </div>
          {heroMode && (
            <p style={{ fontSize: '0.78rem', color: 'rgba(212,184,150,0.55)', fontFamily: "'Outfit', sans-serif" }}>
              Tell Gemini your dream and it will craft your complete cultural guide.
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 12 : 18 }}>

        {/* Destination */}
        <div>
          <label className={labelCls}>
            <MapPin size={11} /> Destination
          </label>
          <input
            className={inputCls}
            type="text"
            placeholder="e.g. Kyoto, Japan · Marrakech, Morocco · Cusco, Peru"
            value={form.destination}
            onChange={e => handleDestinationChange(e.target.value)}
            style={inputStyle}
          />
          {errors.destination && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.destination}</div>}
        </div>

        {/* ChronoLens Era Selector */}
        <div>
          <label className={labelCls} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            ⏳ ChronoLens Era Selector
          </label>
          <select
            className={inputCls}
            value={form.era}
            onChange={e => set('era', e.target.value)}
            style={{ ...selectBg, fontWeight: 700 }}
          >
            {getErasForDestination(form.destination).map(era => (
              <option key={era} value={era} style={{ background: '#2C1810', color: '#F5E6C8' }}>
                {era}
              </option>
            ))}
          </select>
          <p style={{ fontSize: '0.62rem', color: heroMode ? 'rgba(212,184,150,0.6)' : 'var(--text-muted)', marginTop: 4, fontFamily: "'Outfit', sans-serif" }}>
            Reconstruct the destination's daily life, culture, and architecture during this period.
          </p>
        </div>

        {/* Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className={labelCls}><Calendar size={11} /> From</label>
            <input className={inputCls} type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} style={{ ...selectBg }} />
            {errors.startDate && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.startDate}</div>}
          </div>
          <div>
            <label className={labelCls}><Calendar size={11} /> Until</label>
            <input className={inputCls} type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} style={{ ...selectBg }} />
            {errors.endDate && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.endDate}</div>}
          </div>
        </div>

        {/* Budget & Travelers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className={labelCls}><DollarSign size={11} /> Budget (USD)</label>
            <input
              className={inputCls} type="number" min="1"
              placeholder="e.g. 1500"
              value={form.budget}
              onChange={e => set('budget', e.target.value)}
              style={inputStyle}
            />
            {errors.budget && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.budget}</div>}
          </div>
          <div>
            <label className={labelCls}><Users size={11} /> Travelers</label>
            <select
              className={inputCls}
              value={form.travelers}
              onChange={e => set('travelers', e.target.value)}
              style={{ ...selectBg }}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n} style={{ background: '#2C1810', color: '#F5E6C8' }}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className={labelCls}><Compass size={11} /> Travel Style</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {TRAVEL_STYLES.map(s => (
              <button
                key={s.value} type="button"
                onClick={() => set('travelStyle', s.value)}
                className={`${pillCls}${form.travelStyle === s.value ? ' ' + pillSelCls : ''}`}
                style={{ minWidth: 0 }}
              >
                <span style={{ fontSize: '1.1rem' }}>{s.emoji}</span>
                <span>{s.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className={labelCls}>🎯 Interests</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {INTERESTS_LIST.map(({ label, emoji }) => (
              <button
                key={label} type="button"
                onClick={() => toggleInterest(label)}
                className={`${tagCls}${form.interests.includes(label) ? ' ' + tagSelCls : ''}`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
          {errors.interests && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.interests}</div>}
        </div>

        {/* Language */}
        <div>
          <label className={labelCls}>🌐 Preferred Language</label>
          <select
            className={inputCls}
            value={form.language}
            onChange={e => set('language', e.target.value)}
            style={{ ...selectBg }}
          >
            {LANGUAGES.map(l => (
              <option key={l} value={l} style={{ background: '#2C1810', color: '#F5E6C8' }}>{l}</option>
            ))}
          </select>
        </div>

        {/* Accessibility (optional) */}
        {!compact && (
          <div>
            <label className={labelCls}>♿ Accessibility Notes <span style={{ textTransform: 'none', fontWeight: 600, opacity: 0.6 }}>(optional)</span></label>
            <input
              className={inputCls} type="text"
              placeholder="e.g. Wheelchair accessible routes preferred"
              value={form.accessibility}
              onChange={e => set('accessibility', e.target.value)}
              style={inputStyle}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-journey"
          style={{ marginTop: compact ? 4 : 8 }}
        >
          {isLoading ? (
            <>
              <Compass size={18} className="spin-slow" />
              Charting Course…
            </>
          ) : (
            <>
              <Compass size={18} />
              {compact ? 'Re-generate Journey' : 'Discover My Journey'}
            </>
          ) }
        </button>

        {!compact && !heroMode && (
          <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-faint)', fontFamily: "'Outfit', sans-serif", marginTop: -4 }}>
            ✦ One click · One AI call · Your complete cultural guide
          </p>
        )}
      </div>
    </form>
  );
}
