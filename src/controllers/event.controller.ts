import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Request,
  UseGuards,
  Param,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { EventService } from "../services/event.service";
import { Event } from "../models/event.model";
import { paginatedEventsDto } from "../dto/event.dto";

@ApiTags("Event Management")
@Controller("event")
@UseGuards(AuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: "Get all events" })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: paginatedEventsDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async findAllUserEvents(
    @Query("page") page: number = 1,
    @Query("pageSize") pageSize: number = 10,
    @Request() req
  ): Promise<paginatedEventsDto> {
    return await this.eventService.findAllUserEvents(
      page,
      pageSize,
      req.user.id
    );
  }

  @Get("statistics")
  @ApiOperation({ summary: "Get events statistics" })
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      example: [
        {
          date: "2021-11-24T00:00:00.000Z",
          count: "2",
        },
        {
          date: "2022-11-24T00:00:00.000Z",
          count: "1",
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getEventStat(
    @Query("periodStart") periodStart: Date,
    @Query("periodEnd") periodEnd: Date,
    @Request() req
  ): Promise<Event[]> {
    return await this.eventService.getEventStat(
      periodStart,
      periodEnd,
      req.user.id
    );
  }

  @Post()
  @ApiOperation({ summary: "Create event" })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Event })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async create(@Request() req, @Body() rawEvent: Event): Promise<Event> {
    return await this.eventService.create(rawEvent, req.user.id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update event" })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async update(
    @Request() req,
    @Param("id") id: string,
    @Body() event: Event
  ): Promise<Event> {
    return await this.eventService.update(id, event, req.user.id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete event" })
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Event has been deleted" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async delete(@Request() req, @Param("id") id: string): Promise<void> {
    return await this.eventService.delete(id, req.user.id);
  }
}
