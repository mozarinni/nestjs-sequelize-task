import { Cron, CronExpression } from "@nestjs/schedule";

import { EventService } from "../services/event.service";
import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";

@Injectable()
export class EventCron {
  constructor(private readonly eventService: EventService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async deleteEndedEvents() {
    const now = new Date();
    const endedEvents = await this.eventService.findAll({
      where: { endDate: { [Op.lt]: now } },
    });

    for (const event of endedEvents) {
      await event.destroy();
    }

    console.log(`Deleted ${endedEvents.length} ended events.`);
  }
}
