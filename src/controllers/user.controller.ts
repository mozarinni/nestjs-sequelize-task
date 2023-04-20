import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { UserService } from "src/services/user.service";
import { User } from "../models/user.model";

@ApiTags("User Management")
@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get user profile" })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "User profile retrieved successfully",
    type: User,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findByPk(req.user.id);
  }
}
