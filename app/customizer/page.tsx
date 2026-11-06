'use client';

import React, { useState } from 'react';

export default function PlaceitStyleCustomizer() {
  const [selectedShirt, setSelectedShirt] = useState<'white' | 'black'>('white');
  const [userDesign, setUserDesign] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserDesign(imageUrl);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDEBAR: CONTROLS */}
      <div style={{
        width: '320px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e6ed',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.03)',
        zIndex: 10
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Design Customizer</h2>

        {/* 1. Upload Design Button */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>
            Upload Design
          </label>
          <label style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {userDesign ? 'Change Image' : 'Upload Your Image'}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9' }} />

        {/* 2. Shirt Option Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>
            Select Garment Color
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setSelectedShirt('white')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: selectedShirt === 'white' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              White Shirt
            </button>
            <button
              onClick={() => setSelectedShirt('black')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: selectedShirt === 'black' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Black Shirt
            </button>
          </div>
        </div>

        {/* Save / Export Button */}
        <button style={{
          marginTop: 'auto',
          padding: '14px',
          backgroundColor: '#059669',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '15px',
          cursor: 'pointer'
        }}>
          Save & Export Mockup
        </button>
      </div>

      {/* RIGHT CANVAS AREA */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{
          position: 'relative',
          width: '500px',
          height: '650px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          backgroundColor: '#e2e8f0'
        }}>
          
          {/* Base Image Window with Object Positioning to Focus on White/Black Shirt */}
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <img
              src="/mockup/tshirt.png"
              alt="T-Shirt Mockup"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: selectedShirt === 'white' ? '85% center' : '15% center', // Pans image to white or black shirt
                transition: 'object-position 0.3s ease'
              }}
            />

            {/* Print Area Overlay for Artwork */}
            <div style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '190px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              {userDesign ? (
                <img
                  src={userDesign}
                  alt="Custom Uploaded Artwork"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{
                  border: '2px dashed #2563eb',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '16px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  color: '#1e3a8a',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' }}>UPLOAD YOUR IMAGE</div>
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#475569' }}>750 x 1200 px</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
