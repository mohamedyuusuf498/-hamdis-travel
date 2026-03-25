'use client';

import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const allBookings = [
  { id: '1', ref: 'HTA-001', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@example.com', phone: '+1-555-0101', destination: 'Bali, Indonesia', travelDate: '2025-06-15', returnDate: '2025-06-22', adults: 2, children: 0, status: 'CONFIRMED', specialRequests: 'Vegetarian meals please', createdAt: '2025-01-15' },
  { id: '2', ref: 'HTA-002', firstName: 'Michael', lastName: 'Chen', email: 'michael@example.com', phone: '+1-555-0102', destination: 'Santorini, Greece', travelDate: '2025-07-01', returnDate: '2025-07-07', adults: 2, children: 0, status: 'PENDING', specialRequests: 'Honeymoon couple', createdAt: '2025-01-16' },
  { id: '3', ref: 'HTA-003', firstName: 'Emma', lastName: 'Williams', email: 'emma@example.com', phone: '+1-555-0103', destination: 'Maasai Mara, Kenya', travelDate: '2025-08-10', returnDate: '2025-08-20', adults: 2, children: 2, status: 'CONFIRMED', specialRequests: '', createdAt: '2025-01-17' },
  { id: '4', ref: 'HTA-004', firstName: 'James', lastName: 'Rodriguez', email: 'james@example.com', phone: '+1-555-0104', destination: 'Tokyo, Japan', travelDate: '2025-05-20', returnDate: '2025-05-28', adults: 1, children: 0, status: 'COMPLETED', specialRequests: 'Wheelchair accessible', createdAt: '2025-01-10' },
  { id: '5', ref: 'HTA-005', firstName: 'Aisha', lastName: 'Patel', email: 'aisha@example.com', phone: '+1-555-0105', destination: 'Maldives', travelDate: '2025-09-05', returnDate: '2025-09-12', adults: 2, children: 0, status: 'PENDING', specialRequests: 'Overwater bungalow preferred', createdAt: '2025-01-18' },
  { id: '6', ref: 'HTA-006', firstName: 'David', lastName: 'Thompson', email: 'david@example.com', phone: '+1-555-0106', destination: 'Patagonia, Chile', travelDate: '2025-11-15', returnDate: '2025-11-27', adults: 3, children: 0, status: 'CANCELLED', specialRequests: '', createdAt: '2025-01-12' },
];

const statusConfig = {
  PENDING: { label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
  COMPLETED: { label: 'Completed', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
};

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [bookings, setBookings] = useState(allBookings);
  const [selectedBooking, setSelectedBooking] = useState<typeof allBookings[0] | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch = !search || `${b.firstName} ${b.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      b.ref.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    toast.success(`Booking status updated to ${status.toLowerCase()}`);
    if (selectedBooking?.id === id) setSelectedBooking((prev) => prev ? { ...prev, status } : null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage all customer bookings</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: bookings.length, color: 'text-gray-900', bg: 'bg-gray-50' },
          { label: 'Pending', count: bookings.filter(b => b.status === 'PENDING').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Confirmed', count: bookings.filter(b => b.status === 'CONFIRMED').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Completed', count: bookings.filter(b => b.status === 'COMPLETED').length, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-black ${color}`}>{count}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="form-input pl-9 h-10 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Ref', 'Customer', 'Destination', 'Travel Date', 'Travelers', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((booking) => {
                const status = statusConfig[booking.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-blue-600">{booking.ref}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{booking.firstName} {booking.lastName}</p>
                      <p className="text-xs text-gray-500">{booking.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.destination}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.travelDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.adults + booking.children} ({booking.adults}A{booking.children > 0 ? ` + ${booking.children}C` : ''})</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedBooking(booking)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {booking.status === 'PENDING' && (
                          <button onClick={() => updateStatus(booking.id, 'CONFIRMED')} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Confirm">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                          <button onClick={() => updateStatus(booking.id, 'CANCELLED')} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 rounded-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Booking Ref', value: selectedBooking.ref },
                  { label: 'Status', value: selectedBooking.status },
                  { label: 'Name', value: `${selectedBooking.firstName} ${selectedBooking.lastName}` },
                  { label: 'Email', value: selectedBooking.email },
                  { label: 'Phone', value: selectedBooking.phone },
                  { label: 'Destination', value: selectedBooking.destination },
                  { label: 'Travel Date', value: selectedBooking.travelDate },
                  { label: 'Return Date', value: selectedBooking.returnDate || 'N/A' },
                  { label: 'Adults', value: selectedBooking.adults.toString() },
                  { label: 'Children', value: selectedBooking.children.toString() },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{value}</p>
                  </div>
                ))}
              </div>
              {selectedBooking.specialRequests && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Special Requests</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{selectedBooking.specialRequests}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                {selectedBooking.status === 'PENDING' && (
                  <button onClick={() => updateStatus(selectedBooking.id, 'CONFIRMED')} className="btn-primary flex-1 justify-center py-3 rounded-xl text-sm">
                    Confirm Booking
                  </button>
                )}
                <button onClick={() => setSelectedBooking(null)} className="btn-secondary flex-1 justify-center py-3 rounded-xl text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
