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
    <div
      className={`min-h-screen bg-gray-900 py-12 px-4 ${
        selectedSkip ? "pb-48" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              onSelect={handleSkipSelect}
              isSelected={selectedSkip?.id === skip.id}
            />
          ))}
        </div>

        {/* Selected Skip Info - Fixed at bottom */}
        {selectedSkip && (
          <div className="fixed bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 bg-gray-800 border border-gray-700 p-4 md:p-6 z-50 shadow-2xl rounded-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Selected: {selectedSkip.size} Yard Skip
                </h3>
                <button
                  onClick={() => setSelectedSkip(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-sm mb-4">
                <div className="flex justify-between sm:block">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white sm:ml-2">
                    {selectedSkip.size} Yards
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="text-gray-400">Hire Period:</span>
                  <span className="text-white sm:ml-2">
                    {selectedSkip.hire_period_days} days
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="text-gray-400">Price (inc. VAT):</span>
                  <span className="text-white sm:ml-2">
                    £
                    {Math.round(
                      selectedSkip.price_before_vat *
                        (1 + selectedSkip.vat / 100)
                    )}
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="text-gray-400">Road Legal:</span>
                  <span
                    className={`sm:ml-2 ${
                      selectedSkip.allowed_on_road
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedSkip.allowed_on_road ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 md:px-6 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer">
                  Continue with this Skip
                </button>
                <button
                  onClick={() => setSelectedSkip(null)}
                  className="px-4 md:px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipSelection;
