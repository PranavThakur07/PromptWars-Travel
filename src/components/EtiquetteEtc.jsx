import React from 'react';
import { Globe, Calendar, CheckCircle2, XCircle, Camera, Coins, ShieldAlert, MapPin } from 'lucide-react';

export default function EtiquetteEtc({ culture, events, safetyTips }) {
  const hasCulture = !!culture;
  const hasEvents = events && events.length > 0;
  const hasSafetyTips = safetyTips && safetyTips.length > 0;

  if (!hasCulture && !hasEvents && !hasSafetyTips) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      
      {/* 1. Cultural Etiquette & Customs */}
      {hasCulture && (
        <div className="explorer-card" style={{ padding: '28px 32px' }}>
          
          <div className="section-header">
            <div className="section-icon" style={{ background: 'rgba(109, 47, 160, 0.1)', color: '#6B2FA0', borderColor: 'rgba(109, 47, 160, 0.2)' }}>
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="section-title">Cultural Etiquette &amp; Customs</h3>
              <p className="section-subtitle">
                Local rules, dress codes, tipping standards, and social greetings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left page: customs and dress code */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Greetings */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14 }}>
                <h4 style={{
                  fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
                  color: 'var(--accent)', letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                }}>
                  👋 Greetings &amp; Gestures
                </h4>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {culture.greetings}
                </p>
              </div>

              {/* General Customs */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14 }}>
                <h4 style={{
                  fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
                  color: 'var(--accent)', letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                }}>
                  🌐 General Customs
                </h4>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {culture.customs}
                </p>
              </div>

              {/* Dress Code & Photography */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14 }}>
                <h4 style={{
                  fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
                  color: 'var(--accent)', letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  👗 Dress &amp; Photography
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <div><strong style={{ color: 'var(--text)', fontFamily: "'Outfit', sans-serif" }}>Dress: </strong>{culture.dress}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <Camera size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                    <span>{culture.photographyRules}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right page: do's & don'ts, services */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Tipping & Services */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14 }}>
                <h4 style={{
                  fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
                  color: 'var(--accent)', letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  💵 Services &amp; Tipping
                </h4>
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <Coins size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                  <span>{culture.tipping}</span>
                </div>
              </div>

              {/* Do's & Don'ts Checklist */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14 }}>
                <h4 style={{
                  fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
                  color: 'var(--text)', letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif", marginBottom: 12,
                }}>
                  🎭 Behavior Protocol
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 style={{
                      fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase',
                      color: '#4A7C2F', letterSpacing: '0.06em',
                      display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8,
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      <CheckCircle2 size={12} /> Do's
                    </h5>
                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {culture.dos?.slice(0, 4).map((item, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <span style={{ color: '#4A7C2F', fontWeight: 'bold' }}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 style={{
                      fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase',
                      color: '#C0392B', letterSpacing: '0.06em',
                      display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8,
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      <XCircle size={12} /> Don'ts
                    </h5>
                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {culture.donts?.slice(0, 4).map((item, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <span style={{ color: '#C0392B', fontWeight: 'bold' }}>✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. Local Events */}
      {hasEvents && (
        <div className="explorer-card" style={{ padding: '28px 32px' }}>
          
          <div className="section-header">
            <div className="section-icon" style={{ background: 'rgba(26, 39, 68, 0.1)', color: '#2D3F6B', borderColor: 'rgba(26, 39, 68, 0.2)' }}>
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="section-title">Local Events &amp; Festivals</h3>
              <p className="section-subtitle">
                Seasonal gatherings, musical performance, and street markets matching your calendar dates
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {events.map((ev, idx) => (
              <div 
                key={idx} 
                className="collectible-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-navy">
                      {ev.type || 'Seasonal Event'}
                    </span>
                  </div>

                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.15rem', fontWeight: 800,
                    color: 'var(--text)', margin: '0 0 8px',
                    lineHeight: 1.25,
                  }}>
                    {ev.name}
                  </h4>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1rem', fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}>
                    "{ev.description}"
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  <MapPin size={12} style={{ color: '#C0392B', flexShrink: 0 }} />
                  <span className="truncate">{ev.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 3. Safety Tips */}
      {hasSafetyTips && (
        <div className="explorer-card" style={{ padding: '28px 32px' }}>
          
          <div className="section-header">
            <div className="section-icon" style={{ background: 'rgba(218, 165, 32, 0.1)', color: 'var(--accent)', borderColor: 'rgba(218, 165, 32, 0.2)' }}>
              <ShieldAlert className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="section-title">Safety &amp; Emergency Warnings</h3>
              <p className="section-subtitle">
                Local safety guidelines and critical alerts for peace of mind during your stay
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {safetyTips.map((tip, idx) => (
              <div
                key={idx}
                className="deckled-border"
                style={{
                  background: 'rgba(192, 57, 43, 0.03)',
                  border: '1.5px solid rgba(192, 57, 43, 0.2)',
                  borderRadius: 14,
                  padding: 16,
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <ShieldAlert size={16} style={{ color: '#C0392B', flexShrink: 0, marginTop: 1 }} />
                <span>{tip}</span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
