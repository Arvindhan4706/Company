import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'Services Management | Admin',
};

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const services = await db.service.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the core services offered by MECELFAB.</p>
        </div>
        <Link href="/admin/services/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Service
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Title</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{service.title}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{service.slug}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    service.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                    service.status === 'DISABLED' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {service.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/services/${service.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
                      <Edit size={16} />
                    </Link>
                    <button className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
