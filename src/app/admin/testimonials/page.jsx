import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TestimonialList from './TestimonialList';

export const metadata = {
  title: 'Manage Testimonials | Admin | MECELFAB',
};

export default async function TestimonialsAdminPage() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    redirect('/admin/login');
  }

  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <TestimonialList initialTestimonials={testimonials} />
    </div>
  );
}
