import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.newsletter.findUnique({ where: { email } });

    if (existing) {
      if (existing.active) {
        return NextResponse.json({
          success: false,
          message: 'You are already subscribed to our newsletter!',
        }, { status: 400 });
      } else {
        await prisma.newsletter.update({
          where: { email },
          data: { active: true },
        });
        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been re-subscribed to our newsletter.',
        });
      }
    }

    await prisma.newsletter.create({ data: { email } });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You\'ll receive our latest travel deals and inspiration.',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address.',
      }, { status: 400 });
    }

    console.error('Newsletter error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to subscribe. Please try again.',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ subscribers, total: subscribers.length });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
