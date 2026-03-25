import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const reviewSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
  packageId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const where: any = { approved: true };
    if (featured === 'true') where.featured = true;

    const reviews = await prisma.review.findMany({
      where,
      include: { package: { select: { title: true, destination: true } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: { ...validatedData, approved: false },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! It will be published after moderation.',
      review,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to submit review' }, { status: 500 });
  }
}
