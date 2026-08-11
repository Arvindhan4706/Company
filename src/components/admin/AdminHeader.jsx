'use client';
import { useState, useRef, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader({ session, initialNotifications }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await fetch(`/api/admin/notifications/${id}/read`, { method: 'POST' });
    } catch (e) {
      // Ignore in this minimal implementation
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await fetch('/api/admin/notifications/read-all', { method: 'POST' });
    } catch (e) {}
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none rounded-full hover:bg-gray-100"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">Mark all read</button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-gray-50 ${!notif.read ? 'bg-blue-50/30' : 'bg-white'}`}>
                      <div className="flex justify-between items-start gap-4">
                        <Link 
                          href={notif.entityType === 'INQUIRY' ? `/admin/inquiries/${notif.entityId}` : '#'}
                          className="flex-1 cursor-pointer"
                          onClick={() => { if (!notif.read) markAsRead(notif.id); setShowDropdown(false); }}
                        >
                          <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                        </Link>
                        {!notif.read && (
                          <button onClick={() => markAsRead(notif.id)} className="text-gray-400 hover:text-green-600 p-1" title="Mark as read">
                            <Check size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-gray-500">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Outline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{session?.user?.name || 'Administrator'}</p>
            <p className="text-xs text-gray-500">{session?.user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
