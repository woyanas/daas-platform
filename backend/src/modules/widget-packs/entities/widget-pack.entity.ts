import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum WidgetPackCategory {
  CHART = "chart",
  TABLE = "table",
  METRIC = "metric",
  CUSTOM = "custom",
}

@Entity("widget_packs")
export class WidgetPack {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: WidgetPackCategory, default: WidgetPackCategory.CUSTOM })
  category: WidgetPackCategory;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "jsonb", default: {} })
  template: Record<string, any>;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "sort_order", default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
