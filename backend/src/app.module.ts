import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { DashboardsModule } from "./modules/dashboards/dashboards.module";
import { ServicesModule } from "./modules/services/services.module";
import { ConnectorsModule } from "./modules/connectors/connectors.module";
import { WidgetPacksModule } from "./modules/widget-packs/widget-packs.module";
import { AlertsModule } from "./modules/alerts/alerts.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { IntegrationsModule } from "./modules/integrations/integrations.module";
import { FeatureFlagsModule } from "./modules/feature-flags/feature-flags.module";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { ContactModule } from "./modules/contact/contact.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST", "localhost"),
        port: configService.get("DATABASE_PORT", 5432),
        username: configService.get("DATABASE_USER", "daas_user"),
        password: configService.get("DATABASE_PASSWORD", "daas_password"),
        database: configService.get("DATABASE_NAME", "daas_db"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get("NODE_ENV") === "development",
        logging: configService.get("NODE_ENV") === "development",
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    DashboardsModule,
    ServicesModule,
    ConnectorsModule,
    WidgetPacksModule,
    AlertsModule,
    ReportsModule,
    IntegrationsModule,
    FeatureFlagsModule,
    SubscriptionsModule,
    ContactModule,
    HealthModule,
  ],
})
export class AppModule {}
