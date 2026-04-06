import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum ConnectorType {
  POSTGRES = "postgres",
  API = "api",
  GOOGLE_SHEETS = "google_sheets",
  CSV = "csv",
  OTHER = "other",
}

@Entity("connectors")
export class Connector {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: ConnectorType, default: ConnectorType.OTHER })
  type: ConnectorType;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "jsonb", default: {} })
  config: Record<string, any>;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "sort_order", default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
