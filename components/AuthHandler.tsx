'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/auth';
import EmailVerifiedModal from './EmailVerifiedModal';

export default function AuthHandler() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);

  useEffect(() => {
    const subscription = auth.onAuthStateChange(async (session) => {
      console.log('Auth state changed:', session);

      if (session) {
        setAuth(
          { id: session.user?.id || '', email: session.user?.email || '' },
          session,
        );

        const urlHash = window.location.hash;
        if (urlHash.includes('type=signup') && urlHash.includes('access_token')) {
          console.log('Email verified via signup link');
          setShowVerifiedModal(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else {
        setAuth(null, null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuth]);

  const handleClose = () => {
    setShowVerifiedModal(false);
  };

  const handleGoToLogin = () => {
    handleClose();
    router.push('/login');
  };

  return <EmailVerifiedModal isOpen={showVerifiedModal} onGoToLogin={handleGoToLogin} onClose={handleClose} />;
}
