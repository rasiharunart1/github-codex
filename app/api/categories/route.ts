import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { makeSlug } from '@/lib/utils';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const category = await prisma.category.create({
    data: { name: body.name, slug: makeSlug(body.name) }
  });
  return NextResponse.json(category, { status: 201 });
}
