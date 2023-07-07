import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

// métodos que vão interceptar para qualquer operação no banco de dados
export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    return user
  }

  async findByEmail(email: string) {
    // findUnique só consegue buscar registros que foram definidos como @unique ou são chaves primárias @id
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    }) 

    return user
  }
}