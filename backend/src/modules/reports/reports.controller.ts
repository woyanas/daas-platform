import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReportsService } from "./reports.service";
import { CreateReportDefinitionDto } from "./dto/create-report-definition.dto";
import { UpdateReportDefinitionDto } from "./dto/update-report-definition.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("services")
@Controller("services/reports")
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: "List report definitions" })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get report definition details" })
  findOne(@Param("id") id: string) {
    return this.reportsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a report definition" })
  create(@Body() dto: CreateReportDefinitionDto) {
    return this.reportsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update report definition" })
  update(@Param("id") id: string, @Body() dto: UpdateReportDefinitionDto) {
    return this.reportsService.update(id, dto);
  }

  @Get(":id/download")
  @ApiOperation({ summary: "Download generated report" })
  download(@Param("id") id: string) {
    return this.reportsService.download(id);
  }
}
