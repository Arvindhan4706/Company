"use client";

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { createService, updateService, deleteService } from '@/app/actions/admin';

export default function ServiceList({ initialServices }) {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = (service = null) => {
    setEditingService(service);
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        setServices(services.map(s => 
          s.id === editingService.id 
            ? { ...s, title: formData.get('title'), slug: formData.get('slug'), description: formData.get('description'), status: formData.get('status') }
            : s
        ));
      } else {
        await createService(formData);
        // Optimistic refresh (rely on server component to fetch true data on reload, but we update UI to avoid full page reload)
        setServices([{ 
          id: Date.now().toString(), 
          title: formData.get('title'), 
          slug: formData.get('slug'), 
          description: formData.get('description'), 
          status: formData.get('status') 
        }, ...services]);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        setServices(services.filter(s => s.id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-heading font-light text-white mb-2">Services</h2>
          <p className="text-secondary text-sm">Manage the industrial services offered by MECELFAB.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-heading tracking-widest uppercase"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="p-4 text-xs font-heading tracking-widest text-secondary uppercase">Title</th>
              <th className="p-4 text-xs font-heading tracking-widest text-secondary uppercase">Slug</th>
              <th className="p-4 text-xs font-heading tracking-widest text-secondary uppercase">Status</th>
              <th className="p-4 text-xs font-heading tracking-widest text-secondary uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-medium text-white">{service.title}</div>
                </td>
                <td className="p-4 text-sm text-secondary">{service.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    service.status === 'ACTIVE' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {service.status}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenModal(service)}
                    className="p-2 text-secondary hover:text-accent hover:bg-accent/10 rounded transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-secondary hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-secondary">
                  No services found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-heading font-light text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-secondary hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingService?.title}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      required
                      defaultValue={editingService?.slug}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    defaultValue={editingService?.description}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                      Icon Identifier
                    </label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingService?.icon || ''}
                      placeholder="e.g. Activity, Zap, Setting"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={editingService?.status || 'ACTIVE'}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="DRAFT">Draft</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-4 bg-white/[0.02]">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors text-sm font-heading tracking-widest uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="service-form"
                disabled={loading}
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-heading tracking-widest uppercase disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
