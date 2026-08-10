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
              <div className="fixed right-6 bottom-6 lg:hidden z-50">
                <a href="/contact" className="w-14 h-14 flex items-center justify-center bg-white text-primary font-heading tracking-widest uppercase text-xs rounded-full shadow-lg hover:bg-white/90 transition-all duration-500">
                  REQUEST<br/>QUOTE
                </a>
              </div>
              <div className="fixed right-6 bottom-6 lg:block z-50">
                <a href="/contact" className="px-6 py-3 bg-white text-primary font-heading tracking-widest uppercase text-sm rounded-full shadow-lg hover:bg-white/90 transition-all duration-500 flex items-center gap-3">
                  REQUEST A QUOTE
                  <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-500" />
                </a>
              </div>
            </CMSProvider>
          </SmoothScroller>
        </I18nProvider>
      </body>
    </html>
  );
}