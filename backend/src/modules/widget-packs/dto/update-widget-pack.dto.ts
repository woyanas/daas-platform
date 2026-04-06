import { ApiPropertyOptional } from "@nestjs/swagger";
import { WidgetPackCategory } from "../entities/widget-pack.entity";

export class UpdateWidgetPackDto {
  @ApiPropertyOptional({ example: "Executive KPI Pack" })
  name?: string;

  @ApiPropertyOptional({ enum: WidgetPackCategory, example: WidgetPackCategory.METRIC })
  category?: WidgetPackCategory;

  @ApiPropertyOptional({ example: "Updated description" })
  description?: string;

  @ApiPropertyOptional({ example: { layout: [], widgets: [] } })
  template?: Record<string, any>;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 10 })
  sortOrder?: number;
}
