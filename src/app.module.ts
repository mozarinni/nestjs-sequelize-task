import { AuthModule } from "./modules/auth.module";
import { ConfigModule } from "@nestjs/config";
import { Event } from "./models/event.model";
import { EventCron } from "./cron/event.cron";
import { EventModule } from "./modules/event.module";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserModule } from "./modules/user.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Event],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    EventModule,
  ],
  providers: [EventCron],
})
export class AppModule {}
