import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';

import { UserService } from 'src/user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async login(email: string) {
    const {
      _id,
      fullname,
      email: _email,
    } = await this.userService.userByEmail(email);
    const accessToken = this.jwtService.sign({ id: _id });

    return {
      fullname,
      email: _email,
      accessToken,
    };
  }

  async signUpUser(payload: SignUpDTO): Promise<Partial<User>> {
    return await this.userService.create(payload);
  }
}
