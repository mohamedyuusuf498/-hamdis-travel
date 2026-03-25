import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = { active: true };
    if (category && category !== 'ALL') where.category = category;
    if (featured === 'true') where.featured = true;

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Get gallery error:', error);
    return NextResponse.json({ message: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const image = await prisma.galleryImage.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        category: body.category || 'NATURE',
        featured: body.featured || false,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error('Create gallery image error:', error);
    return NextResponse.json({ message: 'Failed to create gallery image' }, { status: 500 });
  }
}
