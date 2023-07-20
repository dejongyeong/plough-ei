import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const json = await request.json();

  const user = await prisma.user.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(user), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
