// packages/db/src/index.ts

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export { prismaClient, PrismaClient }; // ✅ This line is essential
