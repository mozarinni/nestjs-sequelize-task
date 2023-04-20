import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Event } from "../models/event.model";

export class paginatedEventsDto {
  @ApiProperty()
  events: Event[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;
}
