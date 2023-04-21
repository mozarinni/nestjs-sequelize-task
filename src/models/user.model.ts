import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { ApiProperty } from "@nestjs/swagger";
import { Event } from "./event.model";

@Table({ tableName: "users" })
export class User extends Model<User> {
  @ApiProperty({
    example: "0e631cae-9a35-4f86-b198-c0dbb762d808",
    description: "Unique Id",
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
  })
  hashedPassword: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
  })
  avatar?: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @HasMany(() => Event)
  events: Event[];
}
