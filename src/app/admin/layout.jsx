"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Industries', path: '/admin/industries' },
    { name: 'Testimonials', path: '/admin/testimonials' },
    { name: 'Clients', path: '/admin/clients' },
    { name: 'Inquiries', path: '/admin/inquiries' },
    { name: 'Media', path: '/admin/media' },
    { name: 'Certifications', path: '/admin/certifications' },
    { name: 'Settings', path: '/admin/settings' },
    { name: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="flex h-screen bg-primary pt-20 md:pt-[80px]">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-[80px] left-0 right-0 h-14 bg-primary-dark border-b border-white/5 z-40 flex items-center justify-between px-6">
        <span className="font-heading font-bold text-white tracking-widest uppercase text-sm">CMS Panel</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-white/70"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm top-[136px]" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-primary-dark border-r border-white/5 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0 top-[136px]' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block">
          <h2 className="text-xl font-heading font-bold text-white tracking-wider">CMS PANEL</h2>
        </div>
        <nav className="mt-2 md:mt-6 pb-20 md:pb-0">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-6 py-3 text-sm font-heading tracking-widest uppercase transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white border-r-4 border-white' 
                    : 'text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-primary text-white mt-14 md:mt-0 relative w-full">
        {children}
      </main>
    </div>
  );
}
