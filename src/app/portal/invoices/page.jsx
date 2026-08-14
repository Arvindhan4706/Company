import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { FileText, Clock, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'My Invoices | MECELFAB',
};

export default async function PortalInvoicesPage() {
  const session = await getServerSession(authOptions);
  
  const customer = await db.customer.findUnique({
    where: { userId: session.user.id },
    include: {
      invoices: {
        orderBy: { createdAt: 'desc' },
        include: { payments: true }
      }
    }
  });

  if (!customer) redirect('/portal');

  return (
    <div className="pb-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FileText className="text-green-400" />
          Invoices & Billing
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-2xl">
          View your complete billing history and outstanding balances.
        </p>
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20 text-secondary text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Invoice No</th>
                <th className="p-4 font-medium">Issue Date</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium text-right">Total Amount</th>
                <th className="p-4 font-medium text-right">Amount Due</th>
                <th className="p-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customer.invoices.length > 0 ? customer.invoices.map(inv => {
                const paid = inv.payments.reduce((acc, curr) => acc + curr.amount, 0);
                const balance = inv.grandTotal - paid;
                const isOverdue = inv.dueDate && new Date(inv.dueDate) < new Date() && balance > 0;
                
                return (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="p-4 text-sm text-gray-300">{inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : '—'}</td>
                  <td className="p-4 text-sm text-gray-300">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                  <td className="p-4 text-sm font-medium text-gray-300 text-right">₹ {inv.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 text-sm font-bold text-white text-right">
                    {balance > 0 ? `₹ ${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                  <td className="p-4 text-center">
                    {balance <= 0 ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border bg-green-500/10 text-green-400 border-green-500/20 flex items-center justify-center gap-1 w-max mx-auto">
                        <CheckCircle size={12} /> Paid
                      </span>
                    ) : isOverdue ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border bg-red-500/10 text-red-400 border-red-500/20 w-max mx-auto">
                        Overdue
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center justify-center gap-1 w-max mx-auto">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 text-sm">
                    No invoices found for your account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
