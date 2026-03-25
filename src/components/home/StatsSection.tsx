'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Globe, Award, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Travelers', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Globe, value: 50, suffix: '+', label: 'Destinations', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Average Rating', color: 'text-orange-500', bg: 'bg-orange-50' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

function StatItem({ icon: Icon, value, suffix, label, color, bg }: typeof stats[0]) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div className="text-4xl font-black text-gray-900 mb-1">
        {value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-500 font-medium">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
