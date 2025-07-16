import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokensEntity } from './entities/tokens.entity';
import { SignInInfoDto, SignUpInfoDto } from './dto/auth-info.dto';
import { jwtConstants } from './constants';
import { PayloadEntity } from './entities/payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(info: SignInInfoDto): Promise<TokensEntity> {
    const user = await this.userService.findOne(info.email);
    if (user && bcrypt.compareSync(info.password, user.passwordHash)) {
      const payload = new PayloadEntity(user.id, user.email, user.username);

      return this.getTokens(payload);
    }
    throw new UnauthorizedException();
  }

  async signUp(info: SignUpInfoDto): Promise<TokensEntity> {
    const existingUser = await this.userService.findOne(info.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = bcrypt.hashSync(info.password, 10);
    const userData = {
      email: info.email,
      username: info.username,
      passwordHash: hashedPassword,
    };
    const user = await this.userService.create(userData);
    const userPayload = new PayloadEntity(user.id, user.email, user.username);

    return this.getTokens(userPayload);
  }

  async refreshToken(token: string): Promise<TokensEntity> {
    try {
      const payload = await this.jwtService.verifyAsync<PayloadEntity>(token, {
        secret: jwtConstants.refreshTokenSecret,
      });
      const user = await this.userService.findOne(payload.email);
      if (!user) {
        throw new UnauthorizedException();
      }
      const userPayload = new PayloadEntity(user.id, user.email, user.username);
      return this.getTokens(userPayload);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getTokens(payload: PayloadEntity): TokensEntity {
    const plainPayload = { ...payload };
    const accessToken = this.jwtService.sign(plainPayload);
    const refreshToken = this.jwtService.sign(plainPayload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: jwtConstants.refreshTokenExpiration,
    });
    return new TokensEntity(accessToken, refreshToken);
  }
}
