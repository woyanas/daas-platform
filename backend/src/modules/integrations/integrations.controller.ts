import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { IntegrationsService } from "./integrations.service";
import { CreateIntegrationDto } from "./dto/create-integration.dto";
import { UpdateIntegrationDto } from "./dto/update-integration.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("services")
@Controller("services/integrations")
@UseGuards(JwtAuthGuard)
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: "List third-party integrations" })
  findAll() {
    return this.integrationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get integration details" })
  findOne(@Param("id") id: string) {
    return this.integrationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create an integration" })
  create(@Body() dto: CreateIntegrationDto) {
    return this.integrationsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update integration settings" })
  update(@Param("id") id: string, @Body() dto: UpdateIntegrationDto) {
    return this.integrationsService.update(id, dto);
  }

  @Post(":id/test")
  @ApiOperation({ summary: "Test integration connection" })
  test(@Param("id") id: string) {
    return this.integrationsService.test(id);
  }
}
