import About from '../../components/About';
import VisionMission from '../../components/VisionMission';
import QualitySafety from '../../components/QualitySafety';
import { db } from '@/lib/db';

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await db.setting.findMany({
    where: { key: 'CONTENT_ABOUT' }
  });
  
  const aboutContent = settings.length > 0 && settings[0].value 
    ? JSON.parse(settings[0].value) 
    : null;

  return (
    <div className="page-wrapper">
      <About content={aboutContent} />
      <VisionMission />
      <QualitySafety />
    </div>
  );
}
