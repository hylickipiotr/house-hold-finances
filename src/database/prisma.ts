import { PrismaClient } from '@prisma/client';

export default class Prisma {
  private static instance: PrismaClient;

  public static getClient(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
      });
    }

    return Prisma.instance;
  }
}
