import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IntegrationProvider } from "../entities/integration.entity";

export class CreateIntegrationDto {
  @ApiProperty({ example: "Slack alerts" })
  name: string;

  @ApiProperty({ enum: IntegrationProvider, example: IntegrationProvider.SLACK })
  provider: IntegrationProvider;

  @ApiPropertyOptional({ example: "Send alerts to Slack channel" })
  description?: string;

  @ApiPropertyOptional({ example: { webhookUrl: "https://hooks.slack.com/..." } })
  config?: Record<string, any>;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  sortOrder?: number;
}
