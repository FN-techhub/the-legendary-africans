'use client';

import React, { useState, useRef } from 'react';

interface StudioCanvasProps {
  activeImageSrc: string;
  activeProductName: string;
  isNightMode: boolean;
  currentLogo: string | null;
  selectedSide: 'front' | 'back';
  activeScale: number;
  activeX: number;
  activeY: number;
  onPositionChange: (posX: number, posY: number) => void;
}

export function StudioCanvas({
  activeImageSrc,
  activeProductName,
  isNightMode,
  currentLogo,
  selectedSide,
  activeScale,
  activeX,
  activeY,
  onPositionChange,
}: StudioCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!currentLogo) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - activeX,
      y: e.clientY - activeY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    // Bound limits to keep it inside canvas
    onPositionChange(
      Math.max(-140, Math.min(140, newX)),
      Math.max(-140, Math.min(140, newY))
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '600px',
        backgroundColor: isNightMode ? '#09090b' : '#27272a',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid #3f3f46',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Garment Mockup Base Image */}
      <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={activeImageSrc}
          alt={activeProductName}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />

        {/* Logo Overlay Layer */}
        {currentLogo && (
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              transform: `translate(${activeX}px, ${activeY}px) scale(${activeScale})`,
              cursor: isDragging ? 'grabbing' : 'grab',
              border: '1px dashed #fbbf24',
              padding: '4px',
              display: 'inline-block',
            }}
          >
            <img
              src={currentLogo}
              alt="Uploaded Logo"
              style={{
                width: '100px',
                height: 'auto',
                pointerEvents: 'none',
                display: 'block',
              }}
            />
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '12px', color: '#a1a1aa' }}>
        Product: <strong style={{ color: '#fff' }}>{activeProductName}</strong> ({selectedSide.toUpperCase()} View)
      </div>
    </div>
  );
}