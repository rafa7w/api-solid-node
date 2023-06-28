import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({email, password})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: error.message
      })
    }
    
    // Ao fazer dessa forma é o Fastify que lida com esse tipo de erro e mostra de uma forma mais organizada
    throw error
  }


  return reply.status(200).send()
}