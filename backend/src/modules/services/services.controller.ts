import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ServicesService } from "./services.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ServiceCategory } from "./entities/service.entity";

@ApiTags("services")
@Controller("services")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: "Get all available services" })
  findAll(@Query("category") category?: ServiceCategory) {
    return this.servicesService.findAll(category);
  }

  @Get("my-config")
  @ApiOperation({ summary: "Get user service configurations" })
  getUserConfigs(@Req() req: any) {
    return this.servicesService.getUserConfigs(req.user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get service by ID" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(":id/config")
  @ApiOperation({ summary: "Update user service configuration" })
  updateConfig(
    @Param("id") id: string,
    @Body() body: { isEnabled?: boolean; settings?: Record<string, any> },
    @Req() req: any,
  ) {
    return this.servicesService.updateConfig(req.user.id, id, body);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Toggle service for user" })
  toggleService(
    @Param("id") id: string,
    @Body() body: { isEnabled?: boolean },
    @Req() req: any,
  ) {
    return this.servicesService.updateConfig(req.user.id, id, body);
  }
}
