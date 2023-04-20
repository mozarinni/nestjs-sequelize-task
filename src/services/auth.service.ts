import * as bcrypt from "bcrypt";

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { UserService } from "../services/user.service";
import { authResponseDto } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<authResponseDto> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException("User does not exist", HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "1d",
    });
    return { accessToken, refreshToken };
  }

  async signUp(email: string, password: string): Promise<authResponseDto> {
    const user = await this.userService.findOne(email);
    if (user) {
      throw new HttpException("User already exist", HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.create(email, password);

    const payload = { email: newUser.email, id: newUser.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "1d",
    });
    return { accessToken, refreshToken };
  }
}
