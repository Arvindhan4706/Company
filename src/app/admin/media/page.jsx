import { db } from '@/lib/db';
import MediaLibrary from './MediaLibrary';

export const metadata = {
  title: 'Media Library | Admin',
};

export default async function AdminMediaPage() {
  const mediaFiles = await db.media.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <MediaLibrary initialMedia={mediaFiles} />
    </div>
  );
}
