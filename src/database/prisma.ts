import { PrismaClient } from '@prisma/client';

export default class Prisma {
  private static instance: PrismaClient;

  public static getClient(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient();
    }

    return Prisma.instance;
  }
}
