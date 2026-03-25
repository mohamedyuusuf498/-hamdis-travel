'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, Star, Clock, Users, Search, Filter } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

const packages = [
  { id: '1', slug: 'bali-paradise-escape', title: 'Bali Paradise Escape', destination: 'Bali, Indonesia', price: 1299, duration: 7, groupSize: 12, rating: 4.9, reviewCount: 248, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200', category: 'BEACH', featured: true, active: true },
  { id: '2', slug: 'santorini-sunset-romance', title: 'Santorini Sunset Romance', destination: 'Santorini, Greece', price: 2499, duration: 6, groupSize: 8, rating: 4.8, reviewCount: 186, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200', category: 'HONEYMOON', featured: true, active: true },
  { id: '3', slug: 'safari-adventure-kenya', title: 'Safari Adventure Kenya', destination: 'Maasai Mara, Kenya', price: 3799, duration: 10, groupSize: 6, rating: 4.9, reviewCount: 124, imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200', category: 'SAFARI', featured: true, active: true },
  { id: '4', slug: 'tokyo-cultural-immersion', title: 'Tokyo Cultural Immersion', destination: 'Tokyo, Japan', price: 2199, duration: 8, groupSize: 10, rating: 4.7, reviewCount: 203, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200', category: 'CULTURAL', featured: true, active: true },
  { id: '5', slug: 'maldives-overwater-bliss', title: 'Maldives Overwater Bliss', destination: 'Maldives', price: 4999, duration: 7, groupSize: 4, rating: 5.0, reviewCount: 89, imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200', category: 'LUXURY', featured: false, active: true },
];

export default function AdminPackagesPage() {
  const [search, setSearch] = useState('');
  const [pkgs, setPkgs] = useState(packages);

  const filtered = pkgs.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPkgs((prev) => prev.filter((p) => p.id !== id));
      toast.success('Package deleted successfully');
    }
  };

  const toggleFeatured = (id: string) => {
    setPkgs((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
    toast.success('Package updated');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Tour Packages</h1>
          <p className="text-gray-500 mt-1">Manage all your tour packages</p>
        </div>
        <Link href="/admin/packages/new" className="btn-primary py-2.5 px-5 rounded-xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Package
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="form-input pl-9 h-10 text-sm"
            />
          </div>
          <span className="text-sm text-gray-500">{filtered.length} packages</span>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Package', 'Destination', 'Price', 'Duration', 'Rating', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{pkg.title}</p>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{pkg.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pkg.destination}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatPrice(pkg.price)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pkg.duration} days</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{pkg.rating}</span>
                      <span className="text-xs text-gray-400">({pkg.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${pkg.active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {pkg.active ? 'Active' : 'Inactive'}
                      </span>
                      {pkg.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-500">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/packages/${pkg.slug}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/packages/${pkg.id}/edit`} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
