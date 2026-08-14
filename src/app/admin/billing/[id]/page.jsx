import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, FileText, CheckCircle, IndianRupee, History, Printer } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Invoice Detail | Admin | MECELFAB',
};

async function recordPayment(formData) {
  'use server';
  const invoiceId = formData.get('invoiceId');
  const amountStr = formData.get('amount');
  const dateStr = formData.get('date');
  const method = formData.get('method');
  const reference = formData.get('reference');
  
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) return;

  await db.payment.create({
    data: {
      invoiceId,
      amount,
      date: new Date(dateStr),
      method,
      reference
    }
  });

  // Re-evaluate invoice status
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    include: { payments: true }
  });

  const paid = invoice.payments.reduce((acc, curr) => acc + curr.amount, 0);
  let newStatus = invoice.status;

  if (paid >= invoice.grandTotal) {
    newStatus = 'PAID';
  } else if (paid > 0 && invoice.status !== 'PAID') {
    newStatus = 'PARTIALLY_PAID';
  }

  if (newStatus !== invoice.status) {
    await db.invoice.update({
      where: { id: invoiceId },
      data: { status: newStatus }
    });
  }

  revalidatePath(`/admin/billing/${invoiceId}`);
  revalidatePath(`/admin/billing`);
}

export default async function (props) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const invoice = await db.invoice.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      workOrder: true,
      quotation: {
        include: { items: true }
      },
      payments: {
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!invoice) notFound();

  const paidAmount = invoice.payments.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = invoice.grandTotal - paidAmount;

  const getStatusColor = () => {
    if (invoice.status === 'CANCELLED') return 'bg-admin-elevated text-admin-heading border-admin-border';
    if (balance <= 0) return 'bg-green-100 text-green-800 border-green-200';
    if (invoice.dueDate && new Date(invoice.dueDate) < new Date() && balance > 0) return 'bg-red-100 text-red-800 border-red-200';
    if (paidAmount > 0) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const getStatusText = () => {
    if (invoice.status === 'CANCELLED') return 'CANCELLED';
    if (balance <= 0) return 'PAID';
    if (invoice.dueDate && new Date(invoice.dueDate) < new Date() && balance > 0) return 'OVERDUE';
    if (paidAmount > 0) return 'PARTIALLY PAID';
    return invoice.status;
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/billing" className="p-2 border border-white/10 rounded-md text-secondary hover:bg-admin-surface/5 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {invoice.invoiceNumber}
              <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded-full border ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </h1>
            <div className="text-secondary text-sm mt-1 flex gap-4">
              <span>Issue: {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : '—'}</span>
              <span>Due: {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-admin-surface/10 hover:bg-admin-surface/20 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors border border-white/10">
          <Printer size={16} /> Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-admin-surface/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <h2 className="font-semibold text-white flex items-center gap-2"><User size={18} className="text-blue-400"/> Bill To</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{invoice.customer.contactPerson}</p>
                <p className="text-sm text-gray-300">{invoice.customer.companyName || '—'}</p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-gray-300">{invoice.customer.email}</p>
                <p className="text-sm text-gray-300">{invoice.customer.phone || '—'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400 whitespace-pre-wrap">{invoice.customer.address || '—'}</p>
              </div>
            </div>
          </div>

          <div className="bg-admin-surface/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <h2 className="font-semibold text-white flex items-center gap-2"><FileText size={18} className="text-indigo-400"/> Line Items</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/10 text-secondary text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Description</th>
                    <th className="p-4 font-medium text-center">Qty</th>
                    <th className="p-4 font-medium text-right">Price</th>
                    <th className="p-4 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoice.quotation?.items.length > 0 ? invoice.quotation.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-admin-surface/5 transition-colors">
                      <td className="p-4 text-sm text-gray-300">{item.description}</td>
                      <td className="p-4 text-sm text-gray-300 text-center">{item.quantity}</td>
                      <td className="p-4 text-sm text-gray-300 text-right">₹ {item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-4 text-sm text-gray-300 text-right">₹ {item.totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-sm text-gray-400 italic">Items were not detailed for this invoice.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-black/20 border-t border-white/10 flex flex-col items-end gap-2 text-sm">
              <div className="flex justify-between w-64 text-gray-400">
                <span>Subtotal:</span>
                <span>₹ {invoice.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between w-64 text-green-400">
                  <span>Discount:</span>
                  <span>- ₹ {invoice.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {invoice.taxAmount > 0 && (
                <div className="flex justify-between w-64 text-gray-400">
                  <span>Tax:</span>
                  <span>₹ {invoice.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between w-64 text-white font-bold text-lg mt-2 pt-2 border-t border-white/10">
                <span>Grand Total:</span>
                <span>₹ {invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col - Payments */}
        <div className="space-y-6">
          <div className="bg-admin-surface/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm text-center p-6">
            <IndianRupee size={48} className={`mx-auto mb-4 opacity-50 ${balance > 0 ? 'text-amber-400' : 'text-green-400'}`} />
            <p className="text-sm text-secondary uppercase tracking-wider mb-2">Amount Due</p>
            <h2 className={`text-4xl font-black mb-2 ${balance > 0 ? 'text-amber-400' : 'text-green-400'}`}>
              ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h2>
            <p className="text-xs text-gray-400">Total Paid: ₹ {paidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>

          {balance > 0 && invoice.status !== 'CANCELLED' && (
            <div className="bg-admin-surface/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
              <div className="p-4 border-b border-white/10 bg-black/20">
                <h2 className="font-semibold text-white text-sm">Record Payment</h2>
              </div>
              <div className="p-4">
                <form action={recordPayment} className="space-y-4">
                  <input type="hidden" name="invoiceId" value={invoice.id} />
                  
                  <div>
                    <label className="block text-xs text-secondary font-medium uppercase tracking-wider mb-1">Amount Paid</label>
                    <input type="number" step="0.01" name="amount" defaultValue={balance} max={balance} required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium uppercase tracking-wider mb-1">Payment Date</label>
                    <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium uppercase tracking-wider mb-1">Method</label>
                    <select name="method" required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none">
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="CHEQUE">Cheque</option>
                      <option value="CASH">Cash</option>
                      <option value="ONLINE">Online Gateway</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium uppercase tracking-wider mb-1">Reference No (Optional)</label>
                    <input type="text" name="reference" placeholder="Txn ID, Cheque No..." className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors mt-2">
                    Submit Payment
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="bg-admin-surface/5 rounded-lg shadow-lg border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <h2 className="font-semibold text-white flex items-center gap-2"><History size={18} className="text-green-400"/> Payment History</h2>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-white/5">
                {invoice.payments.length > 0 ? invoice.payments.map(payment => (
                  <li key={payment.id} className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-green-400">₹ {payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      <span className="text-xs text-gray-400">{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-admin-muted">
                      <span className="px-2 py-0.5 rounded bg-black/30 border border-white/5">{payment.method.replace('_', ' ')}</span>
                      <span>Ref: {payment.reference || '—'}</span>
                    </div>
                  </li>
                )) : (
                  <li className="p-6 text-center text-secondary text-sm italic">
                    No payments recorded.
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
