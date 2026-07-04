import React, { useState } from 'react';
import { Languages, Briefcase, Volume2, CheckSquare, Square, RefreshCw } from 'lucide-react';

export default function LanguagePacker({ packing, localPhrases }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const hasPacking = packing && packing.length > 0;
  const hasPhrases = localPhrases && localPhrases.length > 0;

  if (!hasPacking && !hasPhrases) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* 1. Smart Packing Checklist (6 cols) */}
      {hasPacking && (
        <div className="lg:col-span-6 explorer-card" style={{ padding: '28px 32px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border)', paddingBottom: 14, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--accent-subtle)', border: '1px solid rgba(184, 134, 11, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <Briefcase size={16} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
                  Smart Packing Checklist
                </h3>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", margin: '2px 0 0' }}>
                  Weather-responsive expedition packing checklist
                </p>
              </div>
            </div>

            <button 
              onClick={resetChecklist}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-faint)',
                fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}
              className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            >
              <RefreshCw size={11} />
              Clear items
            </button>
          </div>

          {/* Rules style list */}
          <div className="notebook-ruled" style={{ maxHeight: 310, overflowY: 'auto', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {packing.map((item, idx) => {
                const isChecked = !!checkedItems[item];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(184, 134, 11, 0.08)',
                      padding: '8px 12px 8px 48px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: isChecked ? 'var(--text-faint)' : 'var(--text-secondary)',
                      textDecoration: isChecked ? 'line-through' : 'none',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 650,
                      minHeight: 28,
                    }}
                    className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                  >
                    <span style={{ color: 'var(--accent)', marginLeft: -32, display: 'flex', alignItems: 'center' }}>
                      {isChecked ? (
                        <CheckSquare size={16} />
                      ) : (
                        <Square size={16} />
                      )}
                    </span>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 2. Local Language Assistant (6 cols) */}
      {hasPhrases && (
        <div className="lg:col-span-6 explorer-card" style={{ padding: '28px 32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 14, marginBottom: 18 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent-subtle)', border: '1px solid rgba(184, 134, 11, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}>
              <Languages size={16} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
                Language Assistant
              </h3>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", margin: '2px 0 0' }}>
                Key vocabulary, phonetic pronunciation, and usage
              </p>
            </div>
          </div>

          {/* List of Phrases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 310, overflowY: 'auto', paddingRight: 4 }}>
            {localPhrases.map((phrase, idx) => (
              <div 
                key={idx} 
                className="collectible-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyBetween: 'space-between', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 8, gap: 8 }}>
                  <div>
                    <span style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>
                      Local Phrase
                    </span>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', margin: '2px 0 0' }}>
                      {phrase.phrase}
                    </h4>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>
                      English
                    </span>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>
                      "{phrase.meaning}"
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Volume2 size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>🗣️ Pronounce: <code style={{ background: 'var(--bg-muted)', padding: '2px 6px', borderRadius: 4, color: 'var(--accent)', fontWeight: 800, fontFamily: 'monospace' }}>{phrase.pronunciation}</code></span>
                  </div>
                  <div>
                    <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--text)' }}>Usage context: </strong>
                    <span style={{ fontStyle: 'italic' }}>{phrase.usageExample}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
