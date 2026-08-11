import { db } from '@/lib/db';
import DocumentVault from './DocumentVault';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Document Vault | Admin',
};

export default async function AdminDocumentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const documents = await db.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      },
      inquiry: {
        select: { name: true, company: true }
      }
    }
  });

  return (
    <div>
      <DocumentVault initialDocuments={documents} />
    </div>
  );
}
