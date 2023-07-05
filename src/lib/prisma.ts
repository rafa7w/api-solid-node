// Arquivo para conexão com o banco
import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // habilita o log se for ambiente de desenvolvimento
  log: env.NODE_ENV === 'dev' ? ['query'] : []
})