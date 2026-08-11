"use client";
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const CMSContext = createContext();

const INITIAL_STATS = {
  projectsCompleted: 0,
  industrialClients: 0,
  serviceCategories: 8,
  safetyCompliance: 0
};

export const INITIAL_PROJECTS = [];

export const CMSProvider = ({ children }) => {
  const [introState, setIntroState] = useState('playing'); // 'playing' | 'minimizing' | 'done'

  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('MECELFAB_stats');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_STATS;
  });

  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('MECELFAB_projects');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('MECELFAB_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('MECELFAB_projects', JSON.stringify(projects));
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

