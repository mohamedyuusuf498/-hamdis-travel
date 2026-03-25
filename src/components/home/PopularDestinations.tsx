'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const destinations = [
  { name: 'Bali', country: 'Indonesia', slug: 'bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', packages: 12, size: 'large' },
  { name: 'Santorini', country: 'Greece', slug: 'santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', packages: 8, size: 'small' },
  { name: 'Maldives', country: 'Maldives', slug: 'maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', packages: 6, size: 'small' },
  { name: 'Tokyo', country: 'Japan', slug: 'tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', packages: 10, size: 'medium' },
  { name: 'Paris', country: 'France', slug: 'paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', packages: 9, size: 'medium' },
  { name: 'New York', country: 'USA', slug: 'new-york', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', packages: 7, size: 'small' },
];

export default function PopularDestinations() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="container-custom">
        <SectionHeader
          badge="Top Destinations"
          title="Popular Destinations"
          subtitle="Explore the world's most sought-after travel destinations, each offering unique experiences and unforgettable memories."
        />

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {destinations.map((dest, i) => {
            const isLarge = i === 0;
            const isMedium = i === 3 || i === 4;

            return (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className={`relative rounded-2xl overflow-hidden img-zoom group cursor-pointer ${
                  isLarge ? 'row-span-2 col-span-2 lg:col-span-1 lg:row-span-2' : ''
                } ${isMedium ? 'col-span-1' : ''}`}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-white/80" />
                    <span className="text-white/80 text-xs">{dest.country}</span>
                  </div>
                  <h3 className={`font-bold text-white ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                    {dest.name}
                  </h3>
                  <p className="text-white/70 text-xs mt-1">{dest.packages} packages available</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-white font-semibold text-sm">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/destinations" className="inline-flex items-center gap-2 btn-primary px-8 py-4 rounded-xl text-base">
            Explore All Destinations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
