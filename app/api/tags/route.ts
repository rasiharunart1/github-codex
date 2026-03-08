import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { makeSlug } from '@/lib/utils';

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(tags);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tag = await prisma.tag.create({ data: { name: body.name, slug: makeSlug(body.name) } });
  return NextResponse.json(tag, { status: 201 });
}
