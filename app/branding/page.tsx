'use client';

import React, { useState } from 'react';
import { StudioCanvas } from './components/StudioCanvas';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  images: {
    front: string;
    back: string;
  };
}

interface SideTransform {
  scale: number;
  posX: number;
  posY: number;
  isSaved: boolean;
}

const PRODUCTS: ProductItem[] = [
  { id: 'tshirt-male', name: "Men's T-Shirt", category: 'Tops', images: { front: '/mockups/tshirt-male-front.png', back: '/mockups/tshirt-male-back.png' } },
  { id: 'tshirt-female', name: "Women's T-Shirt", category: 'Tops', images: { front: '/mockups/tshirt-female-front.png', back: '/mockups/tshirt-female-back.png' } },
  { id: 'polo-male', name: "Men's Polo", category: 'Tops', images: { front: '/mockups/polo-male-front.png', back: '/mockups/polo-male-back.png' } },
  { id: 'polo-female', name: "Women's Polo", category: 'Tops', images: { front: '/mockups/polo-female-front.png', back: '/mockups/polo-female-back.png' } },
  { id: 'hoodie-male', name: "Men's Hoodie", category: 'Outerwear', images: { front: '/mockups/hoodie-male-front.png', back: '/mockups/hoodie-male-back.png' } },
  { id: 'hoodie-female', name: "Women's Hoodie", category: 'Outerwear', images: { front: '/mockups/hoodie-female-front.png', back: '/mockups/hoodie-female-back.png' } },
  { id: 'zip-hoodie-male', name: "Men's Zip Hoodie", category: 'Outerwear', images: { front: '/mockups/zip-hoodie-male-front.png', back: '/mockups/zip-hoodie-male-back.png' } },
  { id: 'zip-hoodie-female', name: "Women's Zip Hoodie", category: 'Outerwear', images: { front: '/mockups/zip-hoodie-female-front.png', back: '/mockups/zip-hoodie-female-back.png' } },
  { id: 'longsleeve-male', name: "Men's Long Sleeve", category: 'Tops', images: { front: '/mockups/longsleeve-male-front.png', back: '/mockups/longsleeve-male-back.png' } },
  { id: 'reflector-male', name: "Men's Reflector Vest", category: 'Workwear', images: { front: '/mockups/reflector-male-front.png', back: '/mockups/reflector-male-back.png' } },
  { id: 'reflector-female', name: "Women's Reflector Vest", category: 'Workwear', images: { front: '/mockups/reflector-female-front.png', back: '/mockups/reflector-female-back.png' } },
  { id: 'cap', name: 'Branded Cap', category: 'Headwear', images: { front: '/mockups/cap-front.png', back: '/mockups/cap-back.png' } },
  { id: 'tote', name: 'Canvas Tote Bag', category: 'Bags', images: { front: '/mockups/tote-front.png', back: '/mockups/tote-back.png' } },
];

const DEFAULT_TRANSFORM: SideTransform = { scale: 1.0, posX: 0, posY: 0, isSaved: false };

export default function StudioPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS[0]);
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');
  const [isNightMode, setIsNightMode] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [stepSize, setStepSize] = useState(10);

  const [frontTransform, setFrontTransform] = useState<SideTransform>({ ...DEFAULT_TRANSFORM });
  const [backTransform, setBackTransform] = useState<SideTransform>({ ...DEFAULT_TRANSFORM });

  const activeTransform = selectedSide === 'front' ? frontTransform : backTransform;

  const updateActiveTransform = (updates: Partial<SideTransform>) => {
    if (selectedSide === 'front') {
      setFrontTransform((prev) => ({ ...prev, ...updates, isSaved: false }));
    } else {
      setBackTransform((prev) => ({ ...prev, ...updates, isSaved: false }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoSrc(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const nudgeUp = () => updateActiveTransform({ posY: Math.max(-140, activeTransform.posY - stepSize) });
  const nudgeDown = () => updateActiveTransform({ posY: Math.min(140, activeTransform.posY + stepSize) });
  const nudgeLeft = () => updateActiveTransform({ posX: Math.max(-140, activeTransform.posX - stepSize) });
  const nudgeRight = () => updateActiveTransform({ posX: Math.min(140, activeTransform.posX + stepSize) });

  const zoomIn = () => updateActiveTransform({ scale: Math.min(2.5, activeTransform.scale + 0.1) });
  const zoomOut = () => updateActiveTransform({ scale: Math.max(0.3, activeTransform.scale - 0.1) });

  const handleSaveAndSwitch = () => {
    if (selectedSide === 'front') {
      setFrontTransform((prev) => ({ ...prev, isSaved: true }));
      setSelectedSide('back');
    } else {
      setBackTransform((prev) => ({ ...prev, isSaved: true }));
      setSelectedSide('front');
    }
  };

  const handleCopyFrontToBack = () => {
    setBackTransform({ ...frontTransform, isSaved: true });
    setSelectedSide('back');
  };

  const handleProceed = () => {
    alert(`Artwork saved successfully!\n\nFront side: ${frontTransform.isSaved ? 'Saved' : 'Default'}\nBack side: ${backTransform.isSaved ? 'Saved' : 'Default'}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', padding: '24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        
        {/* Controls Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#18181b', padding: '20px', borderRadius: '12px', border: '1px solid #27272a' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Branded Cap Studio</h2>

          <div>
            <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>Garment Selection</label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const prod = PRODUCTS.find((p) => p.id === e.target.value);
                if (prod) setSelectedProduct(prod);
              }}
              className="studio-select"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>Active View Side</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedSide('front')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  backgroundColor: selectedSide === 'front' ? '#d97706' : '#27272a',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Front View {frontTransform.isSaved && '✓'}
              </button>

              <button
                onClick={() => setSelectedSide('back')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  backgroundColor: selectedSide === 'back' ? '#d97706' : '#27272a',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Back View {backTransform.isSaved && '✓'}
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>Upload Logo Artwork</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ fontSize: '12px', width: '100%' }} />
          </div>

          {logoSrc && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '12px', borderTop: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fbbf24' }}>
                  {selectedSide.toUpperCase()} Side Controls
                </span>
                <span style={{ fontSize: '11px', color: activeTransform.isSaved ? '#4ade80' : '#f87171', fontWeight: 'bold' }}>
                  {logoSrc ? (activeTransform.isSaved ? '✓ Saved' : '– Unsaved') : ''}
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '11px', color: '#a1a1aa' }}>Position Nudge</label>
                  <select
                    value={stepSize}
                    onChange={(e) => setStepSize(Number(e.target.value))}
                    style={{ backgroundColor: '#27272a', color: '#fff', fontSize: '10px', border: '1px solid #3f3f46', borderRadius: '4px', padding: '2px 4px' }}
                  >
                    <option value={2}>2px (Fine)</option>
                    <option value={10}>10px (Medium)</option>
                    <option value={25}>25px (Coarse)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxWidth: '180px', margin: '0 auto' }}>
                  <div />
                  <button onClick={nudgeUp} className="studio-pad-btn">▲</button>
                  <div />
                  <button onClick={nudgeLeft} className="studio-pad-btn">◀</button>
                  <button onClick={() => updateActiveTransform({ posX: 0, posY: 0, scale: 1.0 })} className="studio-pad-btn" style={{ fontSize: '10px', backgroundColor: '#3f3f46' }}>Reset</button>
                  <button onClick={nudgeRight} className="studio-pad-btn">▶</button>
                  <div />
                  <button onClick={nudgeDown} className="studio-pad-btn">▼</button>
                  <div />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>
                  Artwork Scale ({activeTransform.scale.toFixed(1)}x)
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={zoomOut} className="studio-pad-btn">-</button>
                  <input
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.05"
                    value={activeTransform.scale}
                    onChange={(e) => updateActiveTransform({ scale: parseFloat(e.target.value) })}
                    style={{ flex: 1 }}
                  />
                  <button onClick={zoomIn} className="studio-pad-btn">+</button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px dashed #3f3f46' }}>
                <button
                  onClick={handleSaveAndSwitch}
                  className="studio-primary-btn"
                >
                  Save {selectedSide.toUpperCase()} & Switch to {selectedSide === 'front' ? 'BACK' : 'FRONT'}
                </button>

                {selectedSide === 'back' && (
                  <button
                    onClick={handleCopyFrontToBack}
                    style={{
                      padding: '8px',
                      backgroundColor: '#27272a',
                      color: '#fbbf24',
                      border: '1px solid #3f3f46',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy Front Position to Back Side
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleProceed}
            className="studio-primary-btn"
            style={{ marginTop: 'auto' }}
          >
            Save & Proceed
          </button>
        </div>

        {/* Studio Canvas */}
        <div>
          <StudioCanvas
            activeImageSrc={selectedProduct.images[selectedSide]}
            activeProductName={selectedProduct.name}
            isNightMode={isNightMode}
            currentLogo={logoSrc}
            selectedSide={selectedSide}
            activeScale={activeTransform.scale}
            activeX={activeTransform.posX}
            activeY={activeTransform.posY}
            onPositionChange={(posX, posY) => updateActiveTransform({ posX, posY })}
          />
        </div>

      </div>
    </div>
  );
}