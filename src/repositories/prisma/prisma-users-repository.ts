import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    // findUnique só consegue buscar registros que foram definidos como @unique ou são chaves primárias @id
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  // métodos que vão interceptar para qualquer operação no banco de dados
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    }) 

    return user
  }
}