// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  // 1. Clear existing data to prevent conflicts during seed
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.part.deleteMany();
  await prisma.serviceReport.deleteMany();
  await prisma.serviceVisit.deleteMany();
  await prisma.aMCEquipment.deleteMany();
  await prisma.aMC.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.inquiryNote.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.document.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  // Don't delete all users in case they have actual accounts, just clean up demo ones.
  await prisma.user.deleteMany({ where: { email: { in: ['admin@mecelfab.com', 'tech@mecelfab.com'] } } });

  // 2. Users
  const passwordHash = await bcrypt.hash('admin', 10);
  
  let superAdmin = await prisma.user.findUnique({ where: { email: 'admin@mecelfab.com' } });
  if (!superAdmin) {
    superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@mecelfab.com',
        password: passwordHash,
        role: 'SUPER_ADMIN'
      }
    });
  }

  const technician = await prisma.user.create({
    data: {
      name: 'Demo Technician',
      email: 'tech@mecelfab.com',
      password: passwordHash,
      role: 'TECHNICIAN'
    }
  });

  // 3. Services (Confirmed 8 Services)
  const services = [
    { title: 'Industrial Erection', slug: 'industrial-erection', description: 'Expert erection of heavy industrial machinery.' },
    { title: 'Industrial Fabrication', slug: 'industrial-fabrication', description: 'Precision metal fabrication for industrial needs.' },
    { title: 'Hydraulic and Pneumatic System Overhauling', slug: 'hydraulic-pneumatic-overhauling', description: 'Complete system diagnostics and overhauling.' },
    { title: 'Industrial Generator Spare Parts', slug: 'generator-spare-parts', description: 'Genuine spare parts for industrial generators.' },
    { title: 'Annual Maintenance Contract (AMC)', slug: 'amc', description: 'Comprehensive annual maintenance services.' },
    { title: 'Industrial Generator Rental', slug: 'generator-rental', description: 'Reliable industrial generators for rent.' },
    { title: 'Air Compressor Rental', slug: 'air-compressor-rental', description: 'High-capacity air compressors for rent.' },
    { title: 'Turbocharger Services', slug: 'turbocharger-services', description: 'Repair and maintenance of industrial turbochargers.' }
  ];

  for (const s of services) {
    await prisma.service.create({
      data: {
        ...s,
        status: 'ACTIVE'
      }
    });
  }

  // 4. Customers
  const customer1 = await prisma.customer.create({
    data: {
      companyName: 'Acme Heavy Industries',
      contactPerson: 'John Smith',
      email: 'john@acmeheavy.demo',
      phone: '+1 555-0100',
      location: 'Industrial Park A',
      industry: 'Manufacturing'
    }
  });

  // 5. Inquiries
  const inquiry1 = await prisma.inquiry.create({
    data: {
      referenceNumber: 'MEC-REQ-2026-0001',
      name: 'John Smith',
      email: 'john@acmeheavy.demo',
      company: 'Acme Heavy Industries',
      service: 'Industrial Erection',
      message: 'Looking for a quote on erecting a new 500-ton press machine.',
      status: 'QUOTATION',
      priority: 'HIGH',
      customerId: customer1.id,
      assignedToId: superAdmin.id
    }
  });

  // 6. Quotation
  const quote1 = await prisma.quotation.create({
    data: {
      quotationNumber: 'MEC-QTN-2026-0001',
      inquiryId: inquiry1.id,
      customerId: customer1.id,
      customerName: customer1.contactPerson,
      companyName: customer1.companyName,
      email: customer1.email,
      phone: customer1.phone,
      service: 'Industrial Erection',
      scopeOfWork: 'Erection and commissioning of 500-ton mechanical press.',
      subtotal: 50000,
      taxRate: 18,
      taxAmount: 9000,
      grandTotal: 59000,
      status: 'ACCEPTED',
      createdBy: superAdmin.id,
      items: {
        create: [
          { description: 'Equipment mobilization and crane rental', quantity: 1, unitPrice: 15000, totalPrice: 15000 },
          { description: 'Erection labor and engineering', quantity: 1, unitPrice: 35000, totalPrice: 35000 }
        ]
      }
    }
  });

  // 7. Work Order
  const wo1 = await prisma.workOrder.create({
    data: {
      workOrderNumber: 'MEC-WO-2026-0001',
      quotationId: quote1.id,
      customerId: customer1.id,
      status: 'SCHEDULED',
      scheduledDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      assignedToId: technician.id
    }
  });

  // 8. Equipment
  const eq1 = await prisma.equipment.create({
    data: {
      customerId: customer1.id,
      type: 'Industrial Generator',
      manufacturer: 'Cummins',
      model: 'QSK60',
      serialNumber: 'SN-998877',
      location: 'Main Plant'
    }
  });

  // 9. AMC
  const amc1 = await prisma.aMC.create({
    data: {
      amcNumber: 'MEC-AMC-2026-0001',
      customerId: customer1.id,
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year
      frequency: 'QUARTERLY',
      status: 'ACTIVE',
      equipment: {
        create: {
          equipmentId: eq1.id
        }
      }
    }
  });

  console.log('Demo data seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
