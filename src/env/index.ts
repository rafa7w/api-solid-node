import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  // o coerce pega um dado, independente do formato, e converte para o formato colocado após ele 
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  // nenhum código abaixo do throw é executado
  // não tem como nossa aplicação executar caso dê algum problema nas variáveis de ambiente
  throw new Error('Invalid environment variables.')
}

export const env = _env.data