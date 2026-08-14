import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Projects Management | Admin',
};

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">Projects Management</h1>
          <p className="text-admin-muted text-sm mt-1">Manage case studies and project portfolio.</p>
        </div>
        <Link href="/admin/projects/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="bg-admin-surface rounded-lg shadow-sm border border-admin-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-admin-elevated border-b border-admin-border">
              <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Project Title</th>
              <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Client</th>
              <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Category</th>
              <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-admin-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border/50">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-admin-elevated transition-colors">
                <td className="py-4 px-6 font-medium text-admin-heading">
                  <div className="flex items-center gap-2">
                    {project.title}
                    <Link href={`/projects/${project.slug}`} target="_blank" className="text-gray-400 hover:text-blue-600">
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-admin-muted">{project.client || 'N/A'}</td>
                <td className="py-4 px-6 text-sm text-admin-muted">{project.category}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    project.status === 'DISABLED' ? 'bg-admin-elevated text-admin-muted' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/projects/${project.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
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
