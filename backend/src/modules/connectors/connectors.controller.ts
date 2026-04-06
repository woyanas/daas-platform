import { Controller, Get, Post, Patch, Delete, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ConnectorsService } from "./connectors.service";
import { CreateConnectorDto } from "./dto/create-connector.dto";
import { UpdateConnectorDto } from "./dto/update-connector.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@ApiTags("services")
@Controller("services/connectors")
@UseGuards(JwtAuthGuard)
export class ConnectorsController {
  constructor(private readonly connectorsService: ConnectorsService) {}

  @Get()
  @ApiOperation({ summary: "List available connectors" })
  findAll() {
    return this.connectorsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get connector details" })
  findOne(@Param("id") id: string) {
    return this.connectorsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new connector" })
  create(@Body() dto: CreateConnectorDto) {
    return this.connectorsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update connector configuration" })
  update(@Param("id") id: string, @Body() dto: UpdateConnectorDto) {
    return this.connectorsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete connector" })
  remove(@Param("id") id: string) {
    return this.connectorsService.remove(id);
  }
}
