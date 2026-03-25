import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const continent = searchParams.get('continent');

    const where: any = { active: true };
    if (featured === 'true') where.featured = true;
    if (continent) where.continent = continent;

    const destinations = await prisma.destination.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    });

    return NextResponse.json({ destinations });
  } catch (error) {
    console.error('Get destinations error:', error);
    return NextResponse.json({ message: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const destination = await prisma.destination.create({
      data: body,
    });

    return NextResponse.json({ success: true, destination }, { status: 201 });
  } catch (error) {
    console.error('Create destination error:', error);
    return NextResponse.json({ message: 'Failed to create destination' }, { status: 500 });
  }
}
