import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Briefcase, MessageSquare, Activity, Calendar, AlertTriangle, FileText, CheckCircle, ArrowRight, Wrench } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | MECELFAB',
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  // KPI Fetching
  const newInquiries = await db.inquiry.count({ where: { status: 'NEW' } });
  const openInquiries = await db.inquiry.count({ where: { status: { in: ['NEW', 'CONTACTED', 'REQUIREMENT_VERIFIED', 'QUOTATION', 'NEGOTIATION'] } } });
  const quotations = await db.inquiry.count({ where: { status: 'QUOTATION' } });
  const wonInquiries = await db.inquiry.count({ where: { status: 'WON' } });

  // Follow-ups Date Logic
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const followUpsToday = await db.followUp.count({
    where: { date: { gte: todayStart, lte: todayEnd }, status: 'PENDING' }
  });
  
  const overdueFollowUps = await db.followUp.count({
    where: { date: { lt: todayStart }, status: 'PENDING' }
  });

  const upcomingFollowUpsList = await db.followUp.findMany({
    where: { date: { gte: todayStart }, status: 'PENDING' },
    orderBy: { date: 'asc' },
    take: 5,
    include: { inquiry: true }
  });

  const overdueFollowUpsList = await db.followUp.findMany({
    where: { date: { lt: todayStart }, status: 'PENDING' },
    orderBy: { date: 'desc' },
    take: 5,
    include: { inquiry: true }
  });

  // Service Demand Chart Logic
  const servicesData = await db.inquiry.groupBy({
    by: ['service'],
    _count: { service: true },
    orderBy: { _count: { service: 'desc' } }
  });
  const maxServiceCount = servicesData.length > 0 ? Math.max(...servicesData.map(s => s._count.service)) : 1;

  // Pipeline Summary Logic
  const pipelineStatuses = ['NEW', 'CONTACTED', 'REQUIREMENT_VERIFIED', 'QUOTATION', 'NEGOTIATION', 'WON', 'LOST'];
  const pipelineData = await db.inquiry.groupBy({
    by: ['status'],
    _count: { status: true }
  });
  const pipelineMap = pipelineData.reduce((acc, curr) => {
    acc[curr.status] = curr._count.status;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Operations Overview</h1>
        <p className="text-secondary text-sm mt-1">Welcome back, {session.user.name || session.user.email}</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">New Inquiries</p>
            <MessageSquare size={16} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{newInquiries}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">Open Leads</p>
            <Activity size={16} className="text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{openInquiries}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">Follow-ups Today</p>
            <Calendar size={16} className="text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white">{followUpsToday}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">Overdue</p>
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-400">{overdueFollowUps}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">Quotations</p>
            <FileText size={16} className="text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">{quotations}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-lg shadow-lg border border-white/10 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">Won</p>
            <CheckCircle size={16} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{wonInquiries}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Service Demand & Pipeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Service Demand Chart */}
          <div className="bg-white/5 rounded-lg shadow-lg border border-white/10 p-6 backdrop-blur-sm">
            <h2 className="font-semibold text-white mb-6 flex items-center gap-2"><Wrench size={18}/> Service Demand</h2>
            <div className="space-y-4">
              {servicesData.length > 0 ? servicesData.map(item => (
                <div key={item.service || 'Unknown'} className="flex items-center gap-4">
                  <div className="w-1/3 text-sm text-secondary truncate" title={item.service || 'General'}>{item.service || 'General'}</div>
                  <div className="w-2/3 flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(item._count.service / maxServiceCount) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-secondary w-8 text-right">{item._count.service}</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-secondary/70 italic py-4">Not enough inquiry data yet.</p>
              )}
            </div>
          </div>

          {/* Pipeline Summary */}
          <div className="bg-white/5 rounded-lg shadow-lg border border-white/10 p-6 backdrop-blur-sm">
            <h2 className="font-semibold text-white mb-6 flex items-center gap-2"><Activity size={18}/> Pipeline Summary</h2>
            <div className="flex flex-col gap-2">
              {pipelineStatuses.map(status => (
                <div key={status} className="flex justify-between items-center p-3 hover:bg-white/10 rounded-md border border-transparent hover:border-white/10 transition-colors">
                  <span className="text-sm font-medium text-secondary">{status.replace('_', ' ')}</span>
                  <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full">{pipelineMap[status] || 0}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Follow-ups */}
        <div className="space-y-8">
          
          <div className="bg-white/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-red-500/10">
              <h2 className="font-semibold text-red-400 flex items-center gap-2"><AlertTriangle size={18}/> Overdue Follow-ups</h2>
              <span className="bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full">{overdueFollowUps}</span>
            </div>
            <div className="p-4 divide-y divide-white/10">
              {overdueFollowUpsList.length > 0 ? overdueFollowUpsList.map(fu => (
                <Link key={fu.id} href={`/admin/inquiries/${fu.inquiryId}`} className="py-3 block hover:bg-white/10 transition-colors group px-2 rounded-md">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{fu.inquiry.name}</p>
                    <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">{new Date(fu.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-secondary truncate">{fu.note}</p>
                </Link>
              )) : (
                <p className="text-sm text-secondary/70 italic text-center py-6">No overdue follow-ups.</p>
              )}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-semibold text-white flex items-center gap-2"><Calendar size={18} className="text-blue-400"/> Upcoming Follow-ups</h2>
            </div>
            <div className="p-4 divide-y divide-white/10">
              {upcomingFollowUpsList.length > 0 ? upcomingFollowUpsList.map(fu => (
                <Link key={fu.id} href={`/admin/inquiries/${fu.inquiryId}`} className="py-3 block hover:bg-white/10 transition-colors group px-2 rounded-md">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{fu.inquiry.name}</p>
                    <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">{new Date(fu.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-secondary truncate">{fu.note}</p>
                </Link>
              )) : (
                <p className="text-sm text-secondary/70 italic text-center py-6">No upcoming follow-ups scheduled.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
