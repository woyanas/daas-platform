import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReportType, ReportFormat, ReportStatus } from "../entities/report-definition.entity";

export class CreateReportDefinitionDto {
  @ApiProperty({ example: "Monthly usage report" })
  name: string;

  @ApiProperty({ enum: ReportType, example: ReportType.USAGE })
  type: ReportType;

  @ApiProperty({ enum: ReportFormat, example: ReportFormat.EXCEL })
  format: ReportFormat;

  @ApiPropertyOptional({ example: "Use dashboard filters and export to Excel" })
  description?: string;

  @ApiPropertyOptional({ example: { dashboardId: "uuid", range: "last_30_days" } })
  criteria?: Record<string, any>;

  @ApiPropertyOptional({ enum: ReportStatus, example: ReportStatus.DRAFT })
  status?: ReportStatus;

  @ApiPropertyOptional({ example: "https://storage.example.com/report.xlsx" })
  outputUrl?: string;
}
