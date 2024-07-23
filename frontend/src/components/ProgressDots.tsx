// components/ProgressDots.js
import React from 'react';

const ProgressDots = ({ totalSteps, currentStep }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md">
        <div className="flex space-x-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDots;