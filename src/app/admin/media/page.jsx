import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MediaLibrary from './MediaLibrary';

export const metadata = {
  title: 'Media Library | Admin | MECELFAB',
};

export default async function MediaAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const mediaFiles = await db.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light text-white mb-2">Media Library</h1>
        <p className="text-secondary text-sm">Upload and manage images and PDF documents for your projects and services.</p>
      </div>

      <MediaLibrary initialMedia={mediaFiles} />
    </div>
  );
}
