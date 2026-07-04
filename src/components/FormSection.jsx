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
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleInterest = (label) => {
    set('interests', form.interests.includes(label)
      ? form.interests.filter(i => i !== label)
      : [...form.interests, label]
    );
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
            onChange={e => set('destination', e.target.value)}
            style={inputStyle}
          />
          {errors.destination && <div style={{ fontSize: '0.7rem', color: errColor, marginTop: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{errors.destination}</div>}
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
          )}
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
