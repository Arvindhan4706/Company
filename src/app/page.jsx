import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import Services from '../components/Services';
import ProcessTimeline from '../components/ProcessTimeline';
import Industries from '../components/Industries';
import ProjectsGallery from '../components/ProjectsGallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <Services />
      <ProcessTimeline />
      <Industries />
      <ProjectsGallery />
    </>
  );
}
