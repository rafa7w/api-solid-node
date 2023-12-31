import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  // Por poder ser chamada de outra forma (além do método POST de uma requisição HTTP), a criação de usuário foi implementada em outra parte
  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({name, email, password})
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message
      })
    }
    
    // Ao fazer dessa forma é o Fastify que lida com esse tipo de erro e mostra de uma forma mais organizada
    throw error
  }


  return reply.status(201).send()
}