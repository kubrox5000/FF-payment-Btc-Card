import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { AgentationGuard } from '@/components/AgentationGuard';
import { HappySeedsWatermark } from '@/components/HappySeedsWatermark';
import { FacebookPixel } from '@/components/site/FacebookPixel';
import { AdPixels } from '@/components/site/AdPixels';
import { GeoLocaleProvider } from '@/components/geo/GeoLocaleProvider';
import { PageProgress } from '@/components/site/PageProgress';
import { resolveServerLocale } from '@/lib/locale-server';
import { dirOf } from '@/lib/currencies';
import { getSettings } from '@/lib/settings';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import jsonMetadata from '../metadata.json';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  ...jsonMetadata,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://diamondboost.gg'),
  applicationName: 'FF-Diamond',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  openGraph: {
    title: 'FF-Diamond X1 — Premium Electric Scooter',
    description: 'FF-Diamond X1 Electric Scooter. Power Meets Freedom.',
    type: 'website',
    siteName: 'FF-Diamond',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FF-Diamond X1 — Premium Electric Scooter',
    description: 'FF-Diamond X1 Electric Scooter. Power Meets Freedom.',
    images: ['/icon.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [initialLocale, settings] = await Promise.all([
    resolveServerLocale(),
    getSettings(),
  ]);
  const brandScript = `window.__FF_BRAND__=${JSON.stringify({ siteName: settings.siteName ?? '', logo: settings.logo ?? '' })};`
  return (
    <html lang={initialLocale.lang} dir={dirOf(initialLocale.lang)} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.tiktok.com" />
        <link rel="dns-prefetch" href="https://sc-static.net" />
        <script dangerouslySetInnerHTML={{ __html: brandScript }} />
        {process.env.NODE_ENV === 'production' && (
          <Script
            strategy="lazyOnload"
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageProgress />
        <GeoLocaleProvider initialLocale={initialLocale}>{children}</GeoLocaleProvider>
        <Toaster position="top-center" richColors closeButton />
        <FacebookPixel />
        <AdPixels />
        <HappySeedsWatermark />
        <AgentationGuard />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}