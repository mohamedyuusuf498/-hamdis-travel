import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
        alt="Travel CTA"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/70" />

      <div className="relative z-10 container-custom text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-6">
          Start Your Journey
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Explore<br />
          <span className="text-gradient-sunset">the World?</span>
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Let our travel experts craft your perfect itinerary. From budget-friendly adventures to ultra-luxury escapes, we have the perfect trip for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="btn-sunset px-10 py-4 rounded-xl text-lg font-bold shadow-2xl flex items-center gap-2"
          >
            Book Your Trip Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 glass text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            Call Us: +1 (234) 567-890
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
          {[
            '✓ Free Cancellation',
            '✓ Best Price Guarantee',
            '✓ 24/7 Support',
            '✓ Secure Payments',
          ].map((item) => (
            <span key={item} className="text-white/80 text-sm font-medium">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
