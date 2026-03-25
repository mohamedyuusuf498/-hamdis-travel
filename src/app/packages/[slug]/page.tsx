import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, MapPin, Check, X, ArrowRight, Calendar, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const packages: Record<string, any> = {
  'bali-paradise-escape': {
    id: '1', slug: 'bali-paradise-escape', title: 'Bali Paradise Escape', destination: 'Bali', country: 'Indonesia',
    price: 1299, duration: 7, groupSize: 12, rating: 4.9, reviewCount: 248,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800'],
    category: 'BEACH', featured: true,
    description: 'Immerse yourself in the magical island of Bali with its stunning temples, lush rice terraces, and pristine beaches. This 7-day journey takes you through the spiritual heart of Bali, from the sacred Tanah Lot temple to the artistic hub of Ubud.',
    highlights: ['Visit Tanah Lot Temple at sunset', 'Explore Ubud Art Market', 'Rice terrace trekking in Tegallalang', 'Traditional Balinese cooking class', 'Snorkeling at Nusa Penida'],
    includes: ['Round-trip flights', '7 nights hotel accommodation', 'Daily breakfast', 'Airport transfers', 'English-speaking guide'],
    excludes: ['Travel insurance', 'Personal expenses', 'Optional activities', 'Visa fees'],
  },
  'santorini-sunset-romance': {
    id: '2', slug: 'santorini-sunset-romance', title: 'Santorini Sunset Romance', destination: 'Santorini', country: 'Greece',
    price: 2499, duration: 6, groupSize: 8, rating: 4.8, reviewCount: 186,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200',
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800'],
    category: 'HONEYMOON', featured: true,
    description: 'Experience the iconic blue-domed churches and breathtaking caldera views of Santorini. Perfect for couples and honeymooners.',
    highlights: ['Iconic Oia sunset viewing', 'Caldera sailing cruise', 'Wine tasting at volcanic vineyards', 'Private beach access', 'Ancient Akrotiri ruins tour'],
    includes: ['Business class flights', '6 nights luxury cave hotel', 'Daily breakfast & dinner', 'Private transfers', 'Sunset cruise'],
    excludes: ['Travel insurance', 'Lunch', 'Personal shopping', 'Spa treatments'],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = packages[params.slug];
  return {
    title: pkg ? pkg.title : 'Package Not Found',
    description: pkg ? pkg.description : '',
  };
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = packages[params.slug] || packages['bali-paradise-escape'];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 h-[60vh] min-h-[500px]">
        <Image src={pkg.imageUrl} alt={pkg.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">{pkg.category}</span>
                  {pkg.featured && <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Featured</span>}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{pkg.title}</h1>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{pkg.destination}, {pkg.country}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{pkg.rating} ({pkg.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 text-right">
                <p className="text-white/70 text-sm">Starting from</p>
                <p className="text-white font-black text-3xl">{formatPrice(pkg.price)}</p>
                <p className="text-white/70 text-xs">per person</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Clock, label: 'Duration', value: `${pkg.duration} Days` },
                    { icon: Users, label: 'Group Size', value: `Max ${pkg.groupSize}` },
                    { icon: Star, label: 'Rating', value: `${pkg.rating}/5` },
                    { icon: MapPin, label: 'Destination', value: pkg.destination },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                      <Icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="font-bold text-gray-900 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About This Package</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((h: string) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" /> What&apos;s Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.includes.map((item: string) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500" /> Not Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.excludes.map((item: string) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="gradient-primary p-6 text-white">
                  <p className="text-white/80 text-sm mb-1">Package Price</p>
                  <p className="text-4xl font-black">{formatPrice(pkg.price)}</p>
                  <p className="text-white/70 text-sm">per person</p>
                </div>
                <div className="p-6 space-y-4">
                  <Link
                    href={`/booking?package=${pkg.slug}&destination=${pkg.destination}`}
                    className="btn-primary w-full justify-center py-4 rounded-xl text-base"
                  >
                    <Calendar className="w-5 h-5" />
                    Book This Package
                  </Link>
                  <Link href="/contact" className="btn-secondary w-full justify-center py-4 rounded-xl text-base">
                    Ask a Question
                  </Link>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    {[
                      { icon: Shield, text: 'Free cancellation up to 30 days' },
                      { icon: Users, text: 'Small group experience' },
                      { icon: Star, text: 'Expert local guides' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                        <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
