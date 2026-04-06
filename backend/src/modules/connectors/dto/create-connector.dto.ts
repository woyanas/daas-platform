import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ConnectorType } from "../entities/connector.entity";

export class CreateConnectorDto {
  @ApiProperty({ example: "PostgreSQL source" })
  name: string;

  @ApiProperty({ enum: ConnectorType, example: ConnectorType.POSTGRES })
  type: ConnectorType;

  @ApiPropertyOptional({ example: "Connection settings for external database" })
  description?: string;

  @ApiPropertyOptional({ example: { host: "localhost", port: 5432 } })
  config?: Record<string, any>;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 100 })
  sortOrder?: number;
}
