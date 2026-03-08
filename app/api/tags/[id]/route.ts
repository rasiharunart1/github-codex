import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const tag = await prisma.tag.update({ where: { id: params.id }, data: { name: body.name } });
  return NextResponse.json(tag);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.tag.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
