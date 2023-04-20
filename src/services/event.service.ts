import { date } from "@hapi/joi";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions, Op } from "sequelize";
import { Event } from "../models/event.model";
import { paginatedEventsDto } from "../dto/event.dto";

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private eventRepository: typeof Event) {}

  async findAll(options?: FindOptions<Event>): Promise<Event[]> {
    return this.eventRepository.findAll(options);
  }

  async findAllUserEvents(
    page: number = 1,
    pageSize: number = 10,
    userId: string
  ): Promise<paginatedEventsDto> {
    const events = await this.findAll({
      where: { userId },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const total = await this.eventRepository.count({ where: { userId } });
    return { events, page, pageSize, total };
  }

  async getEventStat(
    periodStart: Date,
    periodEnd: Date,
    userId: string
  ): Promise<Event[]> {
    return await this.eventRepository.findAll({
      attributes: [
        [
          this.eventRepository.sequelize.literal(
            "date_trunc('day', \"startDate\")"
          ),
          "date",
        ],
        [this.eventRepository.sequelize.literal("COUNT(*)"), "count"],
      ],
      group: ["date"],
      where: {
        userId,
        startDate: {
          [Op.between]: [periodStart, periodEnd],
        },
      },
    });
  }

  async findByPk(id: string): Promise<Event> {
    return this.eventRepository.findByPk(id);
  }

  async create(rawEvent: Event, userId: string): Promise<Event> {
    const event = new Event({ ...rawEvent, userId });
    await event.save();
    return event;
  }

  async update(id: string, event: Event, userId: string): Promise<Event> {
    const updateEvent = await this.eventRepository.findOne({
      where: { id, userId },
    });
    if (updateEvent) {
      await updateEvent.update(event);
      return updateEvent;
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    const deleteEvent = await this.eventRepository.findOne({
      where: { id, userId },
    });
    if (deleteEvent) {
      await deleteEvent.destroy();
    }
  }
}
