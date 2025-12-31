import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardsService } from './dashboards.service';
import { CreateDashboardDto, UpdateDashboardDto, CreateWidgetDto, UpdateWidgetDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('dashboards')
@Controller('dashboards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all dashboards for current user' })
    findAll(@Req() req: any) {
        return this.dashboardsService.findAll(req.user.id);
    }

    @Get('analytics')
    @ApiOperation({ summary: 'Get dashboard analytics' })
    getAnalytics(@Req() req: any) {
        return this.dashboardsService.getAnalytics(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get dashboard by ID' })
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.dashboardsService.findOne(id, req.user.id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new dashboard' })
    create(@Body() dto: CreateDashboardDto, @Req() req: any) {
        return this.dashboardsService.create(req.user.id, dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update dashboard' })
    update(@Param('id') id: string, @Body() dto: UpdateDashboardDto, @Req() req: any) {
        return this.dashboardsService.update(id, req.user.id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete dashboard' })
    remove(@Param('id') id: string, @Req() req: any) {
        return this.dashboardsService.remove(id, req.user.id);
    }

    // Widget endpoints
    @Post(':id/widgets')
    @ApiOperation({ summary: 'Add widget to dashboard' })
    addWidget(@Param('id') id: string, @Body() dto: CreateWidgetDto, @Req() req: any) {
        return this.dashboardsService.addWidget(id, req.user.id, dto);
    }

    @Patch('widgets/:widgetId')
    @ApiOperation({ summary: 'Update widget' })
    updateWidget(@Param('widgetId') widgetId: string, @Body() dto: UpdateWidgetDto, @Req() req: any) {
        return this.dashboardsService.updateWidget(widgetId, req.user.id, dto);
    }

    @Delete('widgets/:widgetId')
    @ApiOperation({ summary: 'Delete widget' })
    removeWidget(@Param('widgetId') widgetId: string, @Req() req: any) {
        return this.dashboardsService.removeWidget(widgetId, req.user.id);
    }
}
