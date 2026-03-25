'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Search, ArrowRight, Globe } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const continents = ['All', 'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

const destinations = [
  { name: 'Bali', country: 'Indonesia', slug: 'bali', continent: 'Asia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', packages: 12, description: 'The Island of Gods with stunning temples, rice terraces, and pristine beaches.', bestTime: 'April - October', climate: 'Tropical' },
  { name: 'Santorini', country: 'Greece', slug: 'santorini', continent: 'Europe', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', packages: 8, description: 'Iconic blue-domed churches and breathtaking caldera views in the Aegean Sea.', bestTime: 'June - September', climate: 'Mediterranean' },
  { name: 'Maldives', country: 'Maldives', slug: 'maldives', continent: 'Asia', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', packages: 6, description: 'Crystal-clear waters, white sandy beaches, and luxurious overwater bungalows.', bestTime: 'November - April', climate: 'Tropical' },
  { name: 'Tokyo', country: 'Japan', slug: 'tokyo', continent: 'Asia', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', packages: 10, description: 'Where ancient temples coexist with futuristic skyscrapers and cutting-edge technology.', bestTime: 'March - May', climate: 'Humid subtropical' },
  { name: 'Paris', country: 'France', slug: 'paris', continent: 'Europe', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', packages: 9, description: 'The City of Light, renowned for art, fashion, gastronomy, and iconic landmarks.', bestTime: 'April - June', climate: 'Temperate' },
  { name: 'New York', country: 'USA', slug: 'new-york', continent: 'North America', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', packages: 7, description: 'The city that never sleeps, offering world-class entertainment and iconic landmarks.', bestTime: 'April - June', climate: 'Humid continental' },
  { name: 'Maasai Mara', country: 'Kenya', slug: 'maasai-mara', continent: 'Africa', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', packages: 5, description: 'Home to the Great Migration and the Big Five in their natural habitat.', bestTime: 'July - October', climate: 'Savanna' },
  { name: 'Patagonia', country: 'Chile & Argentina', slug: 'patagonia', continent: 'South America', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', packages: 4, description: 'Dramatic landscapes of glaciers, mountains, and pristine wilderness at the end of the world.', bestTime: 'November - March', climate: 'Alpine' },
  { name: 'Sydney', country: 'Australia', slug: 'sydney', continent: 'Oceania', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600', packages: 6, description: 'Iconic harbor city with world-famous Opera House, beautiful beaches, and vibrant culture.', bestTime: 'September - November', climate: 'Oceanic' },
  { name: 'Dubai', country: 'UAE', slug: 'dubai', continent: 'Asia', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', packages: 8, description: 'A city of superlatives with record-breaking architecture, luxury shopping, and desert adventures.', bestTime: 'November - March', climate: 'Desert' },
  { name: 'Rome', country: 'Italy', slug: 'rome', continent: 'Europe', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600', packages: 9, description: 'The Eternal City with ancient ruins, world-class art, and incredible cuisine.', bestTime: 'April - June', climate: 'Mediterranean' },
  { name: 'Cape Town', country: 'South Africa', slug: 'cape-town', continent: 'Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600', packages: 5, description: 'Stunning mountain backdrop, pristine beaches, and rich cultural heritage at Africa\'s southern tip.', bestTime: 'March - May', climate: 'Mediterranean' },
];

export default function DestinationsClient() {
  const [activeContinent, setActiveContinent] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = destinations.filter((d) => {
    const matchContinent = activeContinent === 'All' || d.continent === activeContinent;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchContinent && matchSearch;
  });

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" alt="Destinations" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            Explore the World
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Our Destinations
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover breathtaking destinations across every continent. Your next adventure awaits.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations..."
                className="form-input pl-10 h-11 text-sm"
              />
            </div>

            {/* Continent filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveContinent(c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeContinent === c
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <span className="text-sm text-gray-500 whitespace-nowrap">
              {filtered.length} destinations
            </span>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((dest) => (
                <div key={dest.slug} className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                  <div className="relative h-48 img-zoom">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                    <div className="absolute inset-0 overlay-dark opacity-50" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {dest.continent}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-medium">{dest.country}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{dest.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-gray-400 mb-0.5">Best Time</p>
                        <p className="font-semibold text-gray-700">{dest.bestTime}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-gray-400 mb-0.5">Climate</p>
                        <p className="font-semibold text-gray-700">{dest.climate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{dest.packages} packages</span>
                      <Link
                        href={`/packages?destination=${dest.name}`}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                      >
                        View Packages <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
