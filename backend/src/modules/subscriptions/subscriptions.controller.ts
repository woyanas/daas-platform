import { Controller, Get, Post, Delete, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    @Get('plans')
    @ApiOperation({ summary: 'Get all available plans' })
    getAllPlans() {
        return this.subscriptionsService.getAllPlans();
    }

    @Get('current')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user subscription' })
    getCurrentSubscription(@Req() req: any) {
        return this.subscriptionsService.getUserSubscription(req.user.id);
    }

    @Post('subscribe')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Subscribe to a plan' })
    subscribe(@Body('planSlug') planSlug: string, @Req() req: any) {
        return this.subscriptionsService.subscribe(req.user.id, planSlug);
    }

    @Delete('cancel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cancel current subscription' })
    cancel(@Req() req: any) {
        return this.subscriptionsService.cancelSubscription(req.user.id);
    }

    @Get('usage')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get usage metrics' })
    getUsage(
        @Req() req: any,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.subscriptionsService.getUsageMetrics(
            req.user.id,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined,
        );
    }
}
