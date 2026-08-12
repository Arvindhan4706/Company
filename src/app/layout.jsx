import { CMSProvider } from '../context/CMSContext';
import I18nProvider from '../context/I18nProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroller from '../components/SmoothScroller';
import { ArrowRight } from 'lucide-react';
import '../index.css';
import { db } from '@/lib/db';

export const metadata = {
  title: 'MECELFAB INDUSTRIAL SOLUTIONS PRIVATE LIMITED',
  description: 'Premier industrial mechanical services, fabrication, generator solutions, rentals, and hydraulic/pneumatic system overhauling in India.',
  metadataBase: new URL('https://mecelfab.com'),
  openGraph: {
    title: 'MECELFAB INDUSTRIAL SOLUTIONS',
    description: 'Premier industrial mechanical services, fabrication, generator solutions, rentals, and hydraulic/pneumatic system overhauling in India.',
    url: 'https://mecelfab.com',
    siteName: 'MECELFAB',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'MECELFAB Industrial Solutions',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MECELFAB INDUSTRIAL SOLUTIONS',
    description: 'Premier industrial mechanical services, fabrication, generator solutions, rentals, and hydraulic/pneumatic system overhauling.',
    images: ['/images/hero-bg.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }) {
  const settings = await db.setting.findMany({
    where: { key: 'CONTENT_CONTACT' }
  });
  
  const contactContent = settings.length > 0 && settings[0].value 
    ? JSON.parse(settings[0].value) 
    : null;

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>
          <SmoothScroller>
            <CMSProvider>
              <Navbar contact={contactContent} />
              <main className="flex-grow">{children}</main>
              <Footer contact={contactContent} />
              {/* Floating CTA */}
            </CMSProvider>
          </SmoothScroller>
        </I18nProvider>
      </body>
    </html>
  );
}
