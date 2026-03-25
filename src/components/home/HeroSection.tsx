'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    title: 'Discover the World\'s',
    highlight: 'Hidden Wonders',
    subtitle: 'Embark on extraordinary journeys crafted just for you. From tropical paradises to ancient civilizations.',
    cta: 'Explore Packages',
    ctaLink: '/packages',
    badge: '⭐ #1 Rated Travel Agency',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    title: 'Luxury Beach',
    highlight: 'Escapes Await',
    subtitle: 'Sink your toes into pristine white sands and let the crystal-clear waters wash your worries away.',
    cta: 'View Beach Packages',
    ctaLink: '/packages?category=BEACH',
    badge: '🏖️ Premium Beach Resorts',
  },
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80',
    title: 'Epic Safari',
    highlight: 'Adventures',
    subtitle: 'Witness the breathtaking beauty of wildlife in their natural habitat. An experience that will stay with you forever.',
    cta: 'Book Safari Tour',
    ctaLink: '/packages?category=SAFARI',
    badge: '🦁 Wildlife Experiences',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-fade-in-down"
            >
              <span className="text-white text-sm font-medium">{slide.badge}</span>
            </div>

            {/* Title */}
            <h1
              key={`title-${current}`}
              className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {slide.title}
              <br />
              <span className="text-gradient-sunset">{slide.highlight}</span>
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="text-xl text-white/80 mb-8 max-w-xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href={slide.ctaLink} className="btn-sunset text-base px-8 py-4 rounded-xl shadow-2xl">
                {slide.cta}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 glass text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                Watch Our Story
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-white/80 text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="w-px h-5 bg-white/30" />
              <span className="text-white/80 text-sm">10,000+ Happy Travelers</span>
              <div className="w-px h-5 bg-white/30" />
              <span className="text-white/80 text-sm">50+ Destinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-medium tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
