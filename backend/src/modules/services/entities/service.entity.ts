import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

export enum ServiceCategory {
  CONNECTOR = "connector",
  WIDGET = "widget",
  ALERT = "alert",
  REPORT = "report",
  INTEGRATION = "integration",
  FEATURE_FLAG = "feature_flag",
  CORE = "core",
}

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 50 })
  slug: string;

  @Column({ type: "enum", enum: ServiceCategory, default: ServiceCategory.CORE })
  category: ServiceCategory;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ nullable: true, length: 100 })
  icon: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "sort_order", default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}

@Entity("service_configs")
export class ServiceConfig {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "service_id" })
  serviceId: string;

  @ManyToOne(() => Service, { onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service: Service;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "is_enabled", default: true })
  isEnabled: boolean;

  @Column({ type: "jsonb", default: {} })
  settings: Record<string, any>;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
