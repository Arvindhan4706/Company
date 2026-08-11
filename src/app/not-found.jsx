import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-heading font-light text-white mb-4 tracking-widest uppercase">
          404 - Not Found
        </h1>
        <p className="text-secondary text-sm font-light mb-8">
          The page you are looking for could not be found or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block w-full bg-white text-black font-heading tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-accent hover:text-white transition-colors duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
