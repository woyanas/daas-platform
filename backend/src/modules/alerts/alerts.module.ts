import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlertsController } from "./alerts.controller";
import { AlertsService } from "./alerts.service";
import { AlertRule } from "./entities/alert-rule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AlertRule])],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
