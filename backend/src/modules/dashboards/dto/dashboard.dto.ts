import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEnum, IsObject, IsNumber } from 'class-validator';
import { WidgetType } from '../entities/dashboard.entity';

export class CreateDashboardDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    layout?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
}

export class UpdateDashboardDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    layout?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}

export class CreateWidgetDto {
    @ApiProperty({ enum: WidgetType })
    @IsEnum(WidgetType)
    type: WidgetType;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    config?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    position?: { x: number; y: number; w: number; h: number };

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    dataSource?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    refreshInterval?: number;
}

export class UpdateWidgetDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    config?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    position?: { x: number; y: number; w: number; h: number };

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    dataSource?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    refreshInterval?: number;
}
