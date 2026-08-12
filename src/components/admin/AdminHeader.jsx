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
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2 text-secondary hover:text-white transition-colors focus:outline-none rounded-full hover:bg-white/10"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-primary"></span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-md shadow-2xl border border-white/10 overflow-hidden">
              <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-semibold text-white text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs text-accent-blue hover:text-blue-400 transition-colors font-medium">Mark all read</button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/10 transition-colors ${!notif.read ? 'bg-white/5' : 'bg-transparent'}`}>
                      <div className="flex justify-between items-start gap-4">
                        <Link 
                          href={notif.entityType === 'INQUIRY' ? `/admin/inquiries/${notif.entityId}` : '#'}
                          className="flex-1 cursor-pointer"
                          onClick={() => { if (!notif.read) markAsRead(notif.id); setShowDropdown(false); }}
                        >
                          <p className={`text-sm ${!notif.read ? 'font-semibold text-white' : 'font-medium text-secondary'}`}>{notif.title}</p>
                          <p className="text-xs text-secondary/80 mt-1">{notif.message}</p>
                          <p className="text-[10px] text-secondary/60 mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                        </Link>
                        {!notif.read && (
                          <button onClick={() => markAsRead(notif.id)} className="text-secondary/50 hover:text-green-400 p-1 transition-colors" title="Mark as read">
                            <Check size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-secondary">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Outline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(30,58,138,0.5)] border border-white/10">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">{session?.user?.name || 'Administrator'}</p>
            <p className="text-xs text-secondary">{session?.user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
