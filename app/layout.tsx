import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';
import AuthHandler from '@/components/AuthHandler';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Aesthetic Runs - Discover Beautiful Running Routes',
    template: '%s | Aesthetic Runs',
  },
  description: 'Explore the world\'s most beautiful running routes. From scenic parks to urban gems, find routes that inspire your run with step-by-step navigation.',
  keywords: ['running routes', 'running maps', 'jogging', 'fitness', 'outdoor running', 'city running', 'scenic runs'],
  authors: [{ name: 'Aesthetic Runs' }],
  creator: 'Aesthetic Runs',
  publisher: 'Aesthetic Runs',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aestheticruns.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Aesthetic Runs - Discover Beautiful Running Routes',
    description: 'Explore the world\'s most beautiful running routes. Find scenic paths, urban gems, and step-by-step navigation for your next run.',
    siteName: 'Aesthetic Runs',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Aesthetic Runs - Beautiful running routes with step-by-step navigation',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aesthetic Runs - Discover Beautiful Running Routes',
    description: 'Explore the world\'s most beautiful running routes with step-by-step navigation.',
    images: ['/og-image.svg'],
    creator: '@aestheticruns',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthHandler />
        <div className="page-enter">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
