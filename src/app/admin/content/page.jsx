import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ContentEditor from '@/components/admin/ContentEditor';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Content Management | Admin',
};

async function saveContentAction(formData) {
  'use server';
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
    throw new Error('Unauthorized');
  }

  const { homepage, about, contact } = formData;

  const upsertSetting = async (key, value) => {
    await db.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  };

  await upsertSetting('CONTENT_HOMEPAGE', homepage);
  await upsertSetting('CONTENT_ABOUT', about);
  await upsertSetting('CONTENT_CONTACT', contact);

  // Log activity
  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (user) {
    await db.activityLog.create({
      data: {
        action: 'CONTENT_PUBLISHED',
        entity: 'SETTING',
        userId: user.id,
        details: 'Updated global site content (Homepage, About, Contact)'
      }
    });
  }

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/admin/content');
}

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
    redirect('/admin/dashboard');
  }

  const settings = await db.setting.findMany({
    where: {
      key: {
        in: ['CONTENT_HOMEPAGE', 'CONTENT_ABOUT', 'CONTENT_CONTACT']
      }
    }
  });

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-admin-heading">Content Management</h1>
        <p className="text-admin-muted text-sm mt-1">Manage static page content like the Homepage hero, About Us text, and global Contact information.</p>
      </div>

      <ContentEditor initialSettings={settings} saveContentAction={saveContentAction} />
    </div>
  );
}
