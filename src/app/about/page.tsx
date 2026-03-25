import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Globe, Heart, ArrowRight, CheckCircle, Star } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about Hamdi's Travel Agency - our story, mission, values, and the passionate team behind your unforgettable travel experiences.",
};

const team = [
  { name: 'Hamdi Al-Rashid', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', bio: '20+ years in the travel industry with a passion for creating extraordinary experiences.' },
  { name: 'Sarah Mitchell', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', bio: 'Expert in logistics and customer experience with 15 years of travel management.' },
  { name: 'Carlos Rivera', role: 'Lead Travel Expert', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300', bio: 'Specialist in adventure and cultural tours across 60+ countries.' },
  { name: 'Aisha Patel', role: 'Luxury Travel Specialist', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', bio: 'Curates premium experiences for discerning travelers seeking the finest in luxury travel.' },
];

const milestones = [
  { year: '2009', event: 'Hamdi\'s Travel Agency founded in New York City' },
  { year: '2012', event: 'Expanded to 20 international destinations' },
  { year: '2015', event: 'Won "Best Travel Agency" award from Travel Weekly' },
  { year: '2018', event: 'Reached 5,000 satisfied customers milestone' },
  { year: '2021', event: 'Launched digital booking platform' },
  { year: '2024', event: 'Serving 10,000+ travelers across 50+ destinations' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80" alt="About Us" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">About Hamdi&apos;s Travel</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            15 years of crafting extraordinary travel experiences that transform lives and create lasting memories.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4">
                Our Mission
              </span>
              <h2 className="section-title mb-6">
                We Don&apos;t Just Plan Trips.<br />
                <span className="text-gradient">We Create Memories.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2009 by Hamdi Al-Rashid, our agency was born from a simple belief: that travel has the power to transform lives. What started as a small boutique agency in New York has grown into a globally recognized travel company serving thousands of adventurers each year.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We believe that every journey should be more than just a vacation — it should be a life-changing experience that broadens your perspective, connects you with new cultures, and creates stories worth telling for a lifetime.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, value: '10,000+', label: 'Happy Travelers' },
                  { icon: Globe, value: '50+', label: 'Destinations' },
                  { icon: Award, value: '15+', label: 'Industry Awards' },
                  { icon: Star, value: '4.9/5', label: 'Average Rating' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-black text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800" alt="Our Story" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  <span className="font-bold text-gray-900">Passion-Driven</span>
                </div>
                <p className="text-gray-500 text-sm">Every trip is crafted with genuine passion and attention to detail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            badge="Our Values"
            title="What We Stand For"
            subtitle="Our core values guide everything we do, from the packages we design to the way we treat every single traveler."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authenticity', desc: 'We create genuine, immersive experiences that go beyond tourist traps to reveal the true heart of each destination.', color: 'bg-blue-50', textColor: 'text-blue-600' },
              { title: 'Excellence', desc: 'We hold ourselves to the highest standards in every aspect of our service, from initial consultation to final departure.', color: 'bg-purple-50', textColor: 'text-purple-600' },
              { title: 'Sustainability', desc: 'We are committed to responsible travel that respects local cultures, supports communities, and protects the environment.', color: 'bg-green-50', textColor: 'text-green-600' },
            ].map(({ title, desc, color, textColor }) => (
              <div key={title} className={`${color} rounded-2xl p-8 text-center`}>
                <div className={`text-4xl font-black ${textColor} mb-4`}>{title[0]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Meet the Team"
            title="The People Behind Your Adventures"
            subtitle="Our passionate team of travel experts brings decades of combined experience to ensure your journey is nothing short of extraordinary."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group text-center card-hover bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-400 transition-colors duration-300">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <div className="container-custom">
          <SectionHeader
            badge="Our Journey"
            title="15 Years of Excellence"
            subtitle="From a small boutique agency to an internationally recognized travel company."
            light
          />
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex items-start gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-sm">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-8 bg-white/20 mt-2" />}
                </div>
                <div className="flex items-center gap-3 pt-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-white/80 text-base">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Start Your Adventure?</h2>
          <p className="section-subtitle mb-8">
            Join thousands of happy travelers who have trusted Hamdi&apos;s Travel Agency to create their perfect journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="btn-primary px-8 py-4 rounded-xl text-base flex items-center gap-2">
              Explore Packages <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary px-8 py-4 rounded-xl text-base">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
