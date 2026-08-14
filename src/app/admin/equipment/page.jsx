import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Search, Plus, MapPin, Tag } from 'lucide-react';

export const metadata = {
  title: 'Equipment Ledger | Admin | MECELFAB',
};

export default async function EquipmentPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || '';

  const where = {};
  if (search) {
    where.OR = [
      { serialNumber: { contains: search } },
      { type: { contains: search } },
      { model: { contains: search } },
      { customer: { contactPerson: { contains: search } } },
      { customer: { companyName: { contains: search } } }
    ];
  }

  const equipmentList = await db.equipment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
      amcs: {
        include: {
          amc: true
        }
      }
    }
  });

  return (
    <div className="pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase size={24} /> Equipment Ledger
          </h1>
          <p className="text-secondary text-sm mt-1">Track customer machinery, serial numbers, and locations.</p>
        </div>
        <Link href="/admin/equipment/new" className="bg-admin-surface text-primary px-4 py-2 rounded font-medium text-sm flex items-center gap-2 hover:bg-admin-elevated transition-colors w-max">
          <Plus size={16} /> Add Equipment
        </Link>
      </div>

      <div className="bg-admin-surface/5 rounded-lg border border-white/10 shadow-lg backdrop-blur-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-white/10 bg-admin-surface/5">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                name="search"
                defaultValue={search}
                placeholder="Search by serial no, type, model, customer..." 
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-md text-white text-sm focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>
            <button type="submit" className="bg-admin-surface/10 hover:bg-admin-surface/20 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors border border-white/10">
              Search
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-admin-surface/5 text-secondary text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Equipment</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Serial Number</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">AMC Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {equipmentList.length > 0 ? equipmentList.map(eq => {
                const activeAMC = eq.amcs.find(a => a.amc.status === 'ACTIVE');
                return (
                <tr key={eq.id} className="hover:bg-admin-surface/5 transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/equipment/${eq.id}`} className="font-semibold text-white hover:text-blue-400 transition-colors">
                      {eq.type}
                    </Link>
                    <div className="text-xs text-secondary mt-1">{eq.model || 'Unknown Model'}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-300">{eq.customer.contactPerson}</div>
                    <div className="text-xs text-secondary mt-1">{eq.customer.companyName || '—'}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-mono">
                      <Tag size={14} className="text-admin-muted" />
                      {eq.serialNumber || 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin size={14} className="text-admin-muted" />
                      <span className="truncate max-w-[200px]" title={eq.location || 'Unknown'}>{eq.location || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {activeAMC ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border bg-green-100 text-green-800 border-green-200">
                        Covered
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border bg-admin-elevated text-admin-heading border-admin-border">
                        None
                      </span>
                    )}
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-secondary">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Briefcase size={32} className="text-admin-muted mb-2" />
                      <p>No equipment records found.</p>
                      <Link href="/admin/equipment/new" className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                        Add equipment to the ledger
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
