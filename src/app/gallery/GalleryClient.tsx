'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const categories = ['All', 'BEACHES', 'CITIES', 'NATURE', 'ADVENTURE', 'CULTURE', 'FOOD'];

const images = [
  { id: '1', title: 'Bali Rice Terraces', category: 'NATURE', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: '2', title: 'Santorini Blue Domes', category: 'CITIES', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', thumb: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400' },
  { id: '3', title: 'Maldives Overwater', category: 'BEACHES', url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
  { id: '4', title: 'Kenya Safari', category: 'ADVENTURE', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', thumb: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400' },
  { id: '5', title: 'Tokyo Night Lights', category: 'CITIES', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: '6', title: 'Patagonia Mountains', category: 'NATURE', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', thumb: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400' },
  { id: '7', title: 'Paris Eiffel Tower', category: 'CITIES', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: '8', title: 'Tropical Beach Sunset', category: 'BEACHES', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
  { id: '9', title: 'Mountain Trekking', category: 'ADVENTURE', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400' },
  { id: '10', title: 'Cultural Festival', category: 'CULTURE', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', thumb: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400' },
  { id: '11', title: 'Ocean Sunrise', category: 'BEACHES', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: '12', title: 'Forest Trail', category: 'NATURE', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800', thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400' },
  { id: '13', title: 'Street Food Market', category: 'FOOD', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', thumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400' },
  { id: '14', title: 'Ancient Temple', category: 'CULTURE', url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800', thumb: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400' },
  { id: '15', title: 'Scuba Diving', category: 'ADVENTURE', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', thumb: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
  { id: '16', title: 'Desert Dunes', category: 'NATURE', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800', thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400' },
  { id: '17', title: 'New York Skyline', category: 'CITIES', url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', thumb: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
  { id: '18', title: 'Sushi Platter', category: 'FOOD', url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800', thumb: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400' },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            <Camera className="w-3.5 h-3.5 inline mr-1.5" />
            Visual Journey
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Travel Gallery</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A visual journey through the world&apos;s most breathtaking destinations. Let these images inspire your next adventure.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'All' ? 'All Photos' : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-500 whitespace-nowrap">{filtered.length} photos</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, index) => (
              <div
                key={img.id}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden img-zoom shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-sm font-semibold text-center px-2">{img.title}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {img.category.charAt(0) + img.category.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].url}
              alt={filtered[lightboxIndex].title}
              className="w-full h-full object-contain rounded-xl max-h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl p-4">
              <p className="text-white font-semibold">{filtered[lightboxIndex].title}</p>
              <p className="text-white/60 text-sm">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg px-4">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === lightboxIndex ? 'border-blue-400 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.thumb} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
