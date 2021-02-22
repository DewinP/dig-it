import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Community } from "./Community";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  authorId: string;

  @Column()
  communityId: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Community, (community) => community.posts)
  community: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
