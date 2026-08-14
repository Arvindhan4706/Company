import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export const metadata = {
  title: 'CRM Pipeline | Admin',
};

const KANBAN_STAGES = ['NEW', 'CONTACTED', 'REQUIREMENT_VERIFIED', 'QUOTATION', 'NEGOTIATION', 'WON', 'LOST'];

export default async function PipelinePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { assignedTo: true }
  });

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">CRM Kanban Pipeline</h1>
          <p className="text-admin-muted text-sm mt-1">Drag and drop leads across statuses.</p>
        </div>
        <Link href="/admin/inquiries" className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-md transition-colors">
          List View
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {KANBAN_STAGES.map(stage => {
            const stageInquiries = inquiries.filter(i => i.status === stage);
            
            return (
              <div key={stage} className="w-80 bg-admin-elevated rounded-lg flex flex-col max-h-full">
                <div className="p-3 border-b border-admin-border flex justify-between items-center bg-admin-elevated rounded-t-lg">
                  <h3 className="font-semibold text-admin-text text-sm tracking-wide">{stage.replace('_', ' ')}</h3>
                  <span className="bg-gray-200 text-admin-muted px-2 py-0.5 rounded-full text-xs font-bold">
                    {stageInquiries.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  {stageInquiries.map(inquiry => (
                    <Link 
                      key={inquiry.id} 
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="block bg-admin-surface p-4 rounded-md shadow-sm border border-admin-border hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-gray-400">{inquiry.referenceNumber}</span>
                        {inquiry.priority === 'HIGH' || inquiry.priority === 'URGENT' ? (
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        ) : null}
                      </div>
                      
                      <div className="font-medium text-admin-heading leading-tight mb-1">{inquiry.name}</div>
                      <div className="text-xs text-admin-muted mb-3">{inquiry.company || 'Individual'}</div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {inquiry.service || 'General'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-admin-border mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock size={12} />
                          {new Date(inquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                        {inquiry.assignedTo && (
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold" title={inquiry.assignedTo.name}>
                            {inquiry.assignedTo.name?.charAt(0) || 'A'}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  {stageInquiries.length === 0 && (
                    <div className="text-center p-6 text-sm text-gray-400 border-2 border-dashed border-admin-border rounded-md">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
