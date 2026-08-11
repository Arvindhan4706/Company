import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Helper to check admin access
async function checkAdmin() {
  const hasSession = cookies().has('admin_session');
  if (!hasSession) {
    throw new Error('Unauthorized');
  }
  return true;
}

// ----------------------------------------------------------------------
// Settings (Stats) Actions
// ----------------------------------------------------------------------
export async function updateStats(formData) {
  await checkAdmin();
  const keys = ['projectsCompleted', 'industrialClients', 'serviceCategories', 'safetyCompliance'];
  
  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) {
      await db.setting.upsert({
        where: { key: `stats_${key}` },
        update: { value: value.toString() },
        create: { key: `stats_${key}`, value: value.toString(), type: 'NUMBER' }
      });
    }
  }
  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // Revalidate public homepage where stats are shown
  return { success: true };
}

// ----------------------------------------------------------------------
// Projects Actions
// ----------------------------------------------------------------------
export async function createProject(formData) {
  await checkAdmin();
  
  const title = formData.get('title');
  const slug = formData.get('slug');
  const description = formData.get('description');
  const category = formData.get('category');
  const status = formData.get('status') || 'Completed';
  const client = formData.get('client');
  const year = formData.get('year');
  const image = formData.get('image');
  
  await db.project.create({
    data: { title, slug, description, category, status, client, year, image }
  });
  
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true };
}

export async function updateProject(id, formData) {
  await checkAdmin();
  
  const title = formData.get('title');
  const slug = formData.get('slug');
  const description = formData.get('description');
  const category = formData.get('category');
  const status = formData.get('status') || 'Completed';
  const client = formData.get('client');
  const year = formData.get('year');
  const image = formData.get('image');
  
  await db.project.update({
    where: { id },
    data: { title, slug, description, category, status, client, year, image }
  });
  
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true };
}

export async function deleteProject(id) {
  await checkAdmin();
  await db.project.delete({ where: { id } });
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true };
}

// ----------------------------------------------------------------------
// Services Actions
// ----------------------------------------------------------------------
export async function createService(formData) {
  await checkAdmin();
  
  const title = formData.get('title');
  const slug = formData.get('slug');
  const description = formData.get('description');
  const icon = formData.get('icon');
  const status = formData.get('status') || 'ACTIVE';
  
  await db.service.create({
    data: { title, slug, description, icon, status }
  });
  
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/contact');
  return { success: true };
}

export async function updateService(id, formData) {
  await checkAdmin();
  
  const title = formData.get('title');
  const slug = formData.get('slug');
  const description = formData.get('description');
  const icon = formData.get('icon');
  const status = formData.get('status') || 'ACTIVE';
  
  await db.service.update({
    where: { id },
    data: { title, slug, description, icon, status }
  });
  
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/contact');
  return { success: true };
}

export async function deleteService(id) {
  await checkAdmin();
  await db.service.delete({ where: { id } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/contact');
  return { success: true };
}

// ----------------------------------------------------------------------
// Users Actions
// ----------------------------------------------------------------------
export async function getUsers() {
  await checkAdmin();
  return await db.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
}

export async function deleteUser(id) {
  await checkAdmin();
  await db.user.delete({ where: { id } });
  revalidatePath('/admin/users');
  return { success: true };
}

// ----------------------------------------------------------------------
// Inquiry Actions
// ----------------------------------------------------------------------
export async function updateInquiryStatus(id, status) {
  await checkAdmin();
  await db.inquiry.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/admin/inquiries');
  return { success: true };
}

export async function deleteInquiry(id) {
  await checkAdmin();
  await db.inquiry.delete({ where: { id } });
  revalidatePath('/admin/inquiries');
  return { success: true };
}

// ----------------------------------------------------------------------
// Client Actions
// ----------------------------------------------------------------------
export async function createClient(formData) {
  await checkAdmin();
  const name = formData.get('name');
  const logo = formData.get('logo');
  const sector = formData.get('sector');
  await db.client.create({ data: { name, logo, sector } });
  revalidatePath('/admin/clients');
  revalidatePath('/'); // Trust section
  return { success: true };
}

export async function deleteClient(id) {
  await checkAdmin();
  await db.client.delete({ where: { id } });
  revalidatePath('/admin/clients');
  revalidatePath('/');
  return { success: true };
}

// ----------------------------------------------------------------------
// Testimonial Actions
// ----------------------------------------------------------------------
export async function createTestimonial(formData) {
  await checkAdmin();
  const clientName = formData.get('clientName');
  const company = formData.get('company');
  const content = formData.get('content');
  const rating = parseInt(formData.get('rating') || '5');
  await db.testimonial.create({ data: { clientName, company, content, rating } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/'); 
  return { success: true };
}

export async function deleteTestimonial(id) {
  await checkAdmin();
  await db.testimonial.delete({ where: { id } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}
