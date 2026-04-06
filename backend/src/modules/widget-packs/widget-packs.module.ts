import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WidgetPacksController } from "./widget-packs.controller";
import { WidgetPacksService } from "./widget-packs.service";
import { WidgetPack } from "./entities/widget-pack.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WidgetPack])],
  controllers: [WidgetPacksController],
  providers: [WidgetPacksService],
  exports: [WidgetPacksService],
})
export class WidgetPacksModule {}
