'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
  { name: 'Sarah Johnson', role: 'Bali Trip', rating: 5, comment: 'Absolutely incredible experience! The Bali trip was everything I dreamed of and more. The guides were knowledgeable and the accommodations were stunning. Hamdi\'s Travel Agency made every moment perfect.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Michael Chen', role: 'Santorini Honeymoon', rating: 5, comment: 'The Santorini package was perfect for our honeymoon. Every detail was taken care of — from the cave hotel to the private sunset cruise. We will definitely book with Hamdi\'s Travel Agency again!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Emma Williams', role: 'Kenya Safari', rating: 5, comment: 'The Kenya safari exceeded all expectations. Seeing the Great Migration was a life-changing experience. The professional team ensured our safety and comfort throughout the entire journey.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { name: 'James Rodriguez', role: 'Tokyo Cultural Tour', rating: 4, comment: 'Great Tokyo tour! Very well organized with excellent local guides. The cultural experiences were authentic and memorable. I especially loved the tea ceremony and the day trip to Mount Fuji.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  { name: 'Aisha Patel', role: 'Maldives Luxury', rating: 5, comment: 'The Maldives trip was pure luxury. The overwater bungalow was breathtaking and the staff were incredibly attentive. Worth every penny for a once-in-a-lifetime experience.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { name: 'David Thompson', role: 'Patagonia Trek', rating: 5, comment: 'Patagonia trekking was epic! The guides were experienced and the scenery was jaw-dropping. Highly recommend for adventure seekers. The organization was flawless from start to finish.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div className="container-custom">
        <SectionHeader
          badge="Testimonials"
          title="What Our Travelers Say"
          subtitle="Don't just take our word for it. Hear from thousands of happy travelers who have experienced the magic of our tours."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-blue-300 text-xs">{t.role}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-blue-400/30" />
              </div>

              <div className="flex mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{t.comment}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-8 h-3 bg-blue-400' : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((p) => Math.min(pages - 1, p + 1))}
            disabled={current === pages - 1}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
