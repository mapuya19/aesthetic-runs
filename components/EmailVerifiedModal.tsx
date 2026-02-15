'use client';

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface EmailVerifiedModalProps {
  isOpen: boolean;
  onGoToLogin: () => void;
  onClose?: () => void;
}

export default function EmailVerifiedModal({ isOpen, onGoToLogin, onClose }: EmailVerifiedModalProps) {
  const autoDismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (onClose || onGoToLogin)) {
        (onClose || onGoToLogin)();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      autoDismissTimerRef.current = setTimeout(() => {
        (onClose || onGoToLogin)();
      }, 5000);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, [isOpen, onClose, onGoToLogin]);

  if (!isOpen) return null;

  const handleClose = onClose || onGoToLogin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[var(--foreground)]/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[var(--background)] p-8 shadow-modal animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
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
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--purple-light)] via-[var(--brand)] to-[var(--accent)] shadow-elevated">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-[var(--foreground)]">Email Verified!</h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Your account has been successfully verified. You can now sign in.
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Closing automatically in 5 seconds...
          </p>
        </div>

        <Button onClick={onGoToLogin} className="mt-8 w-full text-base py-3">
          Go to Sign In
        </Button>
      </div>
    </div>
  );
}
