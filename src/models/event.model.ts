import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

import { User } from "./user.model";

@Table({ tableName: "events" })
export class Event extends Model<Event> {
  @ApiPropertyOptional()
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column
  name: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Column
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Column
  endDate: Date;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
