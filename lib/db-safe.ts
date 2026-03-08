import { Prisma } from '@prisma/client';

export function isMissingTableError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021';
}

export async function withDbFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (isMissingTableError(error)) {
      console.error('Database tables are missing. Returning fallback data.', error);
      return fallback;
    }
    throw error;
  }
}
