'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PackageCard from '@/components/ui/PackageCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  price: number;
  duration: number;
  groupSize: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  description: string;
}

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages?featured=true&limit=6')
      .then((r) => r.json())
      .then((data) => {
        setPackages(data.packages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fallback static data for when DB is not connected
  const fallbackPackages: Package[] = [
    { id: '1', slug: 'bali-paradise-escape', title: 'Bali Paradise Escape', destination: 'Bali', country: 'Indonesia', price: 1299, duration: 7, groupSize: 12, rating: 4.9, reviewCount: 248, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', category: 'BEACH', featured: true, description: 'Immerse yourself in the magical island of Bali with stunning temples and pristine beaches.' },
    { id: '2', slug: 'santorini-sunset-romance', title: 'Santorini Sunset Romance', destination: 'Santorini', country: 'Greece', price: 2499, duration: 6, groupSize: 8, rating: 4.8, reviewCount: 186, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', category: 'HONEYMOON', featured: true, description: 'Experience iconic blue-domed churches and breathtaking caldera views.' },
    { id: '3', slug: 'safari-adventure-kenya', title: 'Safari Adventure Kenya', destination: 'Maasai Mara', country: 'Kenya', price: 3799, duration: 10, groupSize: 6, rating: 4.9, reviewCount: 124, imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', category: 'SAFARI', featured: true, description: 'Witness the spectacular Great Migration and encounter the Big Five.' },
    { id: '4', slug: 'tokyo-cultural-immersion', title: 'Tokyo Cultural Immersion', destination: 'Tokyo', country: 'Japan', price: 2199, duration: 8, groupSize: 10, rating: 4.7, reviewCount: 203, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', category: 'CULTURAL', featured: true, description: 'Discover the perfect blend of ancient tradition and futuristic innovation.' },
    { id: '5', slug: 'maldives-overwater-bliss', title: 'Maldives Overwater Bliss', destination: 'Maldives', country: 'Maldives', price: 4999, duration: 7, groupSize: 4, rating: 5.0, reviewCount: 89, imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', category: 'LUXURY', featured: false, description: 'Stay in a stunning overwater bungalow surrounded by crystal-clear turquoise waters.' },
    { id: '6', slug: 'patagonia-trekking-expedition', title: 'Patagonia Trekking Expedition', destination: 'Patagonia', country: 'Chile & Argentina', price: 2899, duration: 12, groupSize: 8, rating: 4.8, reviewCount: 67, imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', category: 'ADVENTURE', featured: false, description: 'Trek through dramatic landscapes of glaciers, mountains, and pristine wilderness.' },
  ];

  const displayPackages = packages.length > 0 ? packages : fallbackPackages;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Our Best Sellers"
          title="Featured Tour Packages"
          subtitle="Handpicked travel experiences designed to create memories that last a lifetime. Each package is crafted with care and attention to detail."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton h-56 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 btn-secondary px-8 py-4 rounded-xl text-base"
          >
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
