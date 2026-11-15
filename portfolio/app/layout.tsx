import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { site } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { RevealObserver } from '@/components/RevealObserver';

// Fonts are downloaded at build time and served from this site, so there is no
// third-party request at runtime and no layout shift from late-loading fonts.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const title = `${site.name} · ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0e13' },
  ],
};

// Runs before first paint: marks JavaScript as available (so reveal animations
// can hide elements) and applies the visitor's saved theme without a flash.
const themeInit = `(function(){var r=document.documentElement;r.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){r.setAttribute('data-theme',t)}}catch(e){}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
