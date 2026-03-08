import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const article = await prisma.article.update({
    where: { id: params.id },
    data: body
  });
  return NextResponse.json(article);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.article.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
