import ProjectsGallery from '../../components/ProjectsGallery';
import TrustSection from '../../components/TrustSection';
import { db } from '@/lib/db';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    where: { status: { not: 'DISABLED' } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pt-24 bg-bg-dark min-h-screen">
      <ProjectsGallery projects={projects} />
      <TrustSection />
    </div>
  );
}
