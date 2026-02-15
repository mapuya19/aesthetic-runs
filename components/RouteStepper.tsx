'use client';

import { useState, useRef } from 'react';
import type { Step as StepType } from '@/types';
import { Button } from './ui/button';

interface RouteStepperProps {
  steps: StepType[];
  distance: number;
  onComplete?: () => void;
}

export default function RouteStepper({ steps, distance, onComplete }: RouteStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === steps.length - 1) {
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

  if (steps.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[var(--background)]">
        <div className="p-4 sm:p-6 border-b border-[var(--border-soft)] bg-[var(--background)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">Route Guide</h2>
          <p className="text-sm text-[var(--text-secondary)]">Total distance: {distance} miles</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-[var(--text-secondary)] mb-4">No steps available for this route yet.</p>
            <Button onClick={onComplete}>Finish Run</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--background)]">
      <div className="p-4 sm:p-6 border-b border-[var(--border-soft)] bg-[var(--background)] shadow-subtle flex-shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">Route Guide</h2>
        <p className="text-sm text-[var(--text-secondary)]">Total distance: {distance} miles</p>
      </div>

      <div
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 scroll-smooth"
      >
        <div className="space-y-2 pb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`relative ${index < activeStep ? 'opacity-40' : ''}`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-subtle transition-all duration-300 ${
                      index === activeStep
                        ? 'bg-[var(--brand)] text-white scale-110 shadow-card'
                        : index < activeStep
                          ? 'bg-[var(--success)] text-white'
                          : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                    }`}
                  >
                    {index < activeStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-10 w-0.5 h-14 -translate-x-1/2 bg-[var(--border-soft)]" />
                  )}
                </div>
                <div className="flex-1 pt-1 min-w-0">
                  <h3
                    className={`font-semibold transition-colors ${
                      index === activeStep ? 'text-[var(--brand)] text-lg sm:text-xl' : 'text-[var(--foreground)]'
                    }`}
                  >
                    {step.label}
                  </h3>
                  {step.description && (
                    <p className={`mt-1 ${index === activeStep ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}`}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeStep === steps.length && (
          <div className="bg-gradient-to-br from-[var(--purple-light)] via-[var(--brand)] to-[var(--accent)] rounded-2xl p-6 sm:p-8 text-center shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-elevated">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--success)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Route Complete!</h3>
            <p className="text-white/90 mb-2">You have completed entire route.</p>
            <p className="text-sm text-white/80">Total distance: {distance} miles</p>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 border-t border-[var(--border-soft)] bg-[var(--background)] flex justify-between gap-3 flex-shrink-0">
        {activeStep === steps.length ? (
          <div className="flex gap-3 w-full">
            <Button onClick={handleReset} variant="secondary" className="flex-1">
              Reset
            </Button>
            {onComplete && <Button onClick={onComplete} className="flex-1">Finish</Button>}
          </div>
        ) : (
          <div className="flex gap-3 w-full">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="secondary"
              className="flex-1"
            >
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
