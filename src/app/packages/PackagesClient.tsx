'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Search, SlidersHorizontal, Package } from 'lucide-react';
import PackageCard from '@/components/ui/PackageCard';

const categories = ['All', 'ADVENTURE', 'BEACH', 'CULTURAL', 'LUXURY', 'FAMILY', 'HONEYMOON', 'SAFARI', 'CRUISE'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Duration', 'Rating'];

const allPackages = [
  { id: '1', slug: 'bali-paradise-escape', title: 'Bali Paradise Escape', destination: 'Bali', country: 'Indonesia', price: 1299, duration: 7, groupSize: 12, rating: 4.9, reviewCount: 248, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', category: 'BEACH', featured: true, description: 'Immerse yourself in the magical island of Bali with stunning temples and pristine beaches.' },
  { id: '2', slug: 'santorini-sunset-romance', title: 'Santorini Sunset Romance', destination: 'Santorini', country: 'Greece', price: 2499, duration: 6, groupSize: 8, rating: 4.8, reviewCount: 186, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', category: 'HONEYMOON', featured: true, description: 'Experience iconic blue-domed churches and breathtaking caldera views.' },
  { id: '3', slug: 'safari-adventure-kenya', title: 'Safari Adventure Kenya', destination: 'Maasai Mara', country: 'Kenya', price: 3799, duration: 10, groupSize: 6, rating: 4.9, reviewCount: 124, imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', category: 'SAFARI', featured: true, description: 'Witness the spectacular Great Migration and encounter the Big Five.' },
  { id: '4', slug: 'tokyo-cultural-immersion', title: 'Tokyo Cultural Immersion', destination: 'Tokyo', country: 'Japan', price: 2199, duration: 8, groupSize: 10, rating: 4.7, reviewCount: 203, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', category: 'CULTURAL', featured: true, description: 'Discover the perfect blend of ancient tradition and futuristic innovation.' },
  { id: '5', slug: 'maldives-overwater-bliss', title: 'Maldives Overwater Bliss', destination: 'Maldives', country: 'Maldives', price: 4999, duration: 7, groupSize: 4, rating: 5.0, reviewCount: 89, imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', category: 'LUXURY', featured: false, description: 'Stay in a stunning overwater bungalow surrounded by crystal-clear turquoise waters.' },
  { id: '6', slug: 'patagonia-trekking-expedition', title: 'Patagonia Trekking Expedition', destination: 'Patagonia', country: 'Chile & Argentina', price: 2899, duration: 12, groupSize: 8, rating: 4.8, reviewCount: 67, imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', category: 'ADVENTURE', featured: false, description: 'Trek through dramatic landscapes of glaciers, mountains, and pristine wilderness.' },
  { id: '7', slug: 'paris-romantic-getaway', title: 'Paris Romantic Getaway', destination: 'Paris', country: 'France', price: 1899, duration: 5, groupSize: 2, rating: 4.7, reviewCount: 312, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', category: 'HONEYMOON', featured: false, description: 'Fall in love with the City of Light on this romantic Parisian escape.' },
  { id: '8', slug: 'dubai-luxury-experience', title: 'Dubai Luxury Experience', destination: 'Dubai', country: 'UAE', price: 3299, duration: 6, groupSize: 8, rating: 4.6, reviewCount: 145, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', category: 'LUXURY', featured: false, description: 'Experience the pinnacle of luxury in the world\'s most glamorous city.' },
  { id: '9', slug: 'amazon-rainforest-adventure', title: 'Amazon Rainforest Adventure', destination: 'Amazon', country: 'Brazil', price: 2599, duration: 9, groupSize: 8, rating: 4.8, reviewCount: 78, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', category: 'ADVENTURE', featured: false, description: 'Explore the world\'s largest rainforest and discover incredible biodiversity.' },
];

export default function PackagesClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState(searchParams.get('destination') || '');
  const [sort, setSort] = useState('Featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  let filtered = allPackages.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCat && matchSearch && matchPrice;
  });

  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'Duration') filtered = [...filtered].sort((a, b) => a.duration - b.duration);
  else if (sort === 'Rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80" alt="Packages" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            Curated Experiences
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Tour Packages</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover our handcrafted tour packages designed to create unforgettable memories.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages..."
                className="form-input pl-9 h-10 text-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="form-input h-10 text-sm w-44"
              >
                {sortOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span className="text-sm text-gray-500 whitespace-nowrap">{filtered.length} results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">No packages found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
