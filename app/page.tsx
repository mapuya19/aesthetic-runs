'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const options = { threshold: 0.1 };

    const featuresObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFeaturesVisible(true);
        featuresObserver.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

    const ctaObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCtaVisible(true);
        ctaObserver.unobserve(entry.target);
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    const footerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFooterVisible(true);
        footerObserver.unobserve(entry.target);
      }
    }, options);

    const featuresEl = featuresRef.current;
    const ctaEl = ctaRef.current;
    const footerEl = footerRef.current;

    if (featuresEl) featuresObserver.observe(featuresEl);
    if (ctaEl) ctaObserver.observe(ctaEl);
    if (footerEl) footerObserver.observe(footerEl);

    return () => {
      if (featuresEl) featuresObserver.unobserve(featuresEl);
      if (ctaEl) ctaObserver.unobserve(ctaEl);
      if (footerEl) footerObserver.unobserve(footerEl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <nav className="border-b border-[var(--border-soft)] bg-[var(--background)]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 animate-section-fade-up visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-[var(--brand)]">Aesthetic Runs</div>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          <Image
            src="https://wallpaperaccess.com/full/123346.jpg"
            alt="Aesthetic running route"
            fill
            priority
            quality={80}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)]/92 via-[var(--background)]/75 to-[var(--background)]/85" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)]/3 via-transparent to-[var(--accent-light)]/3 animate-gradient-x" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--brand)]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--purple)]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center relative stagger-children visible">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
            Discover routes that {' '}
            <span className="text-[var(--brand)]">
              inspire
            </span> your run
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 sm:mb-12">
            Explore world&apos;s most beautiful running routes. From scenic parks to urban gems, every run is an adventure waiting to happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="text-lg px-6 sm:px-8 py-6 shadow-elevated hover:shadow-xl hover:scale-102 transition-all duration-300 ease-out">
                Start Exploring
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="text-lg px-6 sm:px-8 py-6 hover:scale-102 transition-all duration-300 ease-out">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-16 sm:py-24 bg-[var(--surface-1)]">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 stagger-children ${featuresVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Run in style
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              Find routes that match your vibe, not just your distance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-elevated transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--purple)] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-subtle group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300 ease-out">
                Beautiful Routes
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Curated routes through parks, waterfronts, and hidden urban gems. Every path tells a story.
              </p>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-elevated transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--purple)] to-[var(--accent)] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-subtle group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300 ease-out">
                Step-by-Step Guide
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Clear turn-by-turn directions with waypoints. Never get lost on your run again.
              </p>
            </div>

            <div className="bg-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-elevated transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--accent)] to-[var(--success)] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-subtle group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300 ease-out">
                Track Progress
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                Celebrate your achievements. Track completed routes and build your running journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-20 sm:py-32 bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface-1)]">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 text-center stagger-children ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Ready to explore?
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join thousands of runners discovering beautiful routes in cities around the world.
          </p>
          <Link href="/register" className="inline-block">
            <Button size="lg" className="text-lg px-8 sm:px-12 py-6 shadow-elevated hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <footer ref={footerRef} className={`border-t border-[var(--border-soft)] bg-[var(--background)] py-8 sm:py-12 animate-section-fade-up ${footerVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-[var(--text-muted)]">
          <p className="text-sm sm:text-base">&copy; 2025 Aesthetic Runs. Run in style.</p>
        </div>
      </footer>
    </div>
  );
}
