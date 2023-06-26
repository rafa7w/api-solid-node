import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

// Aplicação de Inversão de Dependência (SOLID)
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository,) {
    this.usersRepository = usersRepository
  }

  async execute({name, email, password}: RegisterUserCaseRequest) {
    // o segundo parâmetro passado para o hash é a quantidade de vezes que ele vai encriptografar cumulativamente a senha, ou seja, ele encriptogrfa a criptografia já feita 
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }
  
    await this.usersRepository.create({
      name,
      email, 
      password_hash
    })
  }
}
