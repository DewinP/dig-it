import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Post, User } from ".";
import { Community_User } from "./Community_User";

@Entity()
export class Community extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  hero_img: string;

  @Column()
  founderId!: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @ManyToOne(() => User, (user) => user.communities)
  founder: User;

  @OneToMany(() => Community_User, (community_user) => community_user.community)
  members: Community_User[];
}
