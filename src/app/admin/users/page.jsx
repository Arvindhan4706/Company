import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';

export const metadata = {
  title: 'User Management | Admin',
};

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  // Protect this specific route for SUPER_ADMIN or ADMIN only
  if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
    redirect('/admin/dashboard');
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Access Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage admin roles and portal access.</p>
        </div>
        <Link href="/admin/users/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          New User
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name / Email</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'Admin User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-max ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'SUPER_ADMIN' && <Shield size={12} />}
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-right">
                  {session.user.email !== user.email && (
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Edit size={16} />
                      </Link>
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                  {session.user.email === user.email && (
                    <span className="text-xs text-gray-400 italic">Current User</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
