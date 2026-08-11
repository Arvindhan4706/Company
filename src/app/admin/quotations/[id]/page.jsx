import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer, Send, CheckCircle, XCircle, FileText, User, Building, Phone, Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Quotation Detail | Admin',
};

async function updateQuotationStatus(formData) {
  'use server';
  const id = formData.get('id');
  const status = formData.get('status');
  const inquiryId = formData.get('inquiryId');

  await db.quotation.update({
    where: { id },
    data: { status }
  });

  // Sync to Inquiry CRM pipeline
  let inquiryStatus = null;
  if (status === 'ACCEPTED') inquiryStatus = 'WON';
  else if (status === 'REJECTED') inquiryStatus = 'LOST';
  else if (status === 'SENT') inquiryStatus = 'NEGOTIATION';

  if (inquiryStatus) {
    await db.inquiry.update({
      where: { id: inquiryId },
      data: { status: inquiryStatus }
    });
  }

  revalidatePath(`/admin/quotations/${id}`);
  revalidatePath(`/admin/quotations`);
  revalidatePath(`/admin/inquiries/${inquiryId}`);
}

export default async function QuotationDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const quotation = await db.quotation.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      inquiry: true,
      user: true
    }
  });

  if (!quotation) notFound();

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
    <div className="pb-12 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/quotations" className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {quotation.quotationNumber}
              <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded-full ${getStatusStyle(quotation.status)}`}>
                {quotation.status}
              </span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Created on {new Date(quotation.createdAt).toLocaleDateString()} by {quotation.user.name}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link href={`/admin/quotations/${quotation.id}/print`} target="_blank" className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <Printer size={16} /> Print / PDF
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-1">MECELFAB</h2>
                <p className="text-xs text-gray-500 max-w-[200px]">Industrial Solutions Private Limited</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest mb-2">Quotation</h3>
                <p className="text-sm text-gray-800 font-semibold">{quotation.quotationNumber}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {new Date(quotation.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Valid until: {new Date(new Date(quotation.createdAt).getTime() + (quotation.validityDays * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quote For:</h4>
              <p className="text-sm font-bold text-gray-900">{quotation.customerName}</p>
              {quotation.companyName && <p className="text-sm text-gray-700">{quotation.companyName}</p>}
              <p className="text-sm text-gray-600 mt-1">{quotation.email}</p>
              {quotation.phone && <p className="text-sm text-gray-600">{quotation.phone}</p>}
              {quotation.address && <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{quotation.address}</p>}
            </div>

            {/* Scope */}
            <div className="mb-8 bg-gray-50 p-4 rounded border border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Project: {quotation.service}</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{quotation.scopeOfWork}</p>
            </div>

            {/* Items */}
            <div className="mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 text-xs font-bold text-gray-500 uppercase">Description</th>
                    <th className="py-2 text-xs font-bold text-gray-500 uppercase text-center w-16">Qty</th>
                    <th className="py-2 text-xs font-bold text-gray-500 uppercase text-right w-28">Unit Price</th>
                    <th className="py-2 text-xs font-bold text-gray-500 uppercase text-right w-28">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quotation.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 text-sm text-gray-800">{item.description}</td>
                      <td className="py-3 text-sm text-gray-800 text-center">{item.quantity}</td>
                      <td className="py-3 text-sm text-gray-800 text-right">₹ {item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">₹ {item.totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financials */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹ {quotation.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax ({quotation.taxRate}%)</span>
                  <span>₹ {quotation.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                {quotation.discount > 0 && (
                  <div className="flex justify-between text-sm text-red-500">
                    <span>Discount</span>
                    <span>- ₹ {quotation.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                  <span>Grand Total</span>
                  <span>₹ {quotation.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* T&C */}
            {quotation.termsConditions && (
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Terms & Conditions</h4>
                <p className="text-xs text-gray-500 whitespace-pre-wrap">{quotation.termsConditions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col - Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm">Status Management</h2>
            </div>
            <div className="p-4 space-y-2">
              <form action={updateQuotationStatus}>
                <input type="hidden" name="id" value={quotation.id} />
                <input type="hidden" name="inquiryId" value={quotation.inquiryId} />
                
                <div className="grid grid-cols-1 gap-2">
                  {quotation.status === 'DRAFT' && (
                    <button type="submit" name="status" value="SENT" className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      <Send size={16}/> Mark as Sent
                    </button>
                  )}
                  
                  {['SENT', 'VIEWED'].includes(quotation.status) && (
                    <>
                      <button type="submit" name="status" value="ACCEPTED" className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                        <CheckCircle size={16}/> Mark as Accepted
                      </button>
                      <button type="submit" name="status" value="REJECTED" className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                        <XCircle size={16}/> Mark as Rejected
                      </button>
                    </>
                  )}

                  {['ACCEPTED', 'REJECTED', 'EXPIRED'].includes(quotation.status) && (
                    <p className="text-xs text-gray-500 text-center py-2 italic border border-gray-100 rounded bg-gray-50">
                      This quotation is closed.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm">CRM Link</h2>
            </div>
            <div className="p-4 text-sm">
              <p className="text-gray-600 mb-2">This quotation is linked to:</p>
              <Link href={`/admin/inquiries/${quotation.inquiryId}`} className="flex items-center justify-between p-3 border border-indigo-100 bg-indigo-50/50 rounded-md hover:bg-indigo-50 transition-colors group">
                <div>
                  <p className="font-bold text-indigo-700 group-hover:text-indigo-900">{quotation.inquiry.referenceNumber}</p>
                  <p className="text-xs text-indigo-500 mt-0.5">{quotation.inquiry.name}</p>
                </div>
                <ArrowLeft size={16} className="text-indigo-400 group-hover:text-indigo-600 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
