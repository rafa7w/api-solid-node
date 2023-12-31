import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

// Para criar um usuário em qualquer lugar da aplicação, basta chamar esse Caso de Uso
// Aplicação de Inversão de Dependência (SOLID) = ao invés da classe instanciar as dependências que ela precisa, ela recebe as dependências como parâmetro 
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository,) {
    this.usersRepository = usersRepository
  }

  async execute({name, email, password}: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    // o segundo parâmetro passado para o hash é a quantidade de vezes que ele vai encriptografar cumulativamente a senha, ou seja, ele encriptogrfa a criptografia já feita 
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
    const user = await this.usersRepository.create({
      name,
      email, 
      password_hash
    })

    return {user}
  }
}
