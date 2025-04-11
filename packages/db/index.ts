import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

console.log("Hello via Bun!");