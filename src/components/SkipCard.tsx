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
    <div 
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border-2 cursor-pointer flex flex-col h-full ${
        isSelected 
          ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-[1.02]' 
          : 'border-gray-100 hover:border-indigo-200 shadow-lg'
      }`}
      onClick={() => onSelect(skip)}
    >
      {/* Status indicators */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Badge variant="primary" className="text-xs px-2 py-1">
          {skip.size} Yards
        </Badge>
        {!skip.allowed_on_road && (
          <Badge variant="warning" className="text-xs px-2 py-1">
            Permit Required
          </Badge>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-indigo-500 text-white rounded-full p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
        <img 
          src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg"
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {skip.size} Yard Skip
            </h3>
            <p className="text-sm text-gray-500">
              {skip.hire_period_days} days hire period
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">
              £{finalPrice}
            </div>
            <div className="text-xs text-gray-400">inc. VAT</div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skip.allowed_on_road && (
            <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Road Legal
            </span>
          )}
          {skip.allows_heavy_waste && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Heavy Waste OK
            </span>
          )}
          {skip.transport_cost && (
            <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
              </svg>
              +Transport
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 mt-auto cursor-pointer ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
          }`}
        >
          {isSelected ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Selected
            </span>
          ) : (
            'Select This Skip'
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipCard; 