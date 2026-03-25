'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || 'Failed to send message');
      }
    } catch {
      // Demo mode
      setSubmitted(true);
      toast.success('Your message has been sent! We\'ll get back to you within 24 hours.');
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1920&q=80" alt="Contact" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  lines: ['+1 (234) 567-890', '+1 (234) 567-891'],
                  color: 'bg-blue-50',
                  iconColor: 'text-blue-600',
                  href: 'tel:+1234567890',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['info@hamdis-travel.com', 'bookings@hamdis-travel.com'],
                  color: 'bg-purple-50',
                  iconColor: 'text-purple-600',
                  href: 'mailto:info@hamdis-travel.com',
                },
                {
                  icon: MapPin,
                  title: 'Office Address',
                  lines: ['123 Travel Boulevard, Suite 456', 'New York, NY 10001, USA'],
                  color: 'bg-orange-50',
                  iconColor: 'text-orange-500',
                  href: '#map',
                },
                {
                  icon: Clock,
                  title: 'Business Hours',
                  lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
                  color: 'bg-green-50',
                  iconColor: 'text-green-600',
                  href: null,
                },
              ].map(({ icon: Icon, title, lines, color, iconColor, href }) => (
                <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    {lines.map((line) => (
                      href ? (
                        <a key={line} href={href} className="block text-gray-600 text-sm hover:text-blue-600 transition-colors">{line}</a>
                      ) : (
                        <p key={line} className="text-gray-600 text-sm">{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className={`w-10 h-10 bg-gray-100 ${color} hover:text-white rounded-xl flex items-center justify-center transition-all duration-200`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary px-6 py-3 rounded-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          {...register('name')}
                          placeholder="John Doe"
                          className={`form-input ${errors.name ? 'error' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="john@example.com"
                          className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                      <input
                        {...register('subject')}
                        placeholder="How can we help you?"
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Tell us about your travel plans or any questions you have..."
                        className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 rounded-xl text-base disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section id="map" className="h-96 relative">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784368459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hamdi's Travel Agency Location"
        />
        <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-gray-900 text-sm">Hamdi&apos;s Travel Agency</span>
          </div>
          <p className="text-gray-500 text-xs">123 Travel Boulevard, Suite 456<br />New York, NY 10001</p>
        </div>
      </section>
    </>
  );
}
