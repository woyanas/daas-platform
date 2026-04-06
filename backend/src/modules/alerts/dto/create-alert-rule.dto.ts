import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AlertType } from "../entities/alert-rule.entity";

export class CreateAlertRuleDto {
  @ApiProperty({ example: "High usage alert" })
  name: string;

  @ApiProperty({ enum: AlertType, example: AlertType.USAGE })
  type: AlertType;

  @ApiPropertyOptional({ example: "Notify when usage exceeds threshold" })
  description?: string;

  @ApiPropertyOptional({ example: { threshold: 90, channels: ["email"] } })
  settings?: Record<string, any>;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  sortOrder?: number;
}
