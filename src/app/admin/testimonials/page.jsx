import { db } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, Star, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Testimonials Management | Admin',
};

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">Testimonials</h1>
          <p className="text-admin-muted text-sm mt-1">Manage client reviews and feedback.</p>
        </div>
        <Link href="/admin/testimonials/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Testimonial
        </Link>
      </div>

      <div className="bg-admin-surface rounded-lg shadow-sm border border-admin-border overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-8 text-center text-admin-muted">No testimonials found. Add your first review.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-admin-elevated border-b border-admin-border">
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Client</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Quote Summary</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Rating</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Featured</th>
                <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border/50">
              {testimonials.map(t => (
                <tr key={t.id} className="hover:bg-admin-elevated transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium text-admin-heading">{t.name}</p>
                    <p className="text-xs text-admin-muted">{t.role}, {t.company}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-admin-muted max-w-xs truncate">
                    "{t.quote}"
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "fill-current" : "text-gray-200"} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {t.featured ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-gray-300" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/testimonials/${t.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
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
