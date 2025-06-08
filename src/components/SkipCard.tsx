import React from 'react';
import Badge from './Badge';

export interface SkipData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

interface SkipCardProps {
  skip: SkipData;
  onSelect: (skip: SkipData) => void;
  isSelected?: boolean;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, onSelect, isSelected = false }) => {
  const finalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-200 group ${
      isSelected 
        ? 'bg-blue-900 border-2 border-blue-500 shadow-xl shadow-blue-500/20 scale-105' 
        : 'bg-gray-800 border-2 border-transparent hover:bg-gray-750'
    }`}>
      {/* Skip Image Container */}
      <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 h-48 flex items-center justify-center">
        {/* Size Badge */}
        <Badge variant="primary" className="absolute top-4 right-4">
          {skip.size} Yards
        </Badge>
        
        {/* Skip Image */}
        <img 
          src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg"
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-cover"
        />

        {/* Warning Badge for not allowed on road */}
        {!skip.allowed_on_road && (
          <Badge variant="warning" className="absolute bottom-4 left-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Not Allowed On The Road
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {skip.size} Yard Skip
        </h3>
        
        <p className="text-gray-400 mb-4">
          {skip.hire_period_days} day hire period
        </p>

        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-blue-500">
            £{finalPrice}
          </div>
          {skip.vat > 0 && (
            <div className="text-sm text-gray-400">
              +{skip.vat}% VAT
            </div>
          )}
        </div>

        <button
          onClick={() => onSelect(skip)}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            isSelected
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white group-hover:bg-gray-600'
          }`}
        >
          {isSelected ? (
            <>
              Selected
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          ) : (
            <>
              Select This Skip
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        {/* Additional Info */}
        {(skip.transport_cost || skip.allows_heavy_waste) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 text-xs">
              {skip.allows_heavy_waste && (
                <Badge variant="success">Heavy Waste Allowed</Badge>
              )}
              {skip.transport_cost && (
                <Badge variant="info">Transport: £{skip.transport_cost}</Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipCard; 