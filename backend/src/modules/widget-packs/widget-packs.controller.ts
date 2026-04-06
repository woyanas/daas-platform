import { Controller, Get, Post, Patch, Param, Body, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { WidgetPacksService } from "./widget-packs.service";
import { CreateWidgetPackDto } from "./dto/create-widget-pack.dto";
import { UpdateWidgetPackDto } from "./dto/update-widget-pack.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("services")
@Controller("services/widget-packs")
@UseGuards(JwtAuthGuard)
export class WidgetPacksController {
  constructor(private readonly widgetPacksService: WidgetPacksService) {}

  @Get()
  @ApiOperation({ summary: "List available widget packs" })
  findAll() {
    return this.widgetPacksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a widget pack" })
  findOne(@Param("id") id: string) {
    return this.widgetPacksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a widget pack" })
  create(@Body() dto: CreateWidgetPackDto) {
    return this.widgetPacksService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a widget pack" })
  update(@Param("id") id: string, @Body() dto: UpdateWidgetPackDto) {
    return this.widgetPacksService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a widget pack" })
  remove(@Param("id") id: string) {
    return this.widgetPacksService.remove(id);
  }
}
