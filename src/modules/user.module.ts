import { Module, UseGuards } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
