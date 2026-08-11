import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Default Super Admin
  const adminPassword = await bcrypt.hash('MECELFAB123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mecelfab.com' },
    update: {},
    create: {
      email: 'admin@mecelfab.com',
      name: 'Super Admin',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // 2. Insert Approved Services
  const servicesData = [
    {
      title: 'Industrial Erection',
      slug: 'industrial-erection',
      description: 'Industrial equipment erection, installation, alignment and commissioning support.',
      capabilities: JSON.stringify(['Equipment Erection', 'Machinery Installation', 'Structural Erection', 'Alignment']),
      status: 'ACTIVE'
    },
    {
      title: 'Industrial Fabrication',
      slug: 'industrial-fabrication',
      description: 'Industrial fabrication and custom mechanical fabrication services.',
      capabilities: JSON.stringify(['Structural Fabrication', 'Industrial Assemblies', 'Welding', 'Mechanical Fabrication']),
      status: 'ACTIVE'
    },
    {
      title: 'Hydraulic & Pneumatic System Overhauling',
      slug: 'hydraulic-pneumatic-overhauling',
      description: 'Inspection, servicing, troubleshooting and overhauling of hydraulic and pneumatic systems.',
      capabilities: JSON.stringify(['Hydraulic Systems', 'Pneumatic Systems', 'Cylinders', 'Valves']),
      status: 'ACTIVE'
    },
    {
      title: 'Industrial Generator Spare Parts',
      slug: 'generator-spare-parts',
      description: 'Supply of spare parts for industrial generators.',
      capabilities: JSON.stringify(['Engine Components', 'Filters', 'Electrical Components', 'Fuel System Components']),
      status: 'ACTIVE'
    },
    {
      title: 'AMC — Annual Maintenance Contract',
      slug: 'amc-maintenance',
      description: 'Annual maintenance and service contracts for industrial equipment/generator systems.',
      capabilities: JSON.stringify(['Preventive Maintenance', 'Scheduled Inspections', 'Breakdown Support', 'Service Visits']),
      status: 'ACTIVE'
    },
    {
      title: 'Industrial Generator Rental',
      slug: 'generator-rental',
      description: 'Industrial generator rental services for temporary power requirements.',
      capabilities: JSON.stringify(['Generator Rental', 'Temporary Power', 'Industrial Applications', 'Installation Support']),
      status: 'ACTIVE'
    },
    {
      title: 'Air Compressor Rental',
      slug: 'air-compressor-rental',
      description: 'Air compressor rental services for industrial requirements.',
      capabilities: JSON.stringify(['Compressor Rental', 'Temporary Air Requirements', 'Industrial Site Support']),
      status: 'ACTIVE'
    },
    {
      title: 'Turbocharger Services',
      slug: 'turbocharger-services',
      description: 'Turbocharger-related inspection, servicing, repair or overhauling.',
      capabilities: JSON.stringify(['Inspection', 'Servicing', 'Overhauling', 'Component Replacement']),
      status: 'ACTIVE'
    },
    // Old services to keep as DISABLED
    {
      title: 'Construction',
      slug: 'construction',
      description: 'Civil and industrial construction services.',
      capabilities: JSON.stringify(['Civil Works', 'Infrastructure']),
      status: 'DISABLED'
    },
    {
      title: 'Generator Scrap Buying',
      slug: 'generator-scrap-buying',
      description: 'Procurement of scrap and end-of-life industrial generators.',
      capabilities: JSON.stringify(['Scrap Buying', 'Dismantling']),
      status: 'DISABLED'
    }
  ];

  for (const svc of servicesData) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    });
  }
  console.log('Services seeded successfully.');

  // 3. Insert Base Stats
  const settingsData = [
    { key: 'stats_projectsCompleted', value: '0', type: 'NUMBER' },
    { key: 'stats_industrialClients', value: '0', type: 'NUMBER' },
    { key: 'stats_serviceCategories', value: '8', type: 'NUMBER' },
    { key: 'stats_safetyCompliance', value: '0', type: 'NUMBER' }
  ];

  for (const setting of settingsData) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('Settings seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
