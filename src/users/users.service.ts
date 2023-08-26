import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UniqueConstraintError } from 'sequelize';
import * as Bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...rest } = createUserDto;
      const hashedPassword = await Bcrypt.hash(password, 10);
      const createdUser = await User.create({
        ...rest,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error instanceof UniqueConstraintError)
        throw new UnprocessableEntityException('User already exists');
      else throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await User.findByPk(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [, updatedUsers] = await User.update(
      { ...updateUserDto },
      {
        returning: true,
        where: { id },
      },
    );
    return updatedUsers[0];
  }

  async remove(id: number): Promise<boolean> {
    const deletedUser = await User.destroy({ where: { id } });
    return !!deletedUser;
  }
}
