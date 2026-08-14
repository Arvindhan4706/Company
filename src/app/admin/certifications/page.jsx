import { db } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Award } from 'lucide-react';

export const metadata = {
  title: 'Certifications Management | Admin',
};

export default async function AdminCertificationsPage() {
  const certifications = await db.certification.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">Certifications</h1>
          <p className="text-admin-muted text-sm mt-1">Manage ISO and industry compliance certifications.</p>
        </div>
        <Link href="/admin/certifications/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Certification
        </Link>
      </div>

      <div className="bg-admin-surface rounded-lg shadow-sm border border-admin-border overflow-hidden">
        {certifications.length === 0 ? (
          <div className="p-8 text-center text-admin-muted">No certifications found. Add your compliance documents.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-admin-elevated border-b border-admin-border">
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Certification</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Issuer</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Year</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Featured</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border/50">
              {certifications.map(cert => (
                <tr key={cert.id} className="hover:bg-admin-elevated transition-colors">
                  <td className="py-4 px-6 font-medium text-admin-heading flex items-center gap-3">
                    <Award size={18} className="text-blue-500" />
                    {cert.title}
                  </td>
                  <td className="py-4 px-6 text-sm text-admin-muted">{cert.issuer}</td>
                  <td className="py-4 px-6 text-sm text-admin-muted">{cert.year || 'N/A'}</td>
                  <td className="py-4 px-6">
                    {cert.featured ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-gray-300" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/certifications/${cert.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
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
