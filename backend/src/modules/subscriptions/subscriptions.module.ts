import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Plan, Subscription, UsageMetric } from './entities/subscription.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, Subscription, UsageMetric])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
    exports: [SubscriptionsService],
})
export class SubscriptionsModule { }
