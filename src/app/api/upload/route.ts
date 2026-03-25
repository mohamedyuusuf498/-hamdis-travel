import { NextRequest, NextResponse } from 'next/server';
import { getUploadPresignedUrl } from '@/lib/s3';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, contentType, folder = 'uploads' } = body;

    if (!fileName || !contentType) {
      return NextResponse.json({ message: 'fileName and contentType are required' }, { status: 400 });
    }

    const ext = fileName.split('.').pop();
    const key = `${folder}/${uuidv4()}.${ext}`;

    const presignedUrl = await getUploadPresignedUrl(key, contentType);
    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Failed to generate upload URL' }, { status: 500 });
  }
}
