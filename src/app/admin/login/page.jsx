"use client";

import { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { login } from '@/app/actions/auth';

export default function LoginAdminPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    const res = await login(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      {/* Background styling */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/5 rounded-full mb-4 border border-white/10">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-heading font-light tracking-widest uppercase mb-2">MECELFAB</h1>
          <p className="text-secondary text-sm font-light">Admin Control Panel</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="email"
                name="email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@mecelfab.com"
                defaultValue="admin@mecelfab.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="password"
                name="password"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
                defaultValue="admin"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-heading tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-accent hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-secondary font-light">
            Authorized personnel only. All access attempts are logged.
          </p>
        </div>
      </div>
    </div>
  );
}
