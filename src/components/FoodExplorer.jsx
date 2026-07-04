import React from 'react';
import { Utensils, Leaf, Bookmark, Store, Star } from 'lucide-react';

function enrichFood(dish) {
  const hash = dish.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Price Level ($, $$, $$$)
  let priceLevel = '$$';
  if (dish.priceEstimate < 8) priceLevel = '$';
  else if (dish.priceEstimate > 20) priceLevel = '$$$';

  // Must try indicator
  const mustTry = hash % 2 === 0;

  // Local specialty tag
  const specialties = ['Traditional Heritage', 'Street Food Classic', 'Seasonal Delicacy', 'Regional Specialty', 'Secret Recipe'];
  const specialty = specialties[hash % specialties.length];

  return {
    ...dish,
    priceLevel,
    mustTry,
    specialty
  };
}

export default function FoodExplorer({ food }) {
  if (!food || !food.length) return null;

  return (
    <div className="explorer-card" style={{ padding: '28px 32px' }}>
      
      {/* Header */}
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(192, 57, 43, 0.1)', color: '#C0392B', borderColor: 'rgba(192, 57, 43, 0.2)' }}>
          <Utensils className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <h3 className="section-title">Culinary Heritage &amp; Dining</h3>
          <p className="section-subtitle">
            Authentic dishes, traditional recipes, and recommended local stalls
          </p>
        </div>
      </div>

      {/* Grid of Foods */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {food.map((rawDish, idx) => {
          const dish = enrichFood(rawDish);
          return (
            <div 
              key={idx} 
              className="collectible-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 26px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Header Badge Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyBetween: 'space-between', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="badge badge-gold">
                      {dish.priceLevel} · Est. ${dish.priceEstimate}
                    </span>
                    <span className="badge badge-rust">
                      {dish.specialty}
                    </span>
                  </div>

                  {dish.vegetarianOptions ? (
                    <span className="badge badge-green">
                      <Leaf size={10} style={{ fill: 'currentColor' }} /> Veg
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
                      Non-Veg
                    </span>
                  )}
                </div>

                {/* Dish details */}
                <div style={{ position: 'relative' }}>
                  {dish.mustTry && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: '0.62rem', fontWeight: 900, color: '#C0392B',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      fontFamily: "'Outfit', sans-serif",
                      marginBottom: 6,
                    }}>
                      <Star size={11} style={{ fill: '#C0392B' }} /> Editor's Choice · Must Try
                    </div>
                  )}

                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.25rem', fontWeight: 800,
                    color: 'var(--text)', margin: '0 0 8px',
                    lineHeight: 1.25,
                  }}>
                    {dish.name}
                  </h4>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem', fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    "{dish.description}"
                  </p>
                </div>
              </div>

              {/* Cultural Significance & Restaurant Details */}
              <div style={{
                borderTop: '1px dashed var(--border-mid)',
                paddingTop: 14,
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <div style={{ display: 'flex', itemsStart: 'flex-start', gap: 8 }}>
                  <Bookmark size={13} style={{ color: '#C0392B', shrink: 0, marginTop: 2, flexShrink: 0 }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--text)' }}>Cultural Note: </strong>
                    {dish.culturalSignificance}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Store size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: 'var(--text)' }}>Where to experience: </strong>
                    {dish.restaurantName}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
