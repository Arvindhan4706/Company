import Link from 'next/link';
import { Shield, Home, LayoutDashboard, Wrench, Briefcase, Users, MessageSquare, Image as ImageIcon, Settings, Activity } from 'lucide-react';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminHeader from '@/components/admin/AdminHeader';
export const metadata = {
  title: 'Admin Dashboard | MECELFAB',
  robots: 'noindex, nofollow'
};

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Inquiries (CRM)', icon: MessageSquare },
  { href: '/admin/quotations', label: 'Quotations', icon: Shield },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/documents', label: 'Document Vault', icon: Shield },
  { href: '/admin/content', label: 'Global Content', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Shield },
  { href: '/admin/activity', label: 'Activity Log', icon: Activity },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  // If no session but we're in /admin/login, don't crash, just render without sidebar
  // But wait, middleware protects most routes.
  const role = session?.user?.role || 'VIEWER';
  let notifications = [];

  if (session?.user?.email) {
    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      notifications = await db.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 20
      });
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-primary flex flex-col font-sans">
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-primary text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black/60 border-r border-white/5 flex flex-col hidden md:flex backdrop-blur-md z-20">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-heading font-bold tracking-tight uppercase text-white">MECELFAB</h2>
          <p className="text-[10px] text-accent mt-1 uppercase tracking-widest font-heading">Admin Portal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {adminLinks.map(link => {
            const Icon = link.icon;
            
            // Hide Users, Settings, Content, and Activity for non-admins
            if ((link.label === 'Users' || link.label === 'Settings' || link.label === 'Activity Log' || link.label === 'Global Content') && (role !== 'SUPER_ADMIN' && role !== 'ADMIN')) {
              return null;
            }

            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-secondary hover:text-white font-light">
                <Icon size={18} className="text-white/40" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 bg-black/40">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-secondary hover:text-white font-light">
            <Home size={18} className="text-white/40" />
            Public Website
          </Link>
          <form action="/api/auth/signout" method="POST" className="mt-2">
            <button type="submit" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 transition-colors text-sm font-light">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-primary relative">
        {/* subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
        
        <AdminHeader session={session} initialNotifications={notifications} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
