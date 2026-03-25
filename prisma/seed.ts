import { PrismaClient, PackageCategory, GalleryCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@hamdis-travel.com' },
    update: {},
    create: {
      email: 'admin@hamdis-travel.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Seed Tour Packages
  const packages = [
    {
      title: 'Bali Paradise Escape',
      slug: 'bali-paradise-escape',
      destination: 'Bali',
      country: 'Indonesia',
      price: 1299,
      duration: 7,
      groupSize: 12,
      rating: 4.9,
      reviewCount: 248,
      description: 'Immerse yourself in the magical island of Bali with its stunning temples, lush rice terraces, and pristine beaches. This 7-day journey takes you through the spiritual heart of Bali, from the sacred Tanah Lot temple to the artistic hub of Ubud.',
      highlights: ['Visit Tanah Lot Temple at sunset', 'Explore Ubud Art Market', 'Rice terrace trekking in Tegallalang', 'Traditional Balinese cooking class', 'Snorkeling at Nusa Penida'],
      includes: ['Round-trip flights', '7 nights hotel accommodation', 'Daily breakfast', 'Airport transfers', 'English-speaking guide'],
      excludes: ['Travel insurance', 'Personal expenses', 'Optional activities', 'Visa fees'],
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'],
      category: PackageCategory.BEACH,
      featured: true,
    },
    {
      title: 'Santorini Sunset Romance',
      slug: 'santorini-sunset-romance',
      destination: 'Santorini',
      country: 'Greece',
      price: 2499,
      duration: 6,
      groupSize: 8,
      rating: 4.8,
      reviewCount: 186,
      description: 'Experience the iconic blue-domed churches and breathtaking caldera views of Santorini. Perfect for couples and honeymooners, this luxury escape offers the finest Greek hospitality, world-class cuisine, and unforgettable sunsets.',
      highlights: ['Iconic Oia sunset viewing', 'Caldera sailing cruise', 'Wine tasting at volcanic vineyards', 'Private beach access', 'Ancient Akrotiri ruins tour'],
      includes: ['Business class flights', '6 nights luxury cave hotel', 'Daily breakfast & dinner', 'Private transfers', 'Sunset cruise'],
      excludes: ['Travel insurance', 'Lunch', 'Personal shopping', 'Spa treatments'],
      imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800'],
      category: PackageCategory.HONEYMOON,
      featured: true,
    },
    {
      title: 'Safari Adventure Kenya',
      slug: 'safari-adventure-kenya',
      destination: 'Maasai Mara',
      country: 'Kenya',
      price: 3799,
      duration: 10,
      groupSize: 6,
      rating: 4.9,
      reviewCount: 124,
      description: 'Witness the spectacular Great Migration and encounter the Big Five in their natural habitat. This premium safari experience takes you deep into the Maasai Mara ecosystem with expert guides and luxury tented camps.',
      highlights: ['Great Migration game drives', 'Big Five wildlife spotting', 'Hot air balloon safari', 'Maasai village cultural visit', 'Bush dinner under the stars'],
      includes: ['International flights', '10 nights luxury tented camps', 'All meals', 'Game drives', 'Expert safari guide'],
      excludes: ['Travel insurance', 'Gratuities', 'Balloon safari (optional)', 'Visa fees'],
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'],
      category: PackageCategory.SAFARI,
      featured: true,
    },
    {
      title: 'Tokyo Cultural Immersion',
      slug: 'tokyo-cultural-immersion',
      destination: 'Tokyo',
      country: 'Japan',
      price: 2199,
      duration: 8,
      groupSize: 10,
      rating: 4.7,
      reviewCount: 203,
      description: 'Discover the perfect blend of ancient tradition and futuristic innovation in Japan\'s vibrant capital. From serene temples to neon-lit streets, this cultural journey offers an authentic Japanese experience.',
      highlights: ['Tsukiji Fish Market tour', 'Tea ceremony in Hamarikyu', 'Shibuya crossing experience', 'Day trip to Mount Fuji', 'Akihabara electronics district'],
      includes: ['Return flights', '8 nights boutique hotel', 'Daily breakfast', 'Bullet train passes', 'Cultural guide'],
      excludes: ['Travel insurance', 'Lunch & dinner', 'Personal expenses', 'Optional tours'],
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
      category: PackageCategory.CULTURAL,
      featured: true,
    },
    {
      title: 'Maldives Overwater Bliss',
      slug: 'maldives-overwater-bliss',
      destination: 'Maldives',
      country: 'Maldives',
      price: 4999,
      duration: 7,
      groupSize: 4,
      rating: 5.0,
      reviewCount: 89,
      description: 'Stay in a stunning overwater bungalow surrounded by crystal-clear turquoise waters. The Maldives offers unparalleled luxury, world-class diving, and absolute serenity in one of the world\'s most beautiful destinations.',
      highlights: ['Overwater bungalow stay', 'Snorkeling with manta rays', 'Sunset dolphin cruise', 'Private beach dining', 'Spa treatments over the ocean'],
      includes: ['Seaplane transfers', '7 nights overwater villa', 'All-inclusive meals', 'Water sports', 'Snorkeling equipment'],
      excludes: ['International flights', 'Travel insurance', 'Scuba diving courses', 'Premium alcohol'],
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800'],
      category: PackageCategory.LUXURY,
      featured: false,
    },
    {
      title: 'Patagonia Trekking Expedition',
      slug: 'patagonia-trekking-expedition',
      destination: 'Patagonia',
      country: 'Chile & Argentina',
      price: 2899,
      duration: 12,
      groupSize: 8,
      rating: 4.8,
      reviewCount: 67,
      description: 'Trek through the dramatic landscapes of Patagonia, home to glaciers, mountains, and pristine wilderness. This adventure expedition takes you to the iconic Torres del Paine and Perito Moreno Glacier.',
      highlights: ['Torres del Paine W Trek', 'Perito Moreno Glacier walk', 'Kayaking in fjords', 'Wildlife spotting (pumas, condors)', 'Gaucho ranch experience'],
      includes: ['Return flights', '12 nights mixed accommodation', 'All meals during trek', 'Trekking equipment', 'Expert mountain guide'],
      excludes: ['Travel insurance', 'Personal gear', 'Optional activities', 'Alcoholic beverages'],
      imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
      images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800'],
      category: PackageCategory.ADVENTURE,
      featured: false,
    },
  ];

  for (const pkg of packages) {
    await prisma.tourPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    });
  }

  // Seed Destinations
  const destinations = [
    { name: 'Bali', country: 'Indonesia', slug: 'bali', description: 'The Island of Gods, known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', featured: true, continent: 'Asia', climate: 'Tropical', bestTime: 'April to October' },
    { name: 'Paris', country: 'France', slug: 'paris', description: 'The City of Light, renowned for its art, fashion, gastronomy and culture.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', featured: true, continent: 'Europe', climate: 'Temperate', bestTime: 'April to June, September to November' },
    { name: 'Santorini', country: 'Greece', slug: 'santorini', description: 'A stunning volcanic island with iconic white-washed buildings and breathtaking caldera views.', imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', featured: true, continent: 'Europe', climate: 'Mediterranean', bestTime: 'June to September' },
    { name: 'Tokyo', country: 'Japan', slug: 'tokyo', description: 'A city where ancient temples coexist with futuristic skyscrapers and cutting-edge technology.', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', featured: true, continent: 'Asia', climate: 'Humid subtropical', bestTime: 'March to May, September to November' },
    { name: 'Maldives', country: 'Maldives', slug: 'maldives', description: 'A tropical paradise of crystal-clear waters, white sandy beaches, and luxurious overwater bungalows.', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', featured: true, continent: 'Asia', climate: 'Tropical', bestTime: 'November to April' },
    { name: 'New York', country: 'USA', slug: 'new-york', description: 'The city that never sleeps, offering world-class entertainment, dining, and iconic landmarks.', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', featured: true, continent: 'North America', climate: 'Humid continental', bestTime: 'April to June, September to November' },
  ];

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: dest,
    });
  }

  // Seed Gallery Images
  const galleryImages = [
    { title: 'Bali Rice Terraces', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', category: GalleryCategory.NATURE, featured: true },
    { title: 'Santorini Blue Domes', imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', category: GalleryCategory.CITIES, featured: true },
    { title: 'Maldives Beach', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', category: GalleryCategory.BEACHES, featured: true },
    { title: 'Kenya Safari', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', category: GalleryCategory.ADVENTURE, featured: true },
    { title: 'Tokyo Night', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', category: GalleryCategory.CITIES, featured: false },
    { title: 'Patagonia Mountains', imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', category: GalleryCategory.NATURE, featured: false },
    { title: 'Paris Eiffel Tower', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', category: GalleryCategory.CITIES, featured: false },
    { title: 'Tropical Beach', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', category: GalleryCategory.BEACHES, featured: false },
    { title: 'Mountain Adventure', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', category: GalleryCategory.ADVENTURE, featured: false },
    { title: 'Cultural Festival', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', category: GalleryCategory.CULTURE, featured: false },
    { title: 'Ocean Sunset', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', category: GalleryCategory.BEACHES, featured: false },
    { title: 'Forest Trail', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600', category: GalleryCategory.NATURE, featured: false },
  ];

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img }).catch(() => {});
  }

  // Seed Reviews
  const reviews = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', rating: 5, comment: 'Absolutely incredible experience! The Bali trip was everything I dreamed of and more. The guides were knowledgeable and the accommodations were stunning.', featured: true, approved: true },
    { name: 'Michael Chen', email: 'michael@example.com', rating: 5, comment: 'The Santorini package was perfect for our honeymoon. Every detail was taken care of. We will definitely book with Hamdi\'s Travel Agency again!', featured: true, approved: true },
    { name: 'Emma Williams', email: 'emma@example.com', rating: 5, comment: 'The Kenya safari exceeded all expectations. Seeing the Great Migration was a life-changing experience. Professional team throughout.', featured: true, approved: true },
    { name: 'James Rodriguez', email: 'james@example.com', rating: 4, comment: 'Great Tokyo tour! Very well organized with excellent local guides. The cultural experiences were authentic and memorable.', featured: true, approved: true },
    { name: 'Aisha Patel', email: 'aisha@example.com', rating: 5, comment: 'The Maldives trip was pure luxury. The overwater bungalow was breathtaking. Worth every penny for a once-in-a-lifetime experience.', featured: true, approved: true },
    { name: 'David Thompson', email: 'david@example.com', rating: 5, comment: 'Patagonia trekking was epic! The guides were experienced and the scenery was jaw-dropping. Highly recommend for adventure seekers.', featured: false, approved: true },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review }).catch(() => {});
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
