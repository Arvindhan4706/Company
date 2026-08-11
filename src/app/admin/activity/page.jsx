import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Activity as ActivityIcon } from 'lucide-react';

export const metadata = {
  title: 'Activity Log | Admin',
};

export default async function AdminActivityPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
    redirect('/admin/dashboard');
  }

  const logs = await db.activityLog.findMany({
    take: 100, // Limit to recent 100
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-12 h-12 bg-accent/10 text-accent border border-accent/20 rounded-lg flex items-center justify-center">
          <ActivityIcon size={24} />
        </div>
        <div>
          <h1 className="text-xl font-heading font-light text-white uppercase tracking-widest">System Activity Log</h1>
          <p className="text-secondary text-sm mt-1 font-light">Audit trail of system changes and data mutations.</p>
        </div>
      </div>

      <div className="bg-white/[0.02] rounded-lg shadow-sm border border-white/5 overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-secondary font-light">No activity recorded yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="py-4 px-6 text-xs font-heading font-normal text-secondary uppercase tracking-widest">Timestamp</th>
                <th className="py-4 px-6 text-xs font-heading font-normal text-secondary uppercase tracking-widest">User</th>
                <th className="py-4 px-6 text-xs font-heading font-normal text-secondary uppercase tracking-widest">Action</th>
                <th className="py-4 px-6 text-xs font-heading font-normal text-secondary uppercase tracking-widest">Entity</th>
                <th className="py-4 px-6 text-xs font-heading font-normal text-secondary uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                  <td className="py-4 px-6 text-sm font-light text-white whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm font-light text-secondary">
                    {log.user?.name || log.user?.email || 'System'}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-widest bg-white/5 border border-white/10 text-white/80 rounded-full">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-light text-white">
                    {log.entity} <span className="text-[10px] text-secondary font-mono tracking-wider bg-black/40 px-1.5 py-0.5 rounded ml-2">({log.entityId.slice(-6)})</span>
                  </td>
                  <td className="py-4 px-6 text-sm font-light text-secondary">
                    {log.details || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
