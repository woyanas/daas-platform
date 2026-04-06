import { ApiPropertyOptional } from "@nestjs/swagger";
import { ReportType, ReportFormat, ReportStatus } from "../entities/report-definition.entity";

export class UpdateReportDefinitionDto {
  @ApiPropertyOptional({ example: "Monthly usage report" })
  name?: string;

  @ApiPropertyOptional({ enum: ReportType, example: ReportType.CUSTOM })
  type?: ReportType;

  @ApiPropertyOptional({ enum: ReportFormat, example: ReportFormat.PDF })
  format?: ReportFormat;

  @ApiPropertyOptional({ example: "Updated report description" })
  description?: string;

  @ApiPropertyOptional({ example: { dashboardId: "uuid" } })
  criteria?: Record<string, any>;

  @ApiPropertyOptional({ enum: ReportStatus, example: ReportStatus.READY })
  status?: ReportStatus;

  @ApiPropertyOptional({ example: "https://storage.example.com/report.pdf" })
  outputUrl?: string;
}
