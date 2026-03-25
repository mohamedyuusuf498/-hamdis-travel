import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hamdis-travel.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const packageSlugs = [
    'bali-paradise-escape', 'santorini-sunset-romance', 'safari-adventure-kenya',
    'tokyo-cultural-immersion', 'maldives-overwater-bliss', 'patagonia-trekking-expedition',
    'paris-romantic-getaway', 'dubai-luxury-experience', 'amazon-rainforest-adventure',
  ];

  const packagePages = packageSlugs.map((slug) => ({
    url: `${baseUrl}/packages/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...packagePages];
}
