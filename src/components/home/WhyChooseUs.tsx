import { Shield, Headphones, CreditCard, Award, Globe, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure Travel',
    description: 'Your safety is our top priority. All our tours are fully insured and we work with trusted local partners worldwide.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available around the clock to assist you before, during, and after your trip.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: CreditCard,
    title: 'Best Price Guarantee',
    description: 'We offer competitive prices and a best price guarantee. Find a lower price? We\'ll match it, no questions asked.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: 'Recognized as one of the top travel agencies globally, with multiple industry awards for excellence in service.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Globe,
    title: 'Expert Local Guides',
    description: 'Our certified local guides provide authentic, immersive experiences that go beyond typical tourist attractions.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Clock,
    title: 'Flexible Booking',
    description: 'Plans change. Enjoy flexible cancellation policies and easy rebooking options for peace of mind when you travel.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Why Choose Us"
          title="The Hamdi's Travel Difference"
          subtitle="We go beyond booking trips. We create transformative travel experiences that enrich your life and broaden your horizons."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 card-hover"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
