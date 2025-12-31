import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Plan, Subscription, SubscriptionStatus, UsageMetric } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Plan)
        private plansRepository: Repository<Plan>,
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
        @InjectRepository(UsageMetric)
        private usageMetricsRepository: Repository<UsageMetric>,
    ) { }

    async getAllPlans() {
        return this.plansRepository.find({
            where: { isActive: true },
            order: { sortOrder: 'ASC' },
        });
    }

    async getUserSubscription(userId: string) {
        const subscription = await this.subscriptionsRepository.findOne({
            where: { userId, status: SubscriptionStatus.ACTIVE },
            relations: ['plan'],
        });

        if (!subscription) {
            // Return free plan by default
            const freePlan = await this.plansRepository.findOne({ where: { slug: 'free' } });
            return { plan: freePlan, status: 'trial' };
        }

        return subscription;
    }

    async subscribe(userId: string, planSlug: string) {
        const plan = await this.plansRepository.findOne({ where: { slug: planSlug } });
        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        // Cancel existing subscription
        await this.subscriptionsRepository.update(
            { userId, status: SubscriptionStatus.ACTIVE },
            { status: SubscriptionStatus.CANCELLED, cancelledAt: new Date() },
        );

        // Create new subscription
        const subscription = this.subscriptionsRepository.create({
            userId,
            planId: plan.id,
            status: SubscriptionStatus.ACTIVE,
            endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        return this.subscriptionsRepository.save(subscription);
    }

    async cancelSubscription(userId: string) {
        const subscription = await this.subscriptionsRepository.findOne({
            where: { userId, status: SubscriptionStatus.ACTIVE },
        });

        if (!subscription) {
            throw new NotFoundException('No active subscription found');
        }

        subscription.status = SubscriptionStatus.CANCELLED;
        subscription.cancelledAt = new Date();
        return this.subscriptionsRepository.save(subscription);
    }

    async getUsageMetrics(userId: string, startDate?: Date, endDate?: Date) {
        const start = startDate || new Date(new Date().setDate(1)); // First of month
        const end = endDate || new Date();

        const metrics = await this.usageMetricsRepository.find({
            where: {
                userId,
                periodStart: Between(start, end),
            },
            order: { periodStart: 'ASC' },
        });

        // Group by metric type
        const grouped = metrics.reduce((acc, metric) => {
            if (!acc[metric.metricType]) acc[metric.metricType] = [];
            acc[metric.metricType].push(metric);
            return acc;
        }, {} as Record<string, UsageMetric[]>);

        return grouped;
    }

    async recordUsage(userId: string, metricType: string, value: number) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let metric = await this.usageMetricsRepository.findOne({
            where: {
                userId,
                metricType,
                periodStart: today,
            },
        });

        if (metric) {
            metric.value = Number(metric.value) + value;
        } else {
            metric = this.usageMetricsRepository.create({
                userId,
                metricType,
                value,
                periodStart: today,
                periodEnd: today,
            });
        }

        return this.usageMetricsRepository.save(metric);
    }
}
