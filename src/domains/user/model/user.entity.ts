import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import { UserRole } from "../../../common";

export enum UserStatus {
  Active = "Active",
  Inactice = "Inactice",
  Pending = "Pending",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column({ type: "varchar", default: UserStatus.Active })
  status: UserStatus;

  @Column({ type: "varchar", unique: true, nullable: true })
  email: string;

  @Column({ type: "varchar", select: false })
  password: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 50, default: null })
  firstName: string;

  @Column({ type: "varchar", length: 50, default: null })
  lastName: string;

  @Column({ type: "varchar", length: 50, default: UserRole.User })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
