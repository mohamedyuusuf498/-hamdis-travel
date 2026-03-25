import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { slugify } from '@/lib/utils';

const packageSchema = z.object({
  title: z.string().min(3),
  destination: z.string().min(2),
  country: z.string().min(2),
  price: z.number().positive(),
  duration: z.number().positive(),
  groupSize: z.number().positive().optional(),
  description: z.string().min(10),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  imageUrl: z.string().url(),
  images: z.array(z.string()).optional(),
  category: z.enum(['ADVENTURE', 'BEACH', 'CULTURAL', 'LUXURY', 'FAMILY', 'HONEYMOON', 'SAFARI', 'CRUISE']).optional(),
  featured: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const where: any = { active: true };
    if (featured === 'true') where.featured = true;
    if (category) where.category = category;

    const [packages, total] = await Promise.all([
      prisma.tourPackage.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.tourPackage.count({ where }),
    ]);

    return NextResponse.json({
      packages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Get packages error:', error);
    return NextResponse.json({ message: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = packageSchema.parse(body);

    const slug = slugify(validatedData.title);

    const pkg = await prisma.tourPackage.create({
      data: {
        ...validatedData,
        slug,
        highlights: validatedData.highlights || [],
        includes: validatedData.includes || [],
        excludes: validatedData.excludes || [],
        images: validatedData.images || [],
      },
    });

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error('Create package error:', error);
    return NextResponse.json({ message: 'Failed to create package' }, { status: 500 });
  }
}
