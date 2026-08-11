import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { updateStats } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export const metadata = {
  title: 'Admin Dashboard | MECELFAB',
};

export default async function AdminDashboardPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  // Fetch stats from db
  const settings = await db.setting.findMany({
    where: { key: { startsWith: 'stats_' } }
  });

  const stats = {
    projectsCompleted: settings.find(s => s.key === 'stats_projectsCompleted')?.value || '0',
    industrialClients: settings.find(s => s.key === 'stats_industrialClients')?.value || '0',
    serviceCategories: settings.find(s => s.key === 'stats_serviceCategories')?.value || '8',
    safetyCompliance: settings.find(s => s.key === 'stats_safetyCompliance')?.value || '0',
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-light text-white mb-2">CMS Administration</h1>
          <p className="text-secondary text-sm">Welcome back, Administrator</p>
        </div>
        
        <form action={logout}>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors text-sm font-heading tracking-widest uppercase">
            <LogOut size={16} />
            Logout
          </button>
        </form>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-lg max-w-2xl">
        <h2 className="text-xl font-heading font-light text-white mb-6 border-b border-white/10 pb-4">
          Update Statistics
        </h2>
        
        <form action={updateStats} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                Projects Completed
              </label>
              <input 
                type="number" 
                name="projectsCompleted" 
                defaultValue={stats.projectsCompleted} 
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                Industrial Clients
              </label>
              <input 
                type="number" 
                name="industrialClients" 
                defaultValue={stats.industrialClients} 
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                Service Categories
              </label>
              <input 
                type="number" 
                name="serviceCategories" 
                defaultValue={stats.serviceCategories} 
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-heading tracking-widest text-secondary uppercase mb-2">
                Safety Compliance (%)
              </label>
              <input 
                type="number" 
                name="safetyCompliance" 
                defaultValue={stats.safetyCompliance} 
                max="100"
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button type="submit" className="bg-white text-black font-heading tracking-widest uppercase text-sm px-8 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors duration-300">
              Save Changes
            </button>
            <p className="text-xs text-secondary italic">Changes will reflect instantly on the public site.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
