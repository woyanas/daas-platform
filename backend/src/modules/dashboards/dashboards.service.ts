import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dashboard, Widget } from "./entities/dashboard.entity";
import {
  CreateDashboardDto,
  UpdateDashboardDto,
  CreateWidgetDto,
  UpdateWidgetDto,
} from "./dto/dashboard.dto";

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
    @InjectRepository(Widget)
    private widgetsRepository: Repository<Widget>,
  ) {}

  async findAll(userId: string) {
    return this.dashboardsRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string, userId: string): Promise<Dashboard> {
    const dashboard = await this.dashboardsRepository.findOne({
      where: { id },
      relations: ["widgets"],
    });

    if (!dashboard) {
      throw new NotFoundException("Dashboard not found");
    }

    if (dashboard.userId !== userId && !dashboard.isPublic) {
      throw new ForbiddenException("Access denied");
    }

    return dashboard;
  }

  async create(userId: string, dto: CreateDashboardDto): Promise<Dashboard> {
    const dashboard = this.dashboardsRepository.create({
      ...dto,
      userId,
    });
    return this.dashboardsRepository.save(dashboard);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateDashboardDto,
  ): Promise<Dashboard> {
    const dashboard = await this.findOne(id, userId);
    if (dashboard.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }
    Object.assign(dashboard, dto);
    return this.dashboardsRepository.save(dashboard);
  }

  async remove(id: string, userId: string): Promise<void> {
    const dashboard = await this.findOne(id, userId);
    if (dashboard.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }
    await this.dashboardsRepository.remove(dashboard);
  }

  // Widget methods
  async addWidget(
    dashboardId: string,
    userId: string,
    dto: CreateWidgetDto,
  ): Promise<Widget> {
    const dashboard = await this.findOne(dashboardId, userId);
    if (dashboard.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    const widget = this.widgetsRepository.create({
      ...dto,
      dashboardId,
    });
    return this.widgetsRepository.save(widget);
  }

  async updateWidget(
    widgetId: string,
    userId: string,
    dto: UpdateWidgetDto,
  ): Promise<Widget> {
    const widget = await this.widgetsRepository.findOne({
      where: { id: widgetId },
      relations: ["dashboard"],
    });

    if (!widget) {
      throw new NotFoundException("Widget not found");
    }

    if (widget.dashboard.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    Object.assign(widget, dto);
    return this.widgetsRepository.save(widget);
  }

  async removeWidget(widgetId: string, userId: string): Promise<void> {
    const widget = await this.widgetsRepository.findOne({
      where: { id: widgetId },
      relations: ["dashboard"],
    });

    if (!widget) {
      throw new NotFoundException("Widget not found");
    }

    if (widget.dashboard.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    await this.widgetsRepository.remove(widget);
  }

  async getAnalytics(userId: string) {
    const totalDashboards = await this.dashboardsRepository.count({
      where: { userId },
    });
    const totalWidgets = await this.widgetsRepository
      .createQueryBuilder("widget")
      .innerJoin("widget.dashboard", "dashboard")
      .where("dashboard.user_id = :userId", { userId })
      .getCount();

    const widgetsByType = await this.widgetsRepository
      .createQueryBuilder("widget")
      .innerJoin("widget.dashboard", "dashboard")
      .select("widget.type", "type")
      .addSelect("COUNT(*)", "count")
      .where("dashboard.user_id = :userId", { userId })
      .groupBy("widget.type")
      .getRawMany();

    return { totalDashboards, totalWidgets, widgetsByType };
  }
}
