"use client";

import { useContext, useState } from 'react';
import { CMSContext } from '../../context/CMSContext';

export default function AdminPage() {
  const { stats, updateStats } = useContext(CMSContext);
  const [formData, setFormData] = useState(stats);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStats(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>CMS Administration</h1>
        
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Update Statistics</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Projects Completed</label>
              <input type="number" name="projectsCompleted" value={formData.projectsCompleted} onChange={handleChange} className="form-control" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Industrial Clients</label>
              <input type="number" name="industrialClients" value={formData.industrialClients} onChange={handleChange} className="form-control" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Service Categories</label>
              <input type="number" name="serviceCategories" value={formData.serviceCategories} onChange={handleChange} className="form-control" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Safety Compliance (%)</label>
              <input type="number" name="safetyCompliance" value={formData.safetyCompliance} onChange={handleChange} className="form-control" max="100" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Save Changes
            </button>
            {saved && <p style={{ color: 'var(--success)', marginTop: '0.5rem', textAlign: 'center' }}>Changes saved successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
