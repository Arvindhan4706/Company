import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Admin Dashboard | MECELFAB',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // If no session (login page), render without chrome
  if (!session) {
    return <>{children}</>;
  }

  // Fetch notifications for the header
  let notifications = [];
  try {
    notifications = await db.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  } catch {
    // Notification table may not exist yet; fail gracefully
  }

  return (
    <div className="flex h-screen bg-admin-bg text-admin-text font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar user={session.user} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          session={session}
          initialNotifications={notifications}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
