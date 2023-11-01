import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/model/user.entity";

@Entity("recipes")
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  recipeId: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  content: string;

  @Column({ type: "text", nullable: true })
  openingText: string;

  @Column({ type: "text", nullable: true })
  bodyText: string;

  @Column({ type: "text", nullable: true })
  ingredient: string;

  @Column({ type: "varchar", default: null })
  image: string;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "createdBy" })
  @Column({ type: "uuid" })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
