import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Save } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Global Settings | Admin',
};

async function updateSettings(formData) {
  'use server';
  const keys = Array.from(formData.keys()).filter(k => !k.startsWith('$ACTION'));
  
  for (const key of keys) {
    const value = formData.get(key);
    await db.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value, type: 'STRING' }
    });
  }
  
  revalidatePath('/admin/settings');
  revalidatePath('/'); // Update public site
}

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  
  // Protect this specific route for SUPER_ADMIN or ADMIN only
  if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
    redirect('/admin/dashboard');
  }

  const rawSettings = await db.setting.findMany();
  const settings = rawSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure company information and global SEO parameters.</p>
      </div>

      <form action={updateSettings} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" name="companyName" defaultValue={settings.companyName || 'MECELFAB Industrial Solutions'} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" name="contactEmail" defaultValue={settings.contactEmail || 'info@mecelfab.com'} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" name="contactPhone" defaultValue={settings.contactPhone || '+91 90000 00000'} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
              <input type="text" name="location" defaultValue={settings.location || 'Chennai, Tamil Nadu'} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Social Media & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" name="socialLinkedIn" defaultValue={settings.socialLinkedIn || ''} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
              <input type="url" name="socialTwitter" defaultValue={settings.socialTwitter || ''} className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium transition-colors">
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
