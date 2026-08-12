import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, KanbanSquare, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'CRM Inbox | Admin',
};

export default async function CRMInboxPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { status, q } = await searchParams;

  const whereClause = {};
  if (status) whereClause.status = status;
  if (q) {
    whereClause.OR = [
      { referenceNumber: { contains: q } },
      { name: { contains: q } },
      { company: { contains: q } },
      { email: { contains: q } },
    ];
  }

  const inquiries = await db.inquiry.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: { assignedTo: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiry Inbox</h1>
          <p className="text-gray-500 text-sm mt-1">Manage service requests and leads.</p>
        </div>
        <Link href="/admin/inquiries/pipeline" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <KanbanSquare size={16} />
          Kanban Board
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
          <form className="flex-1 min-w-[300px] flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                name="q"
                defaultValue={q}
                placeholder="Search reference, name, company..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <select name="status" defaultValue={status} className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="REQUIREMENT_VERIFIED">Req. Verified</option>
              <option value="QUOTATION">Quotation</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
              <option value="CLOSED">Closed</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50">Filter</button>
            {(q || status) && <Link href="/admin/inquiries" className="px-4 py-2 text-gray-500 text-sm hover:text-gray-900 flex items-center">Clear</Link>}
          </form>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No inquiries found matching your criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer / Company</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status / Priority</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map(inquiry => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-6 font-mono text-xs font-medium text-gray-900">{inquiry.referenceNumber}</td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900 text-sm">{inquiry.name}</p>
                      <p className="text-xs text-gray-500">{inquiry.company || 'Individual'}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{inquiry.service || 'General'}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 rounded-sm">
                          {inquiry.status.replace('_', ' ')}
                        </span>
                        {inquiry.priority !== 'MEDIUM' && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${inquiry.priority === 'HIGH' || inquiry.priority === 'URGENT' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {inquiry.priority}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/admin/inquiries/${inquiry.id}`} className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <ArrowRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
