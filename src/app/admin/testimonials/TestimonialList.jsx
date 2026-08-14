"use client";

import { useState } from 'react';
import { Plus, Trash2, X, AlertCircle, Star } from 'lucide-react';
import { createTestimonial, deleteTestimonial } from '@/app/actions/admin';

export default function TestimonialList({ initialTestimonials }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);

    try {
      await createTestimonial(formData);
      // Optimistic
      setTestimonials([{ 
        id: Date.now().toString(), 
        clientName: formData.get('clientName'), 
        company: formData.get('company'), 
        content: formData.get('content'),
        rating: parseInt(formData.get('rating') || '5')
      }, ...testimonials]);
      handleCloseModal();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter(t => t.id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-heading font-light text-white mb-2">Testimonials</h2>
          <p className="text-secondary text-sm">Manage client reviews and feedback.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-heading tracking-widest uppercase"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-admin-surface/[0.02] border border-white/5 rounded-xl p-6 flex flex-col group relative">
            <div className="flex text-accent mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-secondary leading-relaxed mb-6 italic">"{testimonial.content}"</p>
            <div className="mt-auto">
              <h3 className="text-white font-medium">{testimonial.clientName}</h3>
              <p className="text-xs text-secondary/70 uppercase tracking-widest">{testimonial.company}</p>
            </div>
            
            <button
              onClick={() => handleDelete(testimonial.id)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Delete Testimonial"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="p-12 text-center text-secondary bg-admin-surface/[0.02] border border-white/5 rounded-xl">
          No testimonials found. Add one to get started.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-heading font-light text-white">Add Testimonial</h3>
              <button
                onClick={handleCloseModal}
                className="text-secondary hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                    Company / Designation *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                    Review Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    defaultValue="5"
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-4 bg-admin-surface/[0.02]">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 border border-white/10 text-white rounded-lg hover:bg-admin-surface/5 transition-colors text-sm font-heading tracking-widest uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="testimonial-form"
                disabled={loading}
                className="px-6 py-2 bg-admin-surface text-admin-heading rounded-lg hover:bg-gray-200 transition-colors text-sm font-heading tracking-widest uppercase disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
