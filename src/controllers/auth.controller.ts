import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { UserDto } from "../dto/user.dto";
import { authResponseDto } from "../dto/auth.dto";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiOkResponse({
    description: "User logged in successfully",
    type: authResponseDto,
  })
  async signIn(@Body() signInDto: UserDto): Promise<authResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post("registration")
  @ApiOperation({ summary: "Register" })
  @ApiCreatedResponse({
    description: "User registered successfully",
    type: authResponseDto,
  })
  async signUp(@Body() signUpDto: UserDto): Promise<authResponseDto> {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }
}
