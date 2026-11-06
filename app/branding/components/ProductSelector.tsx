'use client';

import React from 'react';

export interface ProductView {
  front: string;
  back: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Outerwear' | 'Workwear & Safety' | 'Headwear' | 'Accessories';
  basePrice: number;
  hasGenderFit: boolean;
  isReflective?: boolean;
  views: {
    male?: ProductView;
    female?: ProductView;
    unisex?: ProductView;
  };
}

interface ProductSelectorProps {
  products: Product[];
  categories: readonly string[];
  selectedCategory: string;
  selectedProduct: string;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  categories,
  selectedCategory,
  selectedProduct,
  onSelectCategory,
  onSelectProduct,
}) => {
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Product Category</label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 'bold',
                border: selectedCategory === cat ? '1px solid #d97706' : '1px solid #27272a',
                backgroundColor: selectedCategory === cat ? '#d97706' : '#18181b',
                color: selectedCategory === cat ? '#000000' : '#a1a1aa',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Select Item</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
          {filteredProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProduct(p.id)}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: selectedProduct === p.id ? '1px solid #d97706' : '1px solid #27272a',
                backgroundColor: selectedProduct === p.id ? '#1e1b18' : '#18181b',
                color: selectedProduct === p.id ? '#fbbf24' : '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>{p.name}</span>
              <span style={{ fontSize: '10px', opacity: 0.7 }}>${p.basePrice.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
