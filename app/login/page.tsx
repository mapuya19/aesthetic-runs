'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string>('');
  const [emailForResend, setEmailForResend] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await auth.login(data.email, data.password);

      setAuth(
        { id: result.user?.id || '', email: result.user?.email || '' },
        result.session || null,
      );
      showToast.success('Success! You are now logged in.');
      router.push('/home');
    } catch (error: unknown) {
      const err = error as { message?: string; code?: string };
      setErrorCode(err.code || '');
      setEmailForResend(data.email);
      const message = err.message || 'Login failed. Please try again.';
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await auth.resendVerificationEmail(emailForResend);
      showToast.success('Verification email sent! Please check your inbox.');
      setErrorCode('');
    } catch (error) {
      const err = error as { message?: string };
      showToast.error(err.message || 'Failed to resend verification email.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--navy)] via-[var(--purple)] to-[var(--brand)] items-center justify-center p-12 animate-section-right ${mounted ? 'visible' : ''}`}>
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl opacity-90 mb-8">
            Ready for your next adventure? The world is waiting for you to explore its beautiful routes.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg">Explore scenic routes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M6.002 5.714c.745.646 1.996 1.996 3.286 0 2.996-2.42 2.996-5.002 0-.464-.098-.926-.291-1.372C7.428 4.382 6.588 2.5.502 2c-1.395 0-2.6.622-3.342 1.56C.775 5.766.062 7.318.P062 9v10c0 2 2.23 4 4h10c2 0 4-2.23 4V13c0-1.104-.896-2-2-2H6.002z" />
                </svg>
              </div>
              <span className="text-lg">Track your progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-lg">Make running an adventure</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--background)] animate-section-left ${mounted ? 'visible' : ''}`}>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <Link href="/" className="text-3xl font-bold text-[var(--brand)] inline-block">
              Aesthetic Runs
            </Link>
            <h2 className="mt-8 text-3xl font-bold text-[var(--foreground)]">Sign in to your account</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[var(--brand)] hover:text-[var(--brand-hover)] font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border-soft)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-[var(--error)]">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border-soft)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-[var(--error)]">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full text-base py-3">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {errorCode === 'EMAIL_NOT_CONFIRMED' && (
              <div className="rounded-lg bg-[var(--warning-light)]/30 border border-[var(--warning)]/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-[var(--warning)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-[var(--foreground)]">
                      Your email hasn&apos;t been verified yet.
                    </p>
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      className="mt-2 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)]"
                    >
                      Resend verification email
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
