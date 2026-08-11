import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import QuotationBuilder from '@/components/admin/QuotationBuilder';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Create Quotation | Admin',
};

async function saveQuotation(formData) {
  'use server';
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  const user = await db.user.findUnique({ where: { email: session.user.email } });

  const inquiryId = formData.get('inquiryId');
  const customerName = formData.get('customerName');
  const companyName = formData.get('companyName') || '';
  const email = formData.get('email');
  const phone = formData.get('phone') || '';
  const address = formData.get('address') || '';
  const service = formData.get('service');
  const validityDays = parseInt(formData.get('validityDays')) || 30;
  const scopeOfWork = formData.get('scopeOfWork');
  const termsConditions = formData.get('termsConditions') || '';

  const items = JSON.parse(formData.get('items'));
  const subtotal = parseFloat(formData.get('subtotal'));
  const taxRate = parseFloat(formData.get('taxRate'));
  const taxAmount = parseFloat(formData.get('taxAmount'));
  const discount = parseFloat(formData.get('discount')) || 0;
  const grandTotal = parseFloat(formData.get('grandTotal'));

  // Generate unique quotation number MEC-QT-YYYY-XXXX
  const year = new Date().getFullYear();
  const count = await db.quotation.count();
  const quotationNumber = `MEC-QT-${year}-${String(count + 1).padStart(4, '0')}`;

  const quotation = await db.quotation.create({
    data: {
      quotationNumber,
      inquiryId,
      customerName,
      companyName,
      email,
      phone,
      address,
      service,
      scopeOfWork,
      termsConditions,
      validityDays,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      grandTotal,
      createdBy: user.id,
      items: {
        create: items.map(item => ({
          description: item.description,
          quantity: parseInt(item.quantity),
          unitPrice: parseFloat(item.unitPrice),
          totalPrice: parseInt(item.quantity) * parseFloat(item.unitPrice)
        }))
      }
    }
  });

  // Update inquiry status
  await db.inquiry.update({
    where: { id: inquiryId },
    data: { status: 'QUOTATION' }
  });

  // Log activity
  await db.activityLog.create({
    data: {
      action: 'QUOTATION_CREATED',
      entity: 'QUOTATION',
      entityId: quotation.id,
      userId: user.id,
      details: `Created quotation ${quotationNumber} for ${grandTotal}`
    }
  });

  revalidatePath(`/admin/inquiries/${inquiryId}`);
  revalidatePath(`/admin/quotations`);
  redirect(`/admin/quotations/${quotation.id}`);
}

export default async function CreateQuotationPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const inquiry = await db.inquiry.findUnique({
    where: { id: params.id }
  });

  if (!inquiry) notFound();

  return <QuotationBuilder inquiry={inquiry} saveQuotationAction={saveQuotation} />;
}
