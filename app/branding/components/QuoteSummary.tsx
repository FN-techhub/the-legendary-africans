'use client';

import React from 'react';

interface QuoteSummaryProps {
  quantity: number;
  merchandiseTotal: number;
  servicesTotal: number;
  estimatedGrandTotal: number;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  quantity,
  merchandiseTotal,
  servicesTotal,
  estimatedGrandTotal,
}) => {
  return (
    <div style={{ backgroundColor: '#121318', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
      <div style={{ backgroundColor: '#18181b', padding: '16px', borderRadius: '8px', border: '1px solid #27272a', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '13px', color: '#a1a1aa', marginBottom: '6px' }}>
          <span>Merchandise Subtotal ({quantity} pcs)</span>
          <span>${merchandiseTotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '13px', color: '#a1a1aa', marginBottom: '10px' }}>
          <span>Branding / Design Services</span>
          <span>${servicesTotal.toFixed(2)}</span>
        </div>
        <div style={{ borderTop: '1px dashed #27272a', paddingTop: '10px', display: 'flex', justifyBetween: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>
          <span>Est. Grand Total</span>
          <span>${estimatedGrandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button style={{
        width: '100%',
        padding: '14px',
        backgroundColor: '#d97706',
        color: '#000000',
        fontWeight: 'bold',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
      }}>
        Submit Specs & Services for Quote
      </button>
    </div>
  );
};
