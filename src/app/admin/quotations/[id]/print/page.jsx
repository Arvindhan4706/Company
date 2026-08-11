import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';

export const metadata = {
  title: 'Print Quotation | MECELFAB',
};

export default async function PrintQuotationPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const quotation = await db.quotation.findUnique({
    where: { id: params.id },
    include: { items: true, user: true }
  });

  if (!quotation) notFound();

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 print:bg-white">
      {/* Print Controls (Hidden on Print) */}
      <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between items-center print:hidden">
        <p className="text-sm text-gray-600 font-medium">Print Preview for {quotation.quotationNumber}</p>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') window.print();
          }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow text-sm font-bold transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* A4 Document Container */}
      <div className="max-w-4xl mx-auto bg-white p-12 print:p-0 print:max-w-none print:w-full">
        
        {/* Header */}
        <header className="flex justify-between items-start border-b-2 border-gray-800 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 mb-1">MECELFAB</h1>
            <p className="text-sm text-gray-600 font-medium uppercase tracking-widest">Industrial Solutions Pvt. Ltd.</p>
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>123 Industrial Area, Phase 1</p>
              <p>Mumbai, Maharashtra 400001, India</p>
              <p>Email: contact@mecelfab.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-200 uppercase tracking-widest mb-4">Quotation</h2>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-semibold text-gray-500 inline-block w-24 text-right pr-2">Quote No:</span> <span className="font-bold text-gray-900">{quotation.quotationNumber}</span></p>
              <p className="text-sm"><span className="font-semibold text-gray-500 inline-block w-24 text-right pr-2">Date:</span> <span className="font-medium text-gray-900">{new Date(quotation.createdAt).toLocaleDateString()}</span></p>
              <p className="text-sm"><span className="font-semibold text-gray-500 inline-block w-24 text-right pr-2">Valid Until:</span> <span className="font-medium text-gray-900">{new Date(new Date(quotation.createdAt).getTime() + (quotation.validityDays * 24 * 60 * 60 * 1000)).toLocaleDateString()}</span></p>
            </div>
          </div>
        </header>

        {/* Client Info & Scope */}
        <div className="grid grid-cols-2 gap-12 mb-10">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Prepared For</h3>
            <p className="text-base font-bold text-gray-900">{quotation.customerName}</p>
            {quotation.companyName && <p className="text-sm text-gray-800 font-medium">{quotation.companyName}</p>}
            <div className="mt-2 text-sm text-gray-600 space-y-0.5">
              <p>{quotation.email}</p>
              {quotation.phone && <p>{quotation.phone}</p>}
              {quotation.address && <p className="whitespace-pre-wrap mt-1">{quotation.address}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Project Summary</h3>
            <p className="text-sm font-bold text-gray-900 mb-1">{quotation.service}</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{quotation.scopeOfWork}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-10 min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-y-2 border-gray-800 print:bg-gray-50">
                <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase">Description</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase text-center w-16">Qty</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase text-right w-32">Unit Price</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 uppercase text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotation.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4 text-sm text-gray-900">{item.description}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">₹ {item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 text-right">₹ {item.totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="flex justify-end mb-12 page-break-inside-avoid">
          <div className="w-80 space-y-3">
            <div className="flex justify-between text-sm text-gray-700 px-4">
              <span className="font-medium">Subtotal</span>
              <span>₹ {quotation.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            {quotation.discount > 0 && (
              <div className="flex justify-between text-sm text-gray-700 px-4">
                <span className="font-medium">Discount</span>
                <span>- ₹ {quotation.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-700 px-4">
              <span className="font-medium">Tax ({quotation.taxRate}%)</span>
              <span>₹ {quotation.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-800 pt-3 px-4 mt-2 bg-gray-50 print:bg-transparent">
              <span>Grand Total</span>
              <span>₹ {quotation.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer / Terms */}
        <div className="mt-auto border-t border-gray-200 pt-8 page-break-inside-avoid">
          {quotation.termsConditions && (
            <div className="mb-8">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Terms & Conditions</h4>
              <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{quotation.termsConditions}</p>
            </div>
          )}
          
          <div className="flex justify-between items-end mt-16 pt-8">
            <div className="text-center w-48">
              <div className="border-b border-gray-300 pb-2 mb-2 h-8"></div>
              <p className="text-xs font-medium text-gray-900">Accepted by Client</p>
              <p className="text-[10px] text-gray-500 mt-1">Signature & Date</p>
            </div>
            <div className="text-center w-48">
              <div className="border-b border-gray-300 pb-2 mb-2 h-8 flex items-end justify-center">
                <span className="font-signature text-xl text-gray-800">{quotation.user.name}</span>
              </div>
              <p className="text-xs font-medium text-gray-900">For MECELFAB</p>
              <p className="text-[10px] text-gray-500 mt-1">Authorized Signatory</p>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Inline styles for precise print control */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .page-break-inside-avoid { page-break-inside: avoid; }
          @page { margin: 1cm; size: A4; }
          /* Hide the Admin layout sidebar globally if rendering in print mode, though we usually just open this in a new tab without the layout */
        }
      `}} />
    </div>
  );
}
