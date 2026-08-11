import { db } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';

export const metadata = {
  title: 'Industries Management | Admin',
};

export default async function AdminIndustriesPage() {
  const industries = await db.industry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industries Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the industrial sectors you serve.</p>
        </div>
        <Link href="/admin/industries/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Industry
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {industries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No industries found. Create your first one.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry Title</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Capabilities Configured</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {industries.map(industry => {
                const caps = industry.capabilities ? JSON.parse(industry.capabilities) : [];
                return (
                  <tr key={industry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{industry.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{industry.slug}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {caps.length} defined
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/industries/${industry.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
