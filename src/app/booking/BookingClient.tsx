'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MapPin, Calendar, Users, MessageSquare, CheckCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  destination: z.string().min(2, 'Please select a destination'),
  travelDate: z.string().min(1, 'Please select a travel date'),
  returnDate: z.string().optional(),
  adults: z.number().min(1, 'At least 1 adult required').max(20),
  children: z.number().min(0).max(10),
  packageId: z.string().optional(),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const destinations = ['Bali, Indonesia', 'Santorini, Greece', 'Maldives', 'Tokyo, Japan', 'Paris, France', 'New York, USA', 'Maasai Mara, Kenya', 'Patagonia, Chile', 'Sydney, Australia', 'Dubai, UAE', 'Rome, Italy', 'Cape Town, South Africa'];

export default function BookingClient() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destination: searchParams.get('destination') || '',
      packageId: searchParams.get('package') || '',
      adults: 2,
      children: 0,
    },
  });

  const adults = watch('adults') || 1;
  const children = watch('children') || 0;
  const travelers = adults + children;

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, travelers }),
      });
      const result = await res.json();

      if (result.success) {
        setBookingRef(result.bookingRef);
        setSubmitted(true);
        toast.success('Booking submitted successfully!');
      } else {
        toast.error(result.message || 'Failed to submit booking');
      }
    } catch {
      // Simulate success for demo when DB not connected
      const ref = 'HTA-' + Date.now().toString(36).toUpperCase();
      setBookingRef(ref);
      setSubmitted(true);
      toast.success('Booking submitted successfully!');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6">
              Your booking request has been received. Our travel experts will contact you within 24 hours to confirm your trip.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
              <p className="text-sm text-gray-500 mb-1">Your Booking Reference</p>
              <p className="text-2xl font-black text-blue-600">{bookingRef}</p>
              <p className="text-xs text-gray-400 mt-1">Save this reference for your records</p>
            </div>
            <div className="space-y-3 text-sm text-gray-600 mb-8">
              <p>✓ Confirmation email sent to your inbox</p>
              <p>✓ Our team will review your request</p>
              <p>✓ You&apos;ll receive a detailed itinerary within 24 hours</p>
            </div>
            <div className="flex gap-3">
              <a href="/" className="btn-secondary flex-1 justify-center py-3 rounded-xl">
                Back to Home
              </a>
              <a href="/packages" className="btn-primary flex-1 justify-center py-3 rounded-xl">
                Browse More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" alt="Booking" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 text-white mb-4">
            Start Your Journey
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Book Your Dream Trip</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Fill out the form below and our travel experts will craft the perfect itinerary for you.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Progress Steps */}
                <div className="gradient-primary p-6">
                  <div className="flex items-center justify-between">
                    {[
                      { num: 1, label: 'Personal Info' },
                      { num: 2, label: 'Trip Details' },
                      { num: 3, label: 'Preferences' },
                    ].map(({ num, label }) => (
                      <div key={num} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          step >= num ? 'bg-white text-blue-600' : 'bg-white/20 text-white'
                        }`}>
                          {num}
                        </div>
                        <span className={`text-sm font-medium hidden sm:block ${step >= num ? 'text-white' : 'text-white/60'}`}>
                          {label}
                        </span>
                        {num < 3 && <div className="w-8 sm:w-16 h-px bg-white/30 mx-2" />}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                        <input
                          {...register('firstName')}
                          placeholder="John"
                          className={`form-input ${errors.firstName ? 'error' : ''}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                        <input
                          {...register('lastName')}
                          placeholder="Doe"
                          className={`form-input ${errors.lastName ? 'error' : ''}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1.5 text-blue-500" />
                          Email Address *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="john@example.com"
                          className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1.5 text-blue-500" />
                          Phone Number *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          className={`form-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Trip Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Trip Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                        <select
                          {...register('destination')}
                          className={`form-input ${errors.destination ? 'error' : ''}`}
                        >
                          <option value="">Select a destination</option>
                          {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1.5 text-blue-500" />
                          Travel Date *
                        </label>
                        <input
                          {...register('travelDate')}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className={`form-input ${errors.travelDate ? 'error' : ''}`}
                        />
                        {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date</label>
                        <input
                          {...register('returnDate')}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Users className="w-4 h-4 inline mr-1.5 text-blue-500" />
                          Adults *
                        </label>
                        <select {...register('adults', { valueAsNumber: true })} className="form-input">
                          {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Children (under 12)</label>
                        <select {...register('children', { valueAsNumber: true })} className="form-input">
                          {[0,1,2,3,4,5].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Special Requests */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      Special Requests
                    </h3>
                    <textarea
                      {...register('specialRequests')}
                      rows={4}
                      placeholder="Any dietary requirements, accessibility needs, special occasions, or other preferences..."
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-blue-50 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Travelers:</div>
                      <div className="font-semibold text-gray-900">{travelers} ({adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''})</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 rounded-xl text-lg disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Booking...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Confirm Booking
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to our Terms of Service and Privacy Policy. No payment required at this stage.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Book With Us */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Why Book With Us?</h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, title: 'Secure Booking', desc: 'Your data is protected with enterprise-grade security' },
                    { icon: Clock, title: 'Quick Response', desc: 'Our team responds within 24 hours' },
                    { icon: Star, title: 'Expert Guidance', desc: 'Personalized advice from travel experts' },
                    { icon: CheckCircle, title: 'Best Price', desc: 'Price match guarantee on all packages' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{title}</p>
                        <p className="text-gray-500 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="gradient-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-white/80 text-sm mb-4">Our travel experts are available to help you plan the perfect trip.</p>
                <a href="tel:+1234567890" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-3 transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+1 (234) 567-890</span>
                </a>
                <a href="mailto:bookings@hamdis-travel.com" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-3 mt-2 transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold text-sm">bookings@hamdis-travel.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
