import { Module, UseGuards } from "@nestjs/common";

import { Event } from "../models/event.model";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
