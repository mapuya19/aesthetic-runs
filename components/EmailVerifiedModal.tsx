'use client';

import { Button } from './ui/button';

interface EmailVerifiedModalProps {
  isOpen: boolean;
  onGoToLogin: () => void;
}

export default function EmailVerifiedModal({ isOpen, onGoToLogin }: EmailVerifiedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Email Verified!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account has been successfully verified. You can now sign in.
          </p>
        </div>

        <Button onClick={onGoToLogin} className="w-full">
          Go to Sign In
        </Button>
      </div>
    </div>
  );
}
