import { CMSProvider } from '../context/CMSContext';
import I18nProvider from '../context/I18nProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SplashIntro from '../components/SplashIntro';
import SmoothScroller from '../components/SmoothScroller';
import { ArrowRight } from 'lucide-react';
import '../index.css';

export const metadata = {
  title: 'Sterling Industrial Solutions',
  description: 'Engineering reliable solutions for industrial growth.',
  openGraph: {
    title: 'Sterling Industrial Solutions',
    description: 'Engineering reliable solutions for industrial growth.',
    url: 'https://sterlingindustrial.com',
    siteName: 'Sterling Industrial Solutions',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Sterling Industrial Solutions',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sterling Industrial Solutions',
    description: 'Engineering reliable solutions for industrial growth.',
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
              <SplashIntro />
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