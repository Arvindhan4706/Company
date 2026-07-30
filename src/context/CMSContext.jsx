import React, { createContext, useState, useEffect } from 'react';

export const CMSContext = createContext();

const INITIAL_STATS = {
  projectsCompleted: 350,
  industrialClients: 120,
  serviceCategories: 7,
  safetyCompliance: 100
};

const INITIAL_PROJECTS = [
  {
    id: '1',
    title: 'Industrial Fabrication Project',
    description: 'Heavy structural steel fabrication for a major warehouse facility, ensuring maximum load tolerance and compliance with international standards.',
    category: 'Fabrication Works',
    image: '/images/project-fabrication.png',
    status: 'Completed',
    client: 'Logistics Hub India',
    year: '2026'
  },
  {
    id: '2',
    title: 'Manufacturing Plant Installation',
    description: 'Complete assembly, erection, and mechanical installation of multi-stage processing machinery, steel conveyor trusses, and piping networks.',
    category: 'Erection Works',
    image: '/images/project-erection.png',
    status: 'Completed',
    client: 'Vanguard Chemicals',
    year: '2026'
  },
  {
    id: '3',
    title: 'Electrical Infrastructure Upgrade',
    description: 'Design and installation of high-voltage substations, main power distribution panels, cabling tray systems, and emergency backup generators.',
    category: 'Electrical Works',
    image: '/images/project-electrical.png',
    status: 'Completed',
    client: 'Apex Automotives',
    year: '2026'
  },
  {
    id: '4',
    title: 'Healthcare Facility Development',
    description: 'Specialized installation of medical gas piping, ICU ventilation networks, sterile cleanrooms, and ceiling pendants for hospital infrastructure.',
    category: 'Medical Infrastructure',
    image: '/images/project-medical.png',
    status: 'Completed',
    client: 'Metro Care Hospital',
    year: '2026'
  },
  {
    id: '5',
    title: 'Industrial Maintenance & Overhaul',
    description: 'Turnaround maintenance, piping replacements, pump rebuilds, and structural reinforcement of processing towers during an active shutdown.',
    category: 'Industrial Maintenance',
    image: '/images/project-maintenance.png',
    status: 'Completed',
    client: 'Supreme Refineries',
    year: '2026'
  },
  {
    id: '6',
    title: 'Commercial Infrastructure Project',
    description: 'Structural column erection, steel decking installation, and perimeter safety systems setup for a modern multi-story tech park.',
    category: 'Erection Works',
    image: '/images/project-commercial.png',
    status: 'In Progress',
    client: 'Horizon Developers',
    year: '2026'
  }
];

export const CMSProvider = ({ children }) => {
  const [introState, setIntroState] = useState('playing'); // 'playing' | 'minimizing' | 'done'

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('sterling_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('sterling_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
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
