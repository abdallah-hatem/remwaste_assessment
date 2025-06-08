import React, { useState } from "react";
import SkipCard, { type SkipData } from "./SkipCard";

interface SkipSelectionProps {
  skips: SkipData[];
  onSkipSelect?: (skip: SkipData) => void;
}

const SkipSelection: React.FC<SkipSelectionProps> = ({
  skips,
  onSkipSelect,
}) => {
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const handleSkipSelect = (skip: SkipData) => {
    setSelectedSkip(skip);
    onSkipSelect?.(skip);
    console.log("Selected skip:", skip);
  };

  // Filter out skips that are forbidden or have invalid data
  const validSkips = skips.filter((skip) => !skip.forbidden && skip.size > 0);
  
  // Sort skips by size for better display
  const sortedSkips = validSkips.sort((a, b) => a.size - b.size);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your 
              <span className="text-indigo-600"> Skip Size</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find the perfect skip for your project. All skips come with a 14-day hire period and professional delivery service.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free delivery & collection</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>14-day hire period</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>All prices include VAT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Selection Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {sortedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              onSelect={handleSkipSelect}
              isSelected={selectedSkip?.id === skip.id}
            />
          ))}
        </div>
      </div>

             {/* Selected Skip Summary - Fixed at bottom */}
       {selectedSkip && (
         <div className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 z-50">
           <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
             <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4">
               <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                   <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                     {selectedSkip.size} Yard Skip Selected
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-500">
                     £{Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100))} for {selectedSkip.hire_period_days} days
                   </p>
                 </div>
               </div>
               
               <button
                 onClick={() => setSelectedSkip(null)}
                 className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 cursor-pointer flex-shrink-0"
               >
                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                 </svg>
               </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm">
               <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                 <div className="text-gray-500 mb-1">Size</div>
                 <div className="font-semibold text-gray-900">{selectedSkip.size} Yards</div>
               </div>
               <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                 <div className="text-gray-500 mb-1">Duration</div>
                 <div className="font-semibold text-gray-900">{selectedSkip.hire_period_days} Days</div>
               </div>
               <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                 <div className="text-gray-500 mb-1">Road Legal</div>
                 <div className={`font-semibold ${selectedSkip.allowed_on_road ? 'text-green-600' : 'text-amber-600'}`}>
                   {selectedSkip.allowed_on_road ? 'Yes' : 'Permit Required'}
                 </div>
               </div>
               <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                 <div className="text-gray-500 mb-1">Heavy Waste</div>
                 <div className={`font-semibold ${selectedSkip.allows_heavy_waste ? 'text-green-600' : 'text-gray-400'}`}>
                   {selectedSkip.allows_heavy_waste ? 'Allowed' : 'Not Allowed'}
                 </div>
               </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
               <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer">
                 Continue to Booking
               </button>
               <button 
                 onClick={() => setSelectedSkip(null)}
                 className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base cursor-pointer"
               >
                 Change Selection
               </button>
             </div>
           </div>
         </div>
       )}

             {/* Add bottom padding when selection is active */}
       {selectedSkip && <div className="h-32 sm:h-36 md:h-44 lg:h-48"></div>}
    </div>
  );
};

export default SkipSelection;
