"use client";
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const CMSContext = createContext();

const INITIAL_STATS = {
  projectsCompleted: 350,
  industrialClients: 120,
  serviceCategories: 7,
  safetyCompliance: 100
};

export const INITIAL_PROJECTS = [
  {
    id: '1',
    title: 'Autonomous Robotics Assembly Line',
    description: 'Engineered and fabricated a highly rigid structural framework to support dynamic loads from 6-axis robotic arms. Integrated precision alignment plates and automated conveyor systems with a tolerance of ±0.5mm to ensure seamless kinematic synchronization.',
    category: 'Fabrication Works',
    image: '/images/project-fabrication.png',
    status: 'Completed',
    client: 'Logistics Hub India',
    year: '2026'
  },
  {
    id: '2',
    title: 'Heavy Substation & SCADA Integration',
    description: 'Full-scale erection and mechanical installation of multi-stage transformers, high-tension cabling, and smart telemetry panels. Integrated a closed-loop SCADA system for predictive failure analysis and remote grid switching capabilities.',
    category: 'Electrical Works',
    image: '/images/project-electrical.png',
    status: 'Completed',
    client: 'Vanguard Heavy Industries',
    year: '2026'
  },
  {
    id: '3',
    title: 'Precision Medical Gas Dynamics',
    description: 'Deployed an ultra-sterile, ISO-compliant Medical Gas Pipeline System (MGPS) spanning 15,000 sq ft. Utilized orbital TIG welding for zero-contamination joints, integrated with real-time pressure monitoring and redundant zone-valve boxes.',
    category: 'Medical Infrastructure',
    image: '/images/project-medical.png',
    status: 'Completed',
    client: 'Metro Care Healthcare Group',
    year: '2026'
  },
  {
    id: '4',
    title: 'Turbine Rigging & Shaft Alignment',
    description: 'Executed the kinematic erection of a 40-ton industrial turbine. Utilized laser-guided shaft alignment and dynamic balancing protocols to eliminate rotational vibration, achieving a sub-micron operational tolerance.',
    category: 'Erection Works',
    image: '/images/project-erection.png',
    status: 'Completed',
    client: 'Apex Automotive Automation',
    year: '2026'
  },
  {
    id: '5',
    title: 'Automated Foundry Overhaul',
    description: 'Turnaround maintenance and complete mechatronic overhaul of a high-temperature processing foundry. Upgraded legacy hydraulic actuators to advanced servo-driven mechanisms and re-welded structural blast shields.',
    category: 'Industrial Maintenance',
    image: '/images/project-maintenance.png',
    status: 'Completed',
    client: 'Supreme Refineries',
    year: '2026'
  },
  {
    id: '6',
    title: 'Cleanroom HVAC & Filtration Facility',
    description: 'Engineered a Class 100 modular cleanroom environment. Installed highly sophisticated laminar flow HEPA systems, synchronized differential pressure controls, and fully automated building management sensors.',
    category: 'Medical Infrastructure',
    image: '/images/project-commercial.png',
    status: 'In Progress',
    client: 'Horizon Biopharma',
    year: '2026'
  }
];

export const CMSProvider = ({ children }) => {
  const [introState, setIntroState] = useState('playing'); // 'playing' | 'minimizing' | 'done'

  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sterling_stats');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_STATS;
  });

  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sterling_projects');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('sterling_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sterling_projects', JSON.stringify(projects));
  }, [projects]);

  const updateStats = (newStats) => {
    setStats((prev) => ({
      ...prev,
      ...newStats
    }));
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const editProject = (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updatedProject } : proj))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  return (
    <CMSContext.Provider
      value={{
        stats,
        projects,
        updateStats,
        addProject,
        editProject,
        deleteProject,
        introState,
        setIntroState
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
