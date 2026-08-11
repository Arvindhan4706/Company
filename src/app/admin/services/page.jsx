import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ServiceList from './ServiceList';

export const metadata = {
  title: 'Manage Services | Admin | MECELFAB',
};

export default async function ServicesAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const services = await db.service.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <ServiceList initialServices={services} />
    </div>
  );
}
