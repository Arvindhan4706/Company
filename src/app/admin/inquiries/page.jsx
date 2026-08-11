import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import InquiryList from './InquiryList';

export const metadata = {
  title: 'Inquiries Inbox | Admin | MECELFAB',
};

export default async function InquiriesAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light text-white mb-2">Inquiries Inbox</h1>
        <p className="text-secondary text-sm">Manage quote requests and contact form submissions.</p>
      </div>
      <InquiryList initialInquiries={inquiries} />
    </div>
  );
}
