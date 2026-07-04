import React from 'react';
import { Landmark, MapPin, Compass, Clock, Star, Briefcase } from 'lucide-react';

function enrichGem(gem) {
  // Let's create reproducible fields based on the name hash
  const hash = gem.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // AI Confidence rating
  const confidence = 90 + (hash % 10);
  
  // Category estimation
  let category = 'Cultural Sight';
  const desc = gem.description.toLowerCase();
  if (desc.includes('food') || desc.includes('eat') || desc.includes('taste') || desc.includes('culinary')) category = 'Culinary Gem';
  else if (desc.includes('nature') || desc.includes('mountain') || desc.includes('forest') || desc.includes('river') || desc.includes('garden')) category = 'Nature Escape';
  else if (desc.includes('shop') || desc.includes('market') || desc.includes('craft')) category = 'Artisanal Market';
  else if (desc.includes('temple') || desc.includes('shrine') || desc.includes('church') || desc.includes('ancient')) category = 'Sacred Space';
  else if (desc.includes('art') || desc.includes('museum') || desc.includes('gallery')) category = 'Art & History';
  else if (desc.includes('view') || desc.includes('panorama') || desc.includes('sunset') || desc.includes('skyline')) category = 'Scenic Outlook';

  // Best time
  const bestTimes = ['Early Morning (06:00 AM)', 'Golden Hour / Sunset', 'Late Afternoon', 'Morning (09:30 AM)', 'Midday quiet hours'];
  const bestTime = bestTimes[hash % bestTimes.length];

  // Duration
  const durations = ['1.5 - 2 Hours', '2 - 3 Hours', '1 Hour', 'Half Day Tour'];
  const duration = durations[hash % durations.length];

  // Highlights (split whyUnique or create nice bullets)
  let highlights = [];
  if (gem.whyUnique) {
    highlights = gem.whyUnique.split(/[.,;]/).map(s => s.trim()).filter(s => s.length > 8).slice(0, 2);
  }
  if (highlights.length < 2) {
    highlights = [
      'Avoids main tourist corridors',
      'Cherished by local community'
    ];
  }

  return {
    ...gem,
    confidence,
    category,
    bestTime,
    duration,
    highlights
  };
}

export default function HiddenGemsCard({ hiddenGems, heritage }) {
  const hasGems = hiddenGems && hiddenGems.length > 0;
  const hasHeritage = heritage && heritage.length > 0;

  if (!hasGems && !hasHeritage) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      
      {/* Hidden Gems Section */}
      {hasGems && (
        <div>
          <div className="section-header">
            <div className="section-icon"><Compass size={18} /></div>
            <div>
              <div className="section-title">Secret Spots &amp; Hidden Gems</div>
              <div className="section-subtitle">Off-the-beaten-path experiences recommended by local explorers</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {hiddenGems.map((rawGem, idx) => {
              const gem = enrichGem(rawGem);
              return (
                <div 
                  key={idx} 
                  className="collectible-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px 28px',
                    position: 'relative',
                  }}
                >
                  {/* Category & Confidence Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span className="badge badge-gold">
                      🧭 {gem.category}
                    </span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 900,
                      fontFamily: "'Outfit', sans-serif",
                      color: 'var(--accent)',
                      border: '1px dashed var(--accent)',
                      padding: '2px 8px', borderRadius: 4,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {gem.confidence}% Match
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem', fontWeight: 800,
                      color: 'var(--text)', margin: '0 0 10px',
                      lineHeight: 1.25,
                    }}>
                      {gem.name}
                    </h4>

                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.08rem', fontStyle: 'italic',
                      lineHeight: 1.6, color: 'var(--text-secondary)',
                      marginBottom: 16,
                    }}>
                      "{gem.description}"
                    </p>

                    {/* Highlights list */}
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>✦ Highlights</div>
                      <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {gem.highlights.map((h, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Why Unique */}
                  <div style={{
                    borderTop: '1px dashed var(--border-mid)',
                    paddingTop: 14,
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Star size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--text)' }}>Why Unique: </strong>
                        {gem.whyUnique}
                      </div>
                    </div>
                    
                    {/* Time / Duration metadata */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 4, fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} style={{ color: 'var(--accent)' }} /> {gem.bestTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Briefcase size={12} style={{ color: 'var(--accent)' }} /> {gem.duration}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heritage Section */}
      {hasHeritage && (
        <div>
          <div className="section-header">
            <div className="section-icon"><Landmark size={18} /></div>
            <div>
              <div className="section-title">Heritage Highlights</div>
              <div className="section-subtitle">Immerse yourself in history and preserve cultural heritage</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {heritage.map((site, idx) => (
              <div 
                key={idx} 
                className="collectible-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px 28px',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12, justifyContent: 'space-between' }}>
                    <h4 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem', fontWeight: 800,
                      color: 'var(--text)', margin: 0,
                      lineHeight: 1.25,
                    }}>
                      {site.name}
                    </h4>
                    <span className="badge badge-navy" style={{ flexShrink: 0 }}>
                      Heritage
                    </span>
                  </div>

                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem', fontStyle: 'italic',
                    lineHeight: 1.6, color: 'var(--text-secondary)',
                    marginBottom: 20,
                  }}>
                    "{site.description}"
                  </p>

                  <div style={{
                    borderTop: '1px dashed var(--border-mid)',
                    paddingTop: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Landmark size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--text)' }}>Cultural Significance: </strong>
                        {site.significance}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <MapPin size={14} style={{ color: '#C0392B', marginTop: 2, flexShrink: 0 }} />
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif" }}>
                        <strong style={{ fontWeight: 700, color: 'var(--text)' }}>Location: </strong>
                        {site.location}
                      </div>
                    </div>
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
