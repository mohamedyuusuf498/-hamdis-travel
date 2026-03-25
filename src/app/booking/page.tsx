import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book Your Trip',
  description: "Book your dream vacation with Hamdi's Travel Agency. Fill out our simple booking form and our travel experts will get back to you within 24 hours.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingClient />
    </Suspense>
  );
}
