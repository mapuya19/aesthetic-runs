'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { Step as StepType } from '@/types';
import { Button } from './ui/button';

function Confetti() {
  const particles = useMemo(() => {
    const colors = ['#818cf8', '#f472b6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
    const random = (n: number) => {
      const x = Math.sin(42 + n) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${random(i) * 100}%`,
      delay: `${random(i + 100) * 0.5}s`,
      duration: `${2 + random(i + 200) * 2}s`,
      color: colors[Math.floor(random(i + 300) * colors.length)],
      size: `${6 + random(i + 400) * 8}px`
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.id % 2 === 0 ? '50%' : '0'
          }}
        />
      ))}
    </div>
  );
}

interface RouteStepperProps {
  steps: StepType[];
  distance: number;
  routeName?: string;
  onComplete?: () => void;
}

export default function RouteStepper({ steps, distance, routeName, onComplete }: RouteStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startYRef = useRef(0);

  useEffect(() => {
    if (activeStep === steps.length) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeStep, steps.length]);

  useEffect(() => {
    const activeRef = stepRefs.current[activeStep];
    if (activeRef) {
      activeRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeStep]);

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

  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    startYRef.current = clientY;
  }, []);

  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging || !sheetRef.current) return;

    const deltaY = clientY - startYRef.current;
    const sheetHeight = sheetRef.current.offsetHeight || 0;

    const maxDrag = Math.min(sheetHeight * 0.8, 400);
    const clampedY = Math.max(-maxDrag, Math.min(maxDrag, deltaY));

    setSheetY(clampedY);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = 100;
    const shouldCollapse = isExpanded && sheetY > threshold;
    const shouldExpand = !isExpanded && sheetY < -threshold;

    if (shouldCollapse) {
      setIsExpanded(false);
    } else if (shouldExpand) {
      setIsExpanded(true);
    }

    setSheetY(0);
  }, [isExpanded, sheetY]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  useEffect(() => {
    const handle = dragHandleRef.current;
    if (!handle) return;

    let hasMoved = false;
    let dragThresholdPassed = false;

    const handleStart = (e: TouchEvent | MouseEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      hasMoved = false;
      dragThresholdPassed = false;
      handleDragStart(clientY);
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (!dragThresholdPassed && Math.abs(clientY - startYRef.current) > 5) {
        dragThresholdPassed = true;
        hasMoved = true;
      }
      handleDragMove(clientY);
    };

    const handleEnd = () => {
      if (!hasMoved) {
        toggleExpanded();
      } else {
        handleDragEnd();
      }
      dragThresholdPassed = false;
    };

    handle.addEventListener('touchstart', handleStart, { passive: true });
    handle.addEventListener('touchmove', handleMove, { passive: true });
    handle.addEventListener('touchend', handleEnd);
    handle.addEventListener('touchcancel', handleEnd);
    handle.addEventListener('mousedown', handleStart);
    handle.addEventListener('mouseup', handleEnd);
    handle.addEventListener('mouseleave', handleEnd);

    return () => {
      handle.removeEventListener('touchstart', handleStart);
      handle.removeEventListener('touchmove', handleMove);
      handle.removeEventListener('touchend', handleEnd);
      handle.removeEventListener('touchcancel', handleEnd);
      handle.removeEventListener('mousedown', handleStart);
      handle.removeEventListener('mouseup', handleEnd);
      handle.removeEventListener('mouseleave', handleEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd, toggleExpanded]);

  useEffect(() => {
    if (!sheetRef.current) return;

    if (isDragging) {
      sheetRef.current.style.transform = `translateY(${sheetY}px)`;
      sheetRef.current.style.transition = 'none';
    } else if (sheetY === 0) {
      sheetRef.current.style.transform = '';
      sheetRef.current.style.transition = '';
    }
  }, [sheetY, isDragging]);

  if (steps.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[var(--background)]">
        <div className="lg:hidden flex-shrink-0 flex justify-center py-3 cursor-grab active:cursor-grabbing select-none">
          <div className="w-12 h-1.5 bg-[var(--border-soft)] rounded-full transition-transform active:scale-95" />
        </div>
        <div className="p-4 sm:p-6 border-b border-[var(--border-soft)] bg-[var(--background)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">Route Guide</h2>
          <p className="text-sm text-[var(--text-secondary)]">Total distance: {distance} miles</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-[var(--text-secondary)] mb-4">No steps available for this route yet.</p>
            <Button onClick={onComplete} className="transition-transform active:scale-[0.98]">Finish Run</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--background)]">
      <div
        className={`lg:hidden flex-shrink-0 flex flex-col items-center gap-2 py-4 px-2 select-none z-20 bg-[var(--background)] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        ref={dragHandleRef}
        style={{ touchAction: 'pan-y', WebkitUserSelect: 'none', userSelect: 'none' }}
      >
        <div className={`w-12 h-1.5 bg-[var(--border-soft)] rounded-full transition-transform ${isDragging ? 'scale-125' : ''}`} />
        <div className={`text-xs text-[var(--text-muted)] font-medium transition-all ${isExpanded ? 'opacity-100' : 'opacity-50'}`}>
          {isExpanded ? 'Drag down to minimize' : 'Drag up to expand'}
        </div>
      </div>
      <div ref={sheetRef} className={`flex-1 flex flex-col overflow-hidden will-change-transform ${isDragging ? 'shadow-2xl' : ''}`} style={{ transition: isDragging ? 'none' : 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
        <div className={`p-4 sm:p-6 border-b border-[var(--border-soft)] bg-[var(--background)] shadow-subtle flex-shrink-0 ${!isExpanded && 'lg:block hidden'}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">Route Guide</h2>
          <p className="text-sm text-[var(--text-secondary)]">Total distance: {distance} miles</p>
        </div>

        {!isExpanded && (
          <>
            <div className="lg:hidden flex-shrink-0 px-4 pt-2 pb-4 bg-[var(--background)]">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="font-bold text-[var(--foreground)] text-lg">{routeName}</h2>
                  <p className="text-sm text-[var(--text-muted)]">{distance} miles</p>
                </div>
              </div>
            </div>

            {steps.length > 0 && activeStep < steps.length && (
              <div className="lg:hidden flex-shrink-0 px-4 pb-4 bg-[var(--surface-1)]">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-bold text-lg shadow-elevated transition-transform">
                    {activeStep + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)] text-lg truncate transition-all">{steps[activeStep].label}</h3>
                    {steps[activeStep].description && (
                      <p className="text-sm text-[var(--text-secondary)] truncate">{steps[activeStep].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className={`flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 scroll-smooth ${!isExpanded && 'lg:block hidden'}`}>
          <div className="space-y-2 pb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el; }}
                className={`relative transition-all duration-500 ease-out ${
                  index < activeStep ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-subtle transition-all duration-500 ease-out ${
                        index === activeStep
                          ? 'bg-[var(--brand)] text-white scale-110 shadow-card'
                          : index < activeStep
                            ? 'bg-[var(--success)] text-white'
                            : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                      }`}
                    >
                      {index < activeStep ? (
                        <svg className="w-5 h-5 transition-transform duration-300 scale-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`absolute left-1/2 top-10 w-0.5 h-14 -translate-x-1/2 bg-[var(--border-soft)] transition-opacity duration-500 ${
                        index < activeStep ? 'opacity-40' : 'opacity-100'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pt-1 min-w-0">
                    <h3
                      className={`font-semibold transition-all duration-500 ${
                        index === activeStep ? 'text-[var(--brand)] text-lg sm:text-xl translate-x-0' : 'text-[var(--foreground)]'
                      }`}
                    >
                      {step.label}
                    </h3>
                    {step.description && (
                      <p className={`mt-1 transition-opacity duration-500 ${
                        index === activeStep ? 'text-[var(--text-secondary)] opacity-100' : 'text-[var(--text-tertiary)] opacity-100'
                      }`}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 sm:p-6 border-t border-[var(--border-soft)] bg-[var(--background)] flex justify-between gap-3 flex-shrink-0 ${!isExpanded && 'lg:block hidden'}`}>
          {activeStep !== steps.length && (
            <div className="flex gap-3 w-full">
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="secondary"
                className="flex-1 transition-transform active:scale-[0.98]"
              >
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 transition-transform active:scale-[0.98]">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          )}
        </div>

        {!isExpanded && activeStep !== steps.length && (
          <div className="lg:hidden p-3 border-t border-[var(--border-soft)] bg-[var(--background)] flex justify-between gap-3 flex-shrink-0">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="secondary"
              className="flex-1 transition-transform active:scale-[0.98]"
              size="sm"
            >
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1 transition-transform active:scale-[0.98]" size="sm">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>

      {activeStep === steps.length && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[var(--foreground)]/60 backdrop-blur-md backdrop-in" />
          <Confetti />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-br from-[var(--purple-light)] via-[var(--brand)] to-[var(--accent)] p-8 sm:p-10 text-center shadow-2xl modal-slide-up overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 shimmer" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl bounce-in pulse-glow">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--success)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 slide-up-1">Route Complete!</h3>
            <p className="text-white/90 mb-1 slide-up-2">
              You have completed the entire route.
            </p>
            <p className="text-base sm:text-lg text-white/80 font-semibold mb-8 slide-up-3">
              Total distance: {distance} miles
            </p>

            <div className="flex gap-3 slide-up-4">
              <Button onClick={handleReset} variant="secondary" className="flex-1">
                Reset
              </Button>
              {onComplete && (
                <Button onClick={onComplete} className="flex-1">
                  Return
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
