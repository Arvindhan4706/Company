import Contact from '../../components/Contact';
import { db } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
  const services = await db.service.findMany({
    where: { status: 'ACTIVE' },
    select: { title: true }
  });

  return (
    <div className="page-wrapper">
      <Contact services={services} />
    </div>
  );
}
