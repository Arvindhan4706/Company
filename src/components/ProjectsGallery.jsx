import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CMSContext } from '../context/CMSContext';
import { ExternalLink, Calendar, Briefcase, User } from 'lucide-react';

const ProjectsGallery = () => {
  const { projects } = useContext(CMSContext);
  const [activeFilter, setActiveFilter] = useState('All');

  // Categories derived dynamically from project data
  const categories = ['All', 'Fabrication Works', 'Erection Works', 'Electrical Works', 'Medical Infrastructure', 'Industrial Maintenance'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Our Portfolio</span>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-subtitle">
            Explore our recently executed contracts. Filter projects by engineering discipline to inspect our work quality and execution compliance.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="btn"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.85rem',
                borderRadius: '50px',
                backgroundColor: activeFilter === cat ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === cat ? 'var(--primary)' : '#94A3B8',
                border: `1px solid ${activeFilter === cat ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== cat) {
                  e.target.style.borderColor = 'var(--white)';
                  e.target.style.color = 'var(--white)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.color = '#94A3B8';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="glass-panel"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Project Image Wrapper */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '220px', background: '#0F172A' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onError={(e) => {
                      // Fallback if generated images are loading
                      e.target.onerror = null;
                      e.target.src = '/images/hero-bg.png';
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  {/* Category Badge overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'var(--primary)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--white)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {project.category}
                  </span>
                  
                  {/* Status Badge overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: project.status === 'Completed' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)',
                      color: 'var(--primary)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Details */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--white)' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      fontSize: '0.8rem',
                      color: '#64748B'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <User size={14} style={{ color: 'var(--accent)' }} />
                      <span>{project.client}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} style={{ color: 'var(--accent)' }} />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
