import React, { useState } from 'react';
import { Landmark, Users, Calendar, AlertCircle, Compass } from 'lucide-react';

export default function ChronoLens({ data }) {
  const [activeSubTab, setActiveSubTab] = useState('narrative');

  if (!data) return null;

  // Destructure chronoLens payload
  const {
    era = 'Present Day',
    historicalOverview = '',
    dailyLife = [],
    architecture = [],
    clothing = [],
    foodHistory = [],
    transportation = [],
    historicalFigures = [],
    majorEvents = [],
    thenVsNow = [],
    historicalEtiquette = [],
    immersiveStory = ''
  } = data;

  const SUB_TABS = [
    { id: 'narrative', label: 'Immersive Story', emoji: '📜' },
    { id: 'comparison', label: 'Then vs Now', emoji: '🔄' },
    { id: 'dailyLife', label: 'Daily Life', emoji: '🌞' },
    { id: 'characters', label: 'Figures & Events', emoji: '👑' },
    { id: 'aesthetics', label: 'Aesthetics & Rules', emoji: '⛩️' },
  ];

  return (
    <div className="explorer-card" style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div className="section-icon">⏳</div>
        <div>
          <div className="section-title">ChronoLens AI Portal</div>
          <div className="section-subtitle">
            Exploring <strong style={{ color: 'var(--accent)' }}>{era}</strong> Reconstruction
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 28,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 10
        }}
      >
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeSubTab === tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: `1.5px solid ${activeSubTab === tab.id ? 'var(--accent)' : 'transparent'}`,
              background: activeSubTab === tab.id ? 'var(--accent-subtle)' : 'transparent',
              color: activeSubTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Panel Content */}
      <div style={{ minHeight: 280 }}>

        {/* Immersive Narrative Tab */}
        {activeSubTab === 'narrative' && (
          <div style={{ animation: 'fade-up 0.3s ease both' }}>
            <div className="historical-scroll" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: 14,
                borderBottom: '1px solid var(--border-mid)',
                paddingBottom: 8
              }}>
                📖 Cinematic Travel Log
              </h3>
              
              {immersiveStory ? (
                <p className="journal-drop-cap" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line'
                }}>
                  {immersiveStory}
                </p>
              ) : (
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No narrative logs recorded for this era.</p>
              )}
            </div>

            {historicalOverview && (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 18
              }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Compass size={14} style={{ color: 'var(--accent)' }} /> Era Historical Context
                </h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {historicalOverview}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Then vs Now Comparison */}
        {activeSubTab === 'comparison' && (
          <div style={{ animation: 'fade-up 0.3s ease both' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              Explore how key landmarks and areas have evolved from the {era} to the modern city layout.
            </p>

            {thenVsNow.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {thenVsNow.map((item, idx) => (
                  <div key={idx} className="then-now-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      padding: '12px 16px',
                      background: 'var(--accent-subtle)',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      <Landmark size={14} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                        {item.place}
                      </span>
                    </div>
                    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'center' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800,
                          padding: '2px 6px', borderRadius: 4,
                          background: '#8B3A0F', color: '#FFF',
                          fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase',
                          marginTop: 2
                        }}>
                          Then
                        </span>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', margin: 0 }}>
                          {item.then}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderTop: '1px dashed var(--border)', paddingTop: 10 }}>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800,
                          padding: '2px 6px', borderRadius: 4,
                          background: '#1A7DAA', color: '#FFF',
                          fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase',
                          marginTop: 2
                        }}>
                          Now
                        </span>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          {item.now}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No then-vs-now comparisons available for this era.</p>
            )}
          </div>
        )}

        {/* Daily Life Block Tab */}
        {activeSubTab === 'dailyLife' && (
          <div style={{ animation: 'fade-up 0.3s ease both' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              How average inhabitants structured their schedules, occupied themselves, and survived.
            </p>

            {dailyLife.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {dailyLife.map((block, idx) => {
                  let badgeColor = '#B8860B';
                  if (block.timeOfDay.toLowerCase().includes('morning')) badgeColor = '#D4A373';
                  if (block.timeOfDay.toLowerCase().includes('afternoon')) badgeColor = '#C0392B';
                  if (block.timeOfDay.toLowerCase().includes('evening') || block.timeOfDay.toLowerCase().includes('night')) badgeColor = '#2C3E50';

                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 14,
                        padding: 20,
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 16, right: 16,
                        fontSize: '0.6rem', fontWeight: 800,
                        padding: '3px 8px', borderRadius: 9999,
                        background: badgeColor + '20',
                        color: badgeColor,
                        border: `1px solid ${badgeColor}40`,
                        fontFamily: "'Outfit', sans-serif",
                        textTransform: 'uppercase', letterSpacing: '0.04em'
                      }}>
                        {block.timeOfDay}
                      </span>

                      <h4 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1rem', fontWeight: 700,
                        marginBottom: 12, color: 'var(--text)'
                      }}>
                        {block.timeOfDay} Routines
                      </h4>

                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.98rem', lineHeight: 1.6,
                        color: 'var(--text-secondary)', fontStyle: 'italic',
                        margin: 0
                      }}>
                        {block.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Daily schedule records not structured for this era.</p>
            )}
          </div>
        )}

        {/* Famous Characters & Milestones */}
        {activeSubTab === 'characters' && (
          <div style={{ animation: 'fade-up 0.3s ease both', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24 }}>
            {/* Figures */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={15} style={{ color: 'var(--accent)' }} /> Key Historic Personas
              </h4>
              
              {historicalFigures.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {historicalFigures.map((fig, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 16, borderRadius: 12,
                        background: 'var(--bg-secondary)', border: '1px solid var(--border)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 800, color: 'var(--text)' }}>
                          {fig.name}
                        </span>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800,
                          color: 'var(--accent)', fontFamily: "'Outfit', sans-serif",
                          textTransform: 'uppercase'
                        }}>
                          {fig.role}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                        {fig.connection}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No key personas profiles recorded.</p>
              )}
            </div>

            {/* Milestones */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={15} style={{ color: 'var(--accent)' }} /> Historic Milestones
              </h4>
              
              {majorEvents.length > 0 ? (
                <div style={{ position: 'relative', paddingLeft: 20 }}>
                  <div style={{
                    position: 'absolute', left: 4, top: 8, bottom: 8,
                    width: 1.5, background: 'var(--border-mid)', opacity: 0.5
                  }} />
                  
                  {majorEvents.map((evt, idx) => (
                    <div key={idx} style={{ position: 'relative', marginBottom: 16 }}>
                      <div style={{
                        position: 'absolute', left: -20, top: 4,
                        width: 8, height: 8, borderRadius: '50%',
                        background: 'var(--accent)', border: '2px solid var(--bg-card)'
                      }} />
                      <p style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem',
                        lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0
                      }}>
                        {evt}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No milestones archived for this era.</p>
              )}
            </div>
          </div>
        )}

        {/* Aesthetics & Rules Tab */}
        {activeSubTab === 'aesthetics' && (
          <div style={{ animation: 'fade-up 0.3s ease both', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {/* Columns left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Architecture */}
              {architecture.length > 0 && (
                <div style={{ padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                    🏛️ Architectural Elements
                  </h5>
                  <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {architecture.map((item, idx) => (
                      <li key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clothing */}
              {clothing.length > 0 && (
                <div style={{ padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                    👘 Fabrics & Dressing Style
                  </h5>
                  <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {clothing.map((item, idx) => (
                      <li key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Columns right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Food History */}
              {foodHistory.length > 0 && (
                <div style={{ padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                    🍲 Traditional Dining Customs
                  </h5>
                  <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {foodHistory.map((item, idx) => (
                      <li key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Transportation */}
              {transportation.length > 0 && (
                <div style={{ padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                    🐎 Methods of Transit
                  </h5>
                  <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {transportation.map((item, idx) => (
                      <li key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Etiquette (full width) */}
            {historicalEtiquette.length > 0 && (
              <div style={{ gridColumn: 'span 2', padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12 }}>
                <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                  ⚖️ Social Rules & Etiquette of the Period
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {historicalEtiquette.map((rule, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: -2 }}>•</span>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* AI Transparency Banner */}
      <div className="ai-transparency-banner">
        <AlertCircle size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span>
          <strong>Historical Reconstruction powered by Google Gemini</strong> · Generated from historical context and cultural knowledge. SPECULATIVE DETAILS AND ATMOSPHERIC RECONSTRUCTIONS ARE FOR IMMERSIVE STORYTELLING AND ARE NOT VERIFIED HISTORICAL FACTS.
        </span>
      </div>

    </div>
  );
}
