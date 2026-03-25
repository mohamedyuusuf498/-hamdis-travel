import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery',
  description: "Browse our stunning travel photography gallery. Explore beautiful destinations from beaches to cities, nature to adventure.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
