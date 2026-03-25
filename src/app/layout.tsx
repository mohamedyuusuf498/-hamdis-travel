import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: "Hamdi's Travel Agency | Discover the World", template: "%s | Hamdi's Travel Agency" },
  description: "Hamdi's Travel Agency offers premium travel packages, tours, and vacation experiences to the world's most breathtaking destinations.",
  keywords: ['travel agency', 'tour packages', 'vacation', 'holiday', 'travel deals', 'international travel', 'luxury travel'],
  openGraph: {
    type: 'website',
    siteName: "Hamdi's Travel Agency",
    title: "Hamdi's Travel Agency | Discover the World",
    description: "Premium travel packages and tours to the world's most breathtaking destinations.",
    images: [{ url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hamdi's Travel Agency | Discover the World",
    description: "Premium travel packages and tours to the world's most breathtaking destinations.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body className={inter.className}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1a1a2e', color: '#fff', borderRadius: '12px', padding: '12px 16px', fontSize: '14px' },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
