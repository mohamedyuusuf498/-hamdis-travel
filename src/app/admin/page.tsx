'use client';

import { useEffect, useState } from 'react';
import { Package, Calendar, Image, Users, TrendingUp, DollarSign, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Total Bookings', value: '248', change: '+12%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50', href: '/admin/bookings' },
  { label: 'Active Packages', value: '24', change: '+3', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50', href: '/admin/packages' },
  { label: 'Gallery Images', value: '156', change: '+8', icon: Image, color: 'text-orange-500', bg: 'bg-orange-50', href: '/admin/gallery' },
  { label: 'Newsletter Subs', value: '1,847', change: '+64', icon: Users, color: 'text-green-600', bg: 'bg-green-50', href: '/admin/newsletter' },
];

const recentBookings = [
  { ref: 'HTA-001', name: 'Sarah Johnson', destination: 'Bali, Indonesia', date: '2025-06-15', travelers: 2, status: 'CONFIRMED' },
  { ref: 'HTA-002', name: 'Michael Chen', destination: 'Santorini, Greece', date: '2025-07-01', travelers: 2, status: 'PENDING' },
  { ref: 'HTA-003', name: 'Emma Williams', destination: 'Maasai Mara, Kenya', date: '2025-08-10', travelers: 4, status: 'CONFIRMED' },
  { ref: 'HTA-004', name: 'James Rodriguez', destination: 'Tokyo, Japan', date: '2025-05-20', travelers: 1, status: 'COMPLETED' },
  { ref: 'HTA-005', name: 'Aisha Patel', destination: 'Maldives', date: '2025-09-05', travelers: 2, status: 'PENDING' },
];

const statusConfig = {
  PENDING: { label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  COMPLETED: { label: 'Completed', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
};

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{greeting}, Admin 👋</h1>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your travel agency today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/packages/new" className="btn-primary py-2.5 px-5 rounded-xl text-sm">
            + New Package
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, change, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Booking Revenue</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="flex items-end gap-3 h-40">
            {[65, 80, 45, 90, 70, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full gradient-primary rounded-t-lg transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-gray-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Pending Bookings', value: 12, color: 'bg-yellow-400' },
              { label: 'Confirmed Today', value: 5, color: 'bg-green-400' },
              { label: 'New Messages', value: 8, color: 'bg-blue-400' },
              { label: 'Pending Reviews', value: 3, color: 'bg-purple-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-blue-600 text-sm font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Booking Ref', 'Customer', 'Destination', 'Travel Date', 'Travelers', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((booking) => {
                const status = statusConfig[booking.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <tr key={booking.ref} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-blue-600">{booking.ref}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.destination}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.travelers}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
