import Contact from '../../components/Contact';
import { db } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
  const services = await db.service.findMany({
    where: { status: 'ACTIVE' },
    select: { title: true }
  });

  const settings = await db.setting.findMany({
    where: { key: 'CONTENT_CONTACT' }
  });
  
  const contactContent = settings.length > 0 && settings[0].value 
    ? JSON.parse(settings[0].value) 
    : null;

  return (
    <div className="page-wrapper">
      <Contact services={services} content={contactContent} />
    </div>
  );
}
