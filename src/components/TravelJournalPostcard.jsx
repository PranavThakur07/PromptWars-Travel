import React, { useState } from 'react';
import { PenTool, Copy, Check, Heart, Share2, Camera } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export default function TravelJournalPostcard({ travelJournal, instagramCaption, destination }) {
  const [copied, setCopied] = useState(false);
  const [journalCopied, setJournalCopied] = useState(false);

  const handleCopyCaption = async () => {
    if (!instagramCaption) return;
    try {
      await copyToClipboard(instagramCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* silent */ }
  };

  const handleCopyJournal = async () => {
    if (!travelJournal) return;
    try {
      await copyToClipboard(travelJournal);
      setJournalCopied(true);
      setTimeout(() => setJournalCopied(false), 2200);
    } catch { /* silent */ }
  };

  const cleanDestination = destination || 'My Destination';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* 1. Travel Postcard & Journal (8 cols) */}
      <div className="lg:col-span-8 explorer-card" style={{ padding: '28px 32px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 14, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.2)',
              color: '#EC4899',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PenTool size={16} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
                Travel Postcard &amp; Journal
              </h3>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", margin: '2px 0 0' }}>
                Creative logs, memories, and vintage postcard designs
              </p>
            </div>
          </div>

          <button 
            onClick={handleCopyJournal}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent)',
              fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', gap: 4,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          >
            {journalCopied ? <><Check size={11} /> Copied Diary</> : <><Copy size={11} /> Copy Diary</>}
          </button>
        </div>

        {/* Physical Postcard Mockup UI */}
        <div className="postcard deckled-border" style={{
          borderRadius: 18,
          padding: '24px 28px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Handwritten Diary Message */}
            <div className="md:col-span-8 flex flex-col justify-between" style={{ borderRight: '1px solid var(--border-mid)', paddingRight: 24 }}>
              <div style={{ position: 'relative' }}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.72rem', fontWeight: 800,
                  color: '#C0392B', textTransform: 'uppercase',
                  letterSpacing: '0.12em', margin: '0 0 16px',
                }}>
                  🧭 Expedition Diary
                </h4>
                
                <p className="journal-drop-cap" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem', fontStyle: 'italic',
                  lineHeight: 1.8, color: 'var(--text-secondary)',
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}>
                  {travelJournal}
                </p>
              </div>
              
              <div style={{
                fontSize: '0.68rem', fontWeight: 700,
                color: 'var(--text-faint)', fontFamily: "'Outfit', sans-serif",
                paddingTop: 24, display: 'flex', alignItems: 'center', gap: 6
              }}>
                <Heart size={12} style={{ fill: '#C0392B', color: '#C0392B' }} />
                <span>Recorded dynamically at Culture Compass AI</span>
              </div>
            </div>

            {/* Right Side: Stamp, Wax Seal & Address */}
            <div className="md:col-span-4 flex flex-col justify-between items-stretch py-2" style={{ minHeight: 280 }}>
              
              {/* Stamp and Seal row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Wax Seal */}
                <div className="wax-seal" style={{ color: '#F5E6C8', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
                  C
                </div>

                {/* Postage Stamp */}
                <div style={{
                  width: 58, height: 72,
                  background: 'linear-gradient(135deg, #DAA520, #C0392B)',
                  borderRadius: 4, border: '2px double #FFFFFF',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', padding: 2,
                  transform: 'rotate(4deg)',
                }}>
                  <span style={{ fontSize: '0.45rem', fontWeight: 900, letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>POSTAGE</span>
                  <span style={{ fontSize: '1.2rem', margin: '2px 0' }}>🧭</span>
                  <span style={{ fontSize: '0.45rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>CULTURE AI</span>
                </div>
              </div>

              {/* Polaroid Snapshot Artwork in Postcard */}
              <div className="polaroid-frame" style={{ alignSelf: 'center', margin: '20px 0 10px', transform: 'rotate(-4deg)', width: 140 }}>
                <div style={{ background: 'var(--bg-muted)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                  <Camera size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.78rem', fontStyle: 'italic', fontWeight: 'bold',
                  textAlign: 'center', marginTop: 8, color: 'var(--text-secondary)'
                }}>
                  {cleanDestination}
                </div>
              </div>

              {/* Address lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.72rem', color: 'var(--text-faint)', fontFamily: "'Outfit', sans-serif" }}>
                <div style={{ borderBottom: '1px solid var(--border-mid)', pb: 1, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  To: Fellow Adventurer
                </div>
                <div style={{ borderBottom: '1px solid var(--border-mid)', pb: 1, fontStyle: 'italic', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  Loc: {cleanDestination}
                </div>
                <div style={{ borderBottom: '1px solid var(--border-mid)', pb: 1, fontWeight: 900, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.55rem' }}>
                  ★ GLOBAL HERITAGE STAMP ★
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 2. Instagram Social Caption (4 cols) */}
      <div className="lg:col-span-4 explorer-card" style={{ padding: '28px 32px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 14, marginBottom: 18 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--accent-subtle)', border: '1px solid rgba(184, 134, 11, 0.2)',
            color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Share2 size={16} />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
              Social Caption
            </h3>
            <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", margin: '2px 0 0' }}>
              Instagram &amp; social media capture
            </p>
          </div>
        </div>

        {/* Caption Display card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 18, borderRadius: 14, display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: 16 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.05rem', fontStyle: 'italic',
            lineHeight: 1.6, color: 'var(--text-secondary)',
            margin: 0,
            maxHeight: 190, overflowY: 'auto',
            whiteSpace: 'pre-line',
          }}>
            "{instagramCaption}"
          </p>

          <button
            onClick={handleCopyCaption}
            style={{
              width: '100%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: '12px 20px',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
              color: '#1C1008',
              border: 'none', borderRadius: 11,
              fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '0.78rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1.5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied Caption!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy Caption
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
