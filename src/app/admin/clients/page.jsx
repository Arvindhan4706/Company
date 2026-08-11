import { db } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Clients Management | Admin',
};

export default async function AdminClientsPage() {
  const clients = await db.client.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage client logos and featured partners.</p>
        </div>
        <Link href="/admin/clients/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Client
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No clients found. Add your first client.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{client.name}</td>
                  <td className="py-4 px-6">
                    {client.logoUrl ? (
                      <div className="relative w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center p-1">
                        <img src={client.logoUrl} alt={client.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm italic">No logo</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {client.featured ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-gray-300" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/clients/${client.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
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
        )}
      </div>
    </div>
  );
}
