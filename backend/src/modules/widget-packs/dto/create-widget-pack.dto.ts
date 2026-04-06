import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { WidgetPackCategory } from "../entities/widget-pack.entity";

export class CreateWidgetPackDto {
  @ApiProperty({ example: "Executive KPI Pack" })
  name: string;

  @ApiProperty({ enum: WidgetPackCategory, example: WidgetPackCategory.CHART })
  category: WidgetPackCategory;

  @ApiPropertyOptional({ example: "Prebuilt KPI widget pack for founders" })
  description?: string;

  @ApiPropertyOptional({ example: { layout: [], widgets: [] } })
  template?: Record<string, any>;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  sortOrder?: number;
}
