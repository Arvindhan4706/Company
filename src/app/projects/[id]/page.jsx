import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, CheckCircle } from 'lucide-react';
import { INITIAL_PROJECTS } from '../../../context/CMSContext';

export async function generateMetadata({ params }) {
  const project = INITIAL_PROJECTS.find(p => p.id === params.id);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Sterling Industrial Solutions`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = INITIAL_PROJECTS.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <Link href="/#projects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '2rem', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
        
        <div className="glass-panel" style={{ padding: '3rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="project-grid">
            <div>
              <span className="section-badge">{project.category}</span>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--white)', marginBottom: '1rem', marginTop: '1rem' }}>{project.title}</h1>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', color: '#94A3B8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} style={{ color: 'var(--accent)' }} />
                  <span><strong>Client:</strong> {project.client}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} style={{ color: 'var(--accent)' }} />
                  <span><strong>Completed:</strong> {project.year}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--accent)' }} />
                  <span><strong>Status:</strong> {project.status}</span>
                </div>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
                <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Project Challenge</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, marginBottom: '2rem' }}>
                {project.description} We faced stringent requirements regarding precision and environmental safety. The timeline was aggressive, necessitating parallel workflows and strict coordination among multidisciplinary teams.
              </p>
              
              <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Solution & Execution</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, marginBottom: '2rem' }}>
                Sterling deployed its elite engineering unit, applying ISO-compliant standards and rigorous NDT protocols. Through predictive risk algorithms and CPM scheduling, we optimized resource allocation and ensured zero-variance quality.
              </p>
              
              <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>ROI & Statistics</h3>
              <ul style={{ color: '#94A3B8', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                <li>Delivered 14 days ahead of schedule</li>
                <li>Zero LTI (Lost Time Incidents)</li>
                <li>100% compliance with client specifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 992px) {
          .project-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
