import { Controller, Get, Post, Patch, Param, Body, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AlertsService } from "./alerts.service";
import { CreateAlertRuleDto } from "./dto/create-alert-rule.dto";
import { UpdateAlertRuleDto } from "./dto/update-alert-rule.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("services")
@Controller("services/alerts")
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @ApiOperation({ summary: "List alert rules" })
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get alert rule details" })
  findOne(@Param("id") id: string) {
    return this.alertsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create alert rule" })
  create(@Body() dto: CreateAlertRuleDto) {
    return this.alertsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update alert rule" })
  update(@Param("id") id: string, @Body() dto: UpdateAlertRuleDto) {
    return this.alertsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete alert rule" })
  remove(@Param("id") id: string) {
    return this.alertsService.remove(id);
  }
}
