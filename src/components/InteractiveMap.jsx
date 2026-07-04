import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from 'lucide-react';

const ICON_COLORS = {
  temple:     '#B8860B',
  restaurant: '#C0392B',
  food:       '#C0392B',
  museum:     '#2D3F6B',
  heritage:   '#2D3F6B',
  market:     '#2D5016',
  park:       '#4A7C2F',
  beach:      '#1A7DAA',
  hotel:      '#8B5E3C',
  transport:  '#5C3317',
  hidden:     '#8B3A9E',
  event:      '#8B3A0F',
  default:    '#B8860B',
};

function getColor(type) {
  if (!type) return ICON_COLORS.default;
  const t = type.toLowerCase();
  for (const [k, v] of Object.entries(ICON_COLORS)) {
    if (t.includes(k)) return v;
  }
  return ICON_COLORS.default;
}

function createMarkerIcon(color, _label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <defs>
        <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <path d="M16 0 C7.16 0 0 7.16 0 16 C0 24 8 32 16 40 C24 32 32 24 32 16 C32 7.16 24.84 0 16 0Z"
            fill="${color}" filter="url(#shadow)"/>
      <circle cx="16" cy="16" r="8" fill="rgba(255,255,255,0.25)"/>
      <circle cx="16" cy="16" r="5" fill="rgba(255,255,255,0.9)"/>
    </svg>
  `;
  return window.L.divIcon({
    html: `<div style="position:relative;width:32px;height:40px">${svg}</div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
    className: '',
  });
}

function buildPopupHTML(item) {
  const color = getColor(item.type);
  const costText = typeof item.cost === 'number' ? `$${item.cost} USD` : (item.cost || '');
  return `
    <div style="
      background:linear-gradient(135deg,#38220E,#2C1810);
      border:1px solid rgba(184,134,11,0.35);
      border-radius:14px; padding:14px 16px;
      min-width:200px; max-width:260px;
      font-family:'Outfit',sans-serif;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);
    ">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;box-shadow:0 0 6px ${color}44"></div>
        <span style="font-size:0.62rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${color}">${item.type || 'Location'}</span>
      </div>
      <div style="font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#F5E6C8;margin-bottom:6px;line-height:1.25">
        ${item.activity || item.name || ''}
      </div>
      ${item.description ? `<p style="font-size:0.72rem;color:rgba(212,184,150,0.7);margin:0 0 8px;line-height:1.5;font-style:italic">${item.description.slice(0, 100)}${item.description.length > 100 ? '…' : ''}</p>` : ''}
      ${costText && costText !== 'Free' && costText !== '$0 USD' ? `<div style="display:inline-block;background:rgba(184,134,11,0.15);border:1px solid rgba(184,134,11,0.25);color:#DAA520;padding:2px 8px;border-radius:6px;font-size:0.68rem;font-weight:700">${costText}</div>` : ''}
      ${item.time ? `<div style="font-size:0.68rem;color:rgba(212,184,150,0.5);margin-top:4px">🕐 ${item.time}</div>` : ''}
    </div>
  `;
}

export default function InteractiveMap({ plan, compact }) {
  const mapRef    = useRef(null);
  const leafletRef = useRef(null);
  const [count, setCount] = useState(0);
  const mapHeight = compact ? 220 : 420;

  useEffect(() => {
    if (!mapRef.current || !window.L) return;
    if (leafletRef.current) {
      leafletRef.current.remove();
      leafletRef.current = null;
    }

    const map = window.L.map(mapRef.current, {
      zoomControl: !compact,
      scrollWheelZoom: !compact,
      dragging: !compact,
      doubleClickZoom: !compact,
      touchZoom: !compact,
    });
    leafletRef.current = map;

    window.L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19 }
    ).addTo(map);

    const markers = [];

    // Helper to safely get coords
    const getCoords = (item) => {
      const lat = item.latitude ?? item.coordinates?.[0];
      const lng = item.longitude ?? item.coordinates?.[1];
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
      return null;
    };

    // Itinerary activities
    if (plan?.itinerary) {
      Object.values(plan.itinerary).flat().forEach(act => {
        const coords = getCoords(act);
        if (coords) {
          const title = act.activityName || act.activity || 'Activity';
          window.L.marker(coords, { icon: createMarkerIcon(getColor(act.type), title) })
            .addTo(map)
            .bindPopup(buildPopupHTML({ ...act, activity: title, type: act.type || 'Activity' }), { maxWidth: 280, className: 'explorer-popup' });
          markers.push(coords);
        }
      });
    }

    // Hidden gems
    plan?.hiddenGems?.forEach(gem => {
      const coords = getCoords(gem);
      if (coords) {
        window.L.marker(coords, { icon: createMarkerIcon('#8B3A9E', gem.name) })
          .addTo(map)
          .bindPopup(buildPopupHTML({ ...gem, activity: gem.name, type: 'Hidden Gem', cost: 'Free' }), { maxWidth: 280 });
        markers.push(coords);
      }
    });

    // Heritage highlights
    plan?.heritage?.forEach(site => {
      const coords = getCoords(site);
      if (coords) {
        window.L.marker(coords, { icon: createMarkerIcon('#2D3F6B', site.name) })
          .addTo(map)
          .bindPopup(buildPopupHTML({ ...site, activity: site.name, type: 'Heritage Highlight', cost: 'Free' }), { maxWidth: 280 });
        markers.push(coords);
      }
    });

    // Authentic Food
    plan?.food?.forEach(dish => {
      const coords = getCoords(dish);
      if (coords) {
        const title = `${dish.name} @ ${dish.restaurantName}`;
        window.L.marker(coords, { icon: createMarkerIcon('#C0392B', title) })
          .addTo(map)
          .bindPopup(buildPopupHTML({ ...dish, activity: title, type: 'Cuisine', cost: dish.priceEstimate }), { maxWidth: 280 });
        markers.push(coords);
      }
    });

    // Local Events
    plan?.events?.forEach(ev => {
      const coords = getCoords(ev);
      if (coords) {
        window.L.marker(coords, { icon: createMarkerIcon('#8B3A0F', ev.name) })
          .addTo(map)
          .bindPopup(buildPopupHTML({ ...ev, activity: ev.name, type: ev.type || 'Local Event' }), { maxWidth: 280 });
        markers.push(coords);
      }
    });

    setCount(markers.length);

    if (markers.length > 0) {
      const bounds = window.L.latLngBounds(markers);
      map.fitBounds(bounds, { padding: [compact ? 20 : 40, compact ? 20 : 40], maxZoom: compact ? 10 : 13 });
    } else {
      map.setView([20, 0], 2);
    }

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [plan, compact]);

  if (!plan) return null;

  return (
    <div>
      <div
        ref={mapRef}
        style={{ height: mapHeight, width: '100%', borderRadius: compact ? '0 0 16px 16px' : 16, overflow: 'hidden' }}
      />
      {!compact && count > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 16px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          fontSize: '0.7rem', fontWeight: 700,
          color: 'var(--text-muted)',
          fontFamily: "'Outfit', sans-serif",
        }}>
          <Navigation size={12} style={{ color: 'var(--accent)' }} />
          {count} mapped location{count !== 1 ? 's' : ''} · Click markers to explore
        </div>
      )}
    </div>
  );
}
