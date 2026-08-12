import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, Eye, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

export const metadata = {
  title: 'Quotations | Admin',
};

export default async function QuotationsIndexPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q || '';
  const statusFilter = resolvedSearchParams?.status || '';

  const where = {
    AND: [
      query ? {
        OR: [
          { quotationNumber: { contains: query } },
          { customerName: { contains: query } },
          { companyName: { contains: query } }
        ]
      } : {},
      statusFilter ? { status: statusFilter } : {}
    ]
  };

  const quotations = await db.quotation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      inquiry: { select: { referenceNumber: true } }
    }
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'SENT': return 'bg-blue-100 text-blue-800';
      case 'VIEWED': return 'bg-purple-100 text-purple-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'EXPIRED': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FileText size={24} className="text-indigo-600"/> Quotations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all business proposals and quotes</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form className="relative w-full md:w-96 flex items-center">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search by quote # or customer..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500"
            />
            {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          </form>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {['ALL', 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'].map(s => {
              const isActive = (s === 'ALL' && !statusFilter) || statusFilter === s;
              return (
                <Link 
                  key={s} 
                  href={`/admin/quotations?${new URLSearchParams({ ...(query ? {q: query} : {}), ...(s !== 'ALL' ? {status: s} : {}) }).toString()}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {s}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Quote #</th>
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 text-sm">
                    No quotations found matching your criteria.
                  </td>
                </tr>
              ) : (
                quotations.map(quote => (
                  <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 align-middle">
                      <div>
                        <Link href={`/admin/quotations/${quote.id}`} className="font-semibold text-indigo-600 hover:text-indigo-800">{quote.quotationNumber}</Link>
                        <div className="text-[10px] text-gray-400 mt-0.5">Inquiry: <Link href={`/admin/inquiries/${quote.inquiryId}`} className="hover:underline">{quote.inquiry.referenceNumber}</Link></div>
                      </div>
                    </td>
                    <td className="p-5 align-middle">
                      <p className="text-sm font-medium text-gray-900">{quote.customerName}</p>
                      <p className="text-xs text-gray-500">{quote.companyName || quote.email}</p>
                    </td>
                    <td className="p-5 align-middle">
                      <p className="text-sm font-bold text-gray-900">₹ {quote.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    </td>
                    <td className="p-5 align-middle">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${getStatusStyle(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-5 align-middle">
                      <p className="text-xs text-gray-600">{new Date(quote.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-5 align-middle text-right">
                      <Link href={`/admin/quotations/${quote.id}`} className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="View Quotation">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
