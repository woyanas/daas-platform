import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("dashboards")
export class Dashboard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: "jsonb", default: { columns: 12, rows: [] } })
  layout: Record<string, any>;

  @Column({ name: "is_public", default: false })
  isPublic: boolean;

  @Column({ name: "is_default", default: false })
  isDefault: boolean;

  @Column({ name: "thumbnail_url", nullable: true, length: 500 })
  thumbnailUrl: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;

  @OneToMany(() => Widget, (widget) => widget.dashboard)
  widgets: Widget[];
}

export enum WidgetType {
  LINE_CHART = "line_chart",
  BAR_CHART = "bar_chart",
  PIE_CHART = "pie_chart",
  KPI_CARD = "kpi_card",
  DATA_TABLE = "data_table",
  STAT_CARD = "stat_card",
  AREA_CHART = "area_chart",
  GAUGE = "gauge",
}

@Entity("widgets")
export class Widget {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "dashboard_id" })
  dashboardId: string;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.widgets, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "dashboard_id" })
  dashboard: Dashboard;

  @Column({ type: "enum", enum: WidgetType })
  type: WidgetType;

  @Column({ length: 255 })
  title: string;

  @Column({ type: "jsonb", default: {} })
  config: Record<string, any>;

  @Column({ type: "jsonb", default: { x: 0, y: 0, w: 4, h: 3 } })
  position: { x: number; y: number; w: number; h: number };

  @Column({ name: "data_source", type: "jsonb", default: {} })
  dataSource: Record<string, any>;

  @Column({ name: "refresh_interval", default: 0 })
  refreshInterval: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
