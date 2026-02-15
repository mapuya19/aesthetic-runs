'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await auth.register(data.email, data.password);
      setRegisteredEmail(data.email);
      showToast.success('Please check your email to verify your account.');
    } catch (error: unknown) {
      const err = error as { message?: string; code?: string };
      const message =
        err.code === 'EMAIL_NOT_CONFIRMED'
          ? 'Please check your email for a confirmation link to activate your account.'
          : err.code === 'USER_EXISTS'
            ? 'An account with this email already exists. Please log in instead.'
            : err.message || 'Registration failed. Please try again.';

      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--purple)] via-[var(--brand)] to-[var(--navy)] items-center justify-center p-12 animate-section-right ${mounted ? 'visible' : ''}`}>
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold mb-6">Start Your Journey</h1>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of runners discovering beautiful routes around the world. Every run is an adventure.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg">Free to use</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M6.002 5.714c.745.646 1.996 1.996 3.286 0 2.996-2.42 2.996-5.002 0-.464-.098-.926-.291-1.372C7.428 4.382 6.588 2.5.502 2c-1.395 0-2.6.622-3.342 1.56C.775 5.766.062 7.318.062 9v10c0 2 2.23 4 4h10c2 0 4-2.23 4V13c0-1.104-.896-2-2-2H6.002z" />
                </svg>
              </div>
              <span className="text-lg">Secure authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-lg">Beautiful curated routes</span>
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
            <h2 className="mt-8 text-3xl font-bold text-[var(--foreground)]">Create your account</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link href="/login" className="text-[var(--brand)] hover:text-[var(--brand-hover)] font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {registeredEmail ? (
            <div className="text-center space-y-6 py-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--success-light)] to-[var(--success)] shadow-elevated">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 1 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)]">Check your email</h2>
                <p className="mt-4 text-[var(--text-secondary)]">
                  We sent a verification link to{' '}
                  <span className="font-medium text-[var(--foreground)]">{registeredEmail}</span>
                </p>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Click link in that email to activate your account before signing in.
                </p>
              </div>
              <Button onClick={() => router.push('/login')} className="w-full text-base py-3">
                Go to sign in
              </Button>
            </div>
          ) : (
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
                {errors.email && (
                  <p className="mt-2 text-sm text-[var(--error)]">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border-soft)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all"
                  placeholder="•••••••••••"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-[var(--error)]">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full text-base py-3">
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
