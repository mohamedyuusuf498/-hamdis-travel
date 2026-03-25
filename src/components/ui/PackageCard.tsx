'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, MapPin, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PackageCardProps {
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
  featured?: boolean;
  description?: string;
}

export default function PackageCard({
  id, slug, title, destination, country, price, duration,
  groupSize, rating, reviewCount, imageUrl, category, featured, description,
}: PackageCardProps) {
  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
      {/* Image */}
      <div className="relative h-56 img-zoom">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 overlay-dark opacity-60" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {featured && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Featured
            </span>
          )}
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {category}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4">
          <div className="glass rounded-xl px-3 py-2 text-right">
            <p className="text-white/70 text-xs">From</p>
            <p className="text-white font-bold text-lg">{formatPrice(price)}</p>
          </div>
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">{destination}, {country}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{duration} Days</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Max {groupSize}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-800">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <p className="text-blue-600 font-bold text-xl">{formatPrice(price)}</p>
          </div>
          <Link
            href={`/packages/${slug}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 group"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
