import React from 'react';
import { PiggyBank, AlertTriangle, ChevronRight, Wallet } from 'lucide-react';

export default function BudgetTravelPlanner({ budget, userBudget }) {
  if (!budget) return null;

  const totalCost = budget.estimatedTotalCost || 0;
  const remaining = budget.remainingBudget ?? (userBudget - totalCost);
  const isFeasible = budget.isFeasible ?? (remaining >= 0);

  // Percentages for cost distribution graph
  const transportPct = totalCost ? Math.round((budget.transport / totalCost) * 100) : 0;
  const foodPct = totalCost ? Math.round((budget.food / totalCost) * 100) : 0;
  const ticketsPct = totalCost ? Math.round((budget.tickets / totalCost) * 100) : 0;
  const shoppingPct = totalCost ? Math.round((budget.shopping / totalCost) * 100) : 0;
  const miscPct = totalCost ? Math.round((budget.miscellaneous / totalCost) * 100) : 0;

  return (
    <div className="explorer-card" style={{ padding: '28px 32px' }}>
      
      {/* Header */}
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(74, 124, 47, 0.1)', color: '#4A7C2F', borderColor: 'rgba(74, 124, 47, 0.2)' }}>
          <PiggyBank className="w-4 h-4" />
        </div>
        <div>
          <h3 className="section-title">Smart Budget Planner</h3>
          <p className="section-subtitle">
            Financial analytics and resource allocations for your journey
          </p>
        </div>
      </div>

      {/* Financial Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 28 }}>
        
        {/* Allocated Budget */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11,
            background: 'var(--border)',
            color: 'var(--text-secondary)',
            fontWeight: 900, fontSize: '1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            $
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>
              Allocated Budget
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', fontFamily: "'Outfit', sans-serif" }}>
              ${userBudget} USD
            </div>
          </div>
        </div>

        {/* Estimated Costs */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11,
            background: 'var(--accent-subtle)',
            color: 'var(--accent)',
            fontWeight: 900, fontSize: '1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(184, 134, 11, 0.2)'
          }}>
            $
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>
              Estimated Total
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', fontFamily: "'Outfit', sans-serif" }}>
              ${totalCost} USD
            </div>
          </div>
        </div>

        {/* Remaining Budget */}
        <div style={{ 
          background: isFeasible ? 'rgba(74, 124, 47, 0.04)' : 'rgba(192, 57, 43, 0.04)',
          border: `1.5px solid ${isFeasible ? 'rgba(74, 124, 47, 0.2)' : 'rgba(192, 57, 43, 0.2)'}`,
          padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11,
            background: isFeasible ? 'rgba(74, 124, 47, 0.1)' : 'rgba(192, 57, 43, 0.1)',
            color: isFeasible ? '#4A7C2F' : '#C0392B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wallet size={18} />
          </div>
          <div>
            <div style={{ 
              fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', 
              color: isFeasible ? '#4A7C2F' : '#C0392B',
              letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" 
            }}>
              {isFeasible ? 'Remaining Balance' : 'Budget Deficit'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 850, color: isFeasible ? '#4A7C2F' : '#C0392B', fontFamily: "'Outfit', sans-serif" }}>
              ${Math.abs(remaining)} USD
            </div>
          </div>
        </div>

      </div>

      {/* CSS Visual Distribution Bar */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: 22, borderRadius: 14, marginBottom: 28 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.06em', fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>
          📊 Expense Distribution
        </div>
        
        {/* Track */}
        <div className="budget-bar-track" style={{ height: 16, background: 'var(--bg-muted)', display: 'flex', borderRadius: 99 }}>
          {budget.transport > 0 && <div className="budget-bar-fill bg-amber-500" style={{ width: `${transportPct}%` }} title={`Transport: ${transportPct}%`} />}
          {budget.food > 0 && <div className="budget-bar-fill bg-emerald-500" style={{ width: `${foodPct}%` }} title={`Dining: ${foodPct}%`} />}
          {budget.tickets > 0 && <div className="budget-bar-fill bg-indigo-500" style={{ width: `${ticketsPct}%` }} title={`Sightseeing: ${ticketsPct}%`} />}
          {budget.shopping > 0 && <div className="budget-bar-fill bg-pink-500" style={{ width: `${shoppingPct}%` }} title={`Shopping: ${shoppingPct}%`} />}
          {budget.miscellaneous > 0 && <div className="budget-bar-fill bg-blue-400" style={{ width: `${miscPct}%` }} title={`Misc: ${miscPct}%`} />}
        </div>

        {/* Legend labels */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", marginTop: 14, justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: '#F59E0B' }} /> Transport (${budget.transport} · {transportPct}%)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: '#10B981' }} /> Dining (${budget.food} · {foodPct}%)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: '#6366F1' }} /> Sightseeing (${budget.tickets} · {ticketsPct}%)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: '#EC4899' }} /> Shopping (${budget.shopping} · {shoppingPct}%)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: '#60A5FA' }} /> Misc (${budget.miscellaneous} · {miscPct}%)</span>
        </div>
      </div>

      {/* Warnings & Saving Alternatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Warnings list */}
        <div>
          <h4 style={{
            fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
            color: '#C0392B', letterSpacing: '0.08em',
            fontFamily: "'Outfit', sans-serif", marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <AlertTriangle size={14} /> Financial Health Warnings
          </h4>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {budget.warnings && budget.warnings.length > 0 ? (
              budget.warnings.map((warn, idx) => (
                <li 
                  key={idx} 
                  style={{
                    background: 'rgba(192, 57, 43, 0.03)',
                    border: '1.5px solid rgba(192, 57, 43, 0.15)',
                    padding: '12px 16px', borderRadius: 10,
                    fontSize: '0.78rem', color: '#C0392B',
                    lineHeight: 1.45, display: 'flex', gap: 8,
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>•</span>
                  <span>{warn}</span>
                </li>
              ))
            ) : (
              <li style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                ✓ No budget constraints or warnings. Your allocated fund is healthy.
              </li>
            )}
          </ul>
        </div>

        {/* Alternatives list */}
        <div>
          <h4 style={{
            fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
            color: '#4A7C2F', letterSpacing: '0.08em',
            fontFamily: "'Outfit', sans-serif", marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <Wallet size={14} style={{ color: '#4A7C2F' }} /> Cost-Saving Alternatives
          </h4>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {budget.cheaperAlternatives && budget.cheaperAlternatives.length > 0 ? (
              budget.cheaperAlternatives.map((alt, idx) => (
                <li 
                  key={idx} 
                  style={{
                    background: 'rgba(74, 124, 47, 0.03)',
                    border: '1.5px solid rgba(74, 124, 47, 0.15)',
                    padding: '12px 16px', borderRadius: 10,
                    fontSize: '0.78rem', color: '#4A7C2F',
                    lineHeight: 1.45, display: 'flex', gap: 8,
                  }}
                >
                  <ChevronRight size={14} style={{ color: '#4A7C2F', flexShrink: 0, marginTop: 1 }} />
                  <span>{alt}</span>
                </li>
              ))
            ) : (
              <li style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                All calculations align perfectly. No swaps required.
              </li>
            )}
          </ul>
        </div>

      </div>

    </div>
  );
}
