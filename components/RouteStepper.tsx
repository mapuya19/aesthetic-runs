'use client';

import React, { useState } from 'react';
import type { Step as StepType } from '@/types';
import { Button } from './ui/button';

interface RouteStepperProps {
  steps: StepType[];
  distance: number;
  onComplete?: () => void;
}

export default function RouteStepper({ steps, distance, onComplete }: RouteStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (steps.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-zinc-200 bg-white">
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Route Guide</h2>
          <p className="text-sm text-zinc-600">Total distance: {distance} miles</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-zinc-600 mb-4">No steps available for this route yet.</p>
            <Button onClick={onComplete}>Finish Run</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === steps.length - 1) {
      // On last step, clicking "Finish" completes the route
      setActiveStep(steps.length);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-zinc-200 bg-white">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Route Guide</h2>
        <p className="text-sm text-zinc-600">Total distance: {distance} miles</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {steps.map((step, index) => (
          <div key={index} className={`mb-6 relative ${index < activeStep ? 'opacity-50' : ''}`}>
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index === activeStep
                    ? 'bg-blue-600 text-white'
                    : index < activeStep
                      ? 'bg-green-500 text-white'
                      : 'bg-zinc-200 text-zinc-900'
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-4 flex-1">
                <h3
                  className={`font-semibold ${index === activeStep ? 'text-blue-600' : 'text-zinc-900'}`}
                >
                  {step.label}
                </h3>
                {step.description && (
                  <p className="mt-1 text-sm text-zinc-600">{step.description}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-1/2 w-0.5 h-14 bg-zinc-200" />
            )}
          </div>
        ))}

        {activeStep === steps.length && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Route Complete!</h3>
            <p className="text-zinc-600 mb-4">You have completed the entire route.</p>
            <p className="text-sm text-zinc-600">Total distance: {distance} miles</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-zinc-200 bg-white flex justify-between">
        {activeStep === steps.length ? (
          <div className="flex gap-2 w-full">
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
            {onComplete && <Button onClick={onComplete}>Finish</Button>}
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <Button onClick={handleBack} disabled={activeStep === 0} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
