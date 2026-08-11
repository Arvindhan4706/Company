"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
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
    <div className="flex h-screen bg-primary" style={{ paddingTop: '80px' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark border-r border-white/5 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-heading font-bold text-white tracking-wider">CMS PANEL</h2>
        </div>
        <nav className="mt-6">
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
      <main className="flex-1 overflow-y-auto bg-primary text-white">
        {children}
      </main>
    </div>
  );
}
