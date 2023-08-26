import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as Bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, _password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && Bcrypt.compareSync(_password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return { user, authToken: this.jwtService.sign(payload) };
  }

  async signup(data: SignUpDto) {
    const user = (await this.usersService.create(data)).toJSON();
    delete user.password;
    return {
      user,
      authToken: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
