import { getRepository, Repository } from 'typeorm';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { UserEntity } from '../models/user.model';

export class AuthService {
  private userRepository: Repository<UserEntity>;


  async create(user: User): Promise<User> {
    const userRepository = getRepository(UserEntity);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userEntity = userRepository.create({
      ...user,
      password: hashedPassword
    });
    await userRepository.save(userEntity);
    return userEntity;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { username } });
    return user ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({where:{id:id}});
    return user ? user : null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    const userRepository = getRepository(UserEntity);
    return await bcrypt.compare(password, user.password);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const userRepository = getRepository(UserEntity);
    await userRepository.update(userId, { refreshToken });
  }
}