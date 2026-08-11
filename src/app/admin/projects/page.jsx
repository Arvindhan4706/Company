import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectList from './ProjectList';

export const metadata = {
  title: 'Manage Projects | Admin | MECELFAB',
};

export default async function ProjectsAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light text-white mb-2">Projects</h1>
        <p className="text-secondary text-sm">Manage your industrial portfolio and execution case studies.</p>
      </div>

      <ProjectList initialProjects={projects} />
    </div>
  );
}
