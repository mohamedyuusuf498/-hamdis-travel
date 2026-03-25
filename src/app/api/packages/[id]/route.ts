import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const pkg = await prisma.tourPackage.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        active: true,
      },
      include: {
        reviews: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!pkg) {
      return NextResponse.json({ message: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ package: pkg });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch package' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const pkg = await prisma.tourPackage.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, package: pkg });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await prisma.tourPackage.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete package' }, { status: 500 });
  }
}
