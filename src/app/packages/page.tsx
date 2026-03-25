import type { Metadata } from 'next';
import { Suspense } from 'react';
import PackagesClient from './PackagesClient';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: "Browse our complete collection of tour packages. From luxury escapes to adventure tours, find the perfect travel package for your dream vacation.",
};

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PackagesClient />
    </Suspense>
  );
}
