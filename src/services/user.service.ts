import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByPk(id: string): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async create(email: string, password: string): Promise<User> {
    const saltRounds = 10;
    const user = new User();
    user.email = email;
    user.hashedPassword = await bcrypt.hash(password, saltRounds);
    await user.save();
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
