import "dotenv/config";
import { PrismaClient, PackageCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

// 🔍 Simple check for the variable
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is not defined!");
  process.exit(1);
}

// 🛠️ FIX: Simply initialize PrismaClient. 
// It automatically finds DATABASE_URL from your Vercel/local environment.
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');
  
  // 1. Create/Update Admin
  const adminEmail = "muxamadyoosof@gmail.com";
  const hashedPassword = await bcrypt.hash('Amoha123@', 12);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      name: 'Muxamad Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // 2. Seed Packages
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
      description: 'Stunning temples and pristine beaches.',
      highlights: ['Visit Tanah Lot'],
      includes: ['Flights', 'Hotel'],
      excludes: ['Insurance'],
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'],
      category: PackageCategory.BEACH,
      featured: true,
    }
  ];

  for (const pkg of packages) {
    await prisma.tourPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });