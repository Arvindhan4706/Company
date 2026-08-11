import { CMSProvider } from '../context/CMSContext';
import I18nProvider from '../context/I18nProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroller from '../components/SmoothScroller';
import { ArrowRight } from 'lucide-react';
import '../index.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <SmoothScroller>
            <CMSProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              {/* Floating CTA */}
            </CMSProvider>
          </SmoothScroller>
        </I18nProvider>
      </body>
    </html>
  );
}
