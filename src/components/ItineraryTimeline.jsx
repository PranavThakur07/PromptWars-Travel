import React, { useState, useEffect } from 'react';
import { Clock, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const ACTIVITY_ICONS = {
  temple:     { emoji: '🛕', color: '#B8860B' },
  museum:     { emoji: '🏛️', color: '#2D3F6B' },
  restaurant: { emoji: '🍽️', color: '#C0392B' },
  food:       { emoji: '🍜', color: '#C0392B' },
  market:     { emoji: '🛍️', color: '#2D5016' },
  park:       { emoji: '🌿', color: '#4A7C2F' },
  beach:      { emoji: '🏖️', color: '#1A7DAA' },
  walk:       { emoji: '🚶', color: '#5C3317' },
  hotel:      { emoji: '🏨', color: '#8B5E3C' },
  transport:  { emoji: '🚌', color: '#5C3317' },
  train:      { emoji: '🚂', color: '#5C3317' },
  boat:       { emoji: '⛵', color: '#1A7DAA' },
  festival:   { emoji: '🎊', color: '#8B3A0F' },
  art:        { emoji: '🎨', color: '#6B2FA0' },
  photo:      { emoji: '📸', color: '#1A2744' },
  night:      { emoji: '🌙', color: '#1A2744' },
  default:    { emoji: '📍', color: '#B8860B' },
};

function getActivityMeta(type) {
  if (!type) return ACTIVITY_ICONS.default;
  const t = type.toLowerCase();
  for (const [k, v] of Object.entries(ACTIVITY_ICONS)) {
    if (k !== 'default' && t.includes(k)) return v;
  }
  return ACTIVITY_ICONS.default;
}

export default function ItineraryTimeline({ itinerary }) {
  const days = Object.keys(itinerary || {}).sort();
  const [activeDay, setActiveDay] = useState(days[0] || null);
  const [expanded, setExpanded] = useState({});

  // Sync activeDay if prop itinerary updates
  useEffect(() => {
    if (days.length > 0 && (!activeDay || !days.includes(activeDay))) {
      setActiveDay(days[0]);
    }
  }, [itinerary, days, activeDay]);

  if (!days.length) return null;

  const toggleExpand = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="explorer-card" style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-icon">📅</div>
        <div>
          <div className="section-title">Journey Itinerary</div>
          <div className="section-subtitle">{days.length}-day hand-crafted expedition plan</div>
        </div>
      </div>

      {/* Day tabs */}
      <div role="tablist" style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        {days.map(day => (
          <button
            key={day}
            role="tab"
            aria-selected={activeDay === day}
            onClick={() => setActiveDay(day)}
            style={{
              padding: '8px 18px',
              borderRadius: 10,
              border: `1.5px solid ${activeDay === day ? 'var(--accent)' : 'var(--border-mid)'}`,
              background: activeDay === day ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
              color: activeDay === day ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800, fontSize: '0.75rem',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          >
            {day}
          </button>
        ))}
      </div>

      {/* Activities for active day */}
      {activeDay && itinerary[activeDay] && (
        <div key={activeDay} style={{ animation: 'fade-up 0.35s cubic-bezier(0.16,1,0.3,1) both' }}>
          <div style={{ position: 'relative', paddingLeft: 36 }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 8, top: 20, bottom: 8,
              width: 2,
              background: 'linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)',
              opacity: 0.35,
            }} />

            {itinerary[activeDay].map((act, idx) => {
              const meta = getActivityMeta(act.type);
              const key  = `${activeDay}-${idx}`;
              const isOpen = expanded[key];

              return (
                <div
                  key={key}
                  className="timeline-item"
                  style={{
                    position: 'relative',
                    marginBottom: idx < itinerary[activeDay].length - 1 ? 16 : 0,
                    animation: `fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.06}s both`,
                  }}
                >
                  {/* Dot */}
                  <div className="timeline-dot" style={{ borderColor: meta.color }} />

                  {/* Card */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(key); } }}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = meta.color + '65'; e.currentTarget.style.boxShadow = `0 4px 20px ${meta.color}22`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                    onClick={() => toggleExpand(key)}
                  >
                    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      {/* Emoji badge */}
                      <div style={{
                        width: 40, height: 40, borderRadius: 11,
                        background: meta.color + '18',
                        border: `1px solid ${meta.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', flexShrink: 0,
                      }}>
                        {meta.emoji}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                          <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '0.95rem', fontWeight: 700,
                            color: 'var(--text)', margin: 0,
                            lineHeight: 1.3,
                          }}>
                            {act.activityName || act.activity}
                          </h4>
                          {isOpen
                            ? <ChevronUp size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            : <ChevronDown size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                          }
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'center' }}>
                          {act.time && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
                              <Clock size={11} style={{ color: meta.color }} /> {act.time}
                            </span>
                          )}
                          {typeof act.cost === 'number' && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
                              <DollarSign size={11} style={{ color: 'var(--accent)' }} /> {act.cost === 0 ? 'Free' : `${act.cost} USD`}
                            </span>
                          )}
                          {act.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
                              <MapPin size={11} style={{ color: '#C0392B' }} /> {act.location}
                            </span>
                          )}
                          <span style={{
                            fontSize: '0.6rem', fontWeight: 800,
                            padding: '2px 8px', borderRadius: 9999,
                            background: meta.color + '15',
                            color: meta.color,
                            border: `1px solid ${meta.color}25`,
                            fontFamily: "'Outfit', sans-serif",
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                          }}>
                            {act.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isOpen && act.description && (
                      <div style={{
                        padding: '0 16px 14px 68px',
                        animation: 'fade-in 0.2s ease both',
                      }}>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                          <p style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1rem', fontStyle: 'italic',
                            lineHeight: 1.7, color: 'var(--text-secondary)',
                            margin: 0,
                          }}>
                            {act.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
