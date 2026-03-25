import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  destination: z.string().min(2, 'Destination is required'),
  travelDate: z.string().min(1, 'Travel date is required'),
  returnDate: z.string().optional(),
  travelers: z.number().min(1).max(50),
  adults: z.number().min(1),
  children: z.number().min(0),
  packageId: z.string().optional(),
  specialRequests: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        destination: validatedData.destination,
        travelDate: new Date(validatedData.travelDate),
        returnDate: validatedData.returnDate ? new Date(validatedData.returnDate) : null,
        travelers: validatedData.travelers,
        adults: validatedData.adults,
        children: validatedData.children,
        packageId: validatedData.packageId || null,
        specialRequests: validatedData.specialRequests,
        status: 'PENDING',
      },
      include: {
        package: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully!',
      bookingRef: booking.bookingRef,
      booking,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.issues,
      }, { status: 400 });
    }

    console.error('Booking error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking. Please try again.',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const where = status ? { status: status as any } : {};
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: { package: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings' }, { status: 500 });
  }
}
