import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

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

  @ApiPropertyOptional()
  @Column
  userId: string;
}
