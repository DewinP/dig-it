import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Community_User } from "./Community_User";
import { Community } from "./Community";
import {
  MaxLength,
  MinLength,
  IsAlphanumeric,
  IsNotEmpty,
  IsEmail,
} from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email!: string;

  @MaxLength(20)
  @MinLength(3)
  @IsAlphanumeric()
  @IsNotEmpty()
  @Column({ unique: true })
  username!: string;

  @MinLength(4)
  @IsNotEmpty()
  @Column({ select: false })
  password!: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Community, (community) => community.founder)
  communities: Community[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Community_User, (community_user) => community_user.user)
  subscriptions: Community_User[];
}
