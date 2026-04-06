import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum AlertType {
  USAGE = "usage",
  THRESHOLD = "threshold",
  FAILURE = "failure",
}

@Entity("alert_rules")
export class AlertRule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: AlertType, default: AlertType.FAILURE })
  type: AlertType;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "jsonb", default: {} })
  settings: Record<string, any>;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "sort_order", default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
