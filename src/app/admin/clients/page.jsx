import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientList from './ClientList';

export const metadata = {
  title: 'Manage Clients | Admin | MECELFAB',
};

export default async function ClientsAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const clients = await db.client.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <ClientList initialClients={clients} />
    </div>
  );
}
