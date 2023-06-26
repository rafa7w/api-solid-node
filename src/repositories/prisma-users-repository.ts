import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  // métodos que vão interceptar para qualquer operação no banco de dados
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    }) 

    return user
  }
}