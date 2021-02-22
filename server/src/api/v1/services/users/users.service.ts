import { getRepository } from "typeorm";
import {
  IRegisterInput,
  ISubscriptionInput,
} from "../../interfaces/interfaces";
import { Community_User, User } from "../../models";
import { IUserResponse } from "../service.intefaces";
export class UserService implements IUserResponse {
  async subscribeToCommunity(
    input: ISubscriptionInput
  ): Promise<Community_User> {
    return await getRepository(Community_User).save(input);
  }
  async addUser(input: IRegisterInput): Promise<User> {
    return await getRepository(User).save(input);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "posts")
      .leftJoinAndSelect("user.subscriptions", "subscriptions")
      .select(["user", "posts"])
      .where("user.username = :username", { username: username })
      .getOne();
  }
  async getMe(username: string): Promise<User | undefined> {
    return await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "posts")
      .leftJoinAndSelect("user.comments", "comments")
      .leftJoinAndSelect("user.subscriptions", "subscriptions")
      .leftJoinAndSelect("user.communities", "communities")
      .select(["user", "posts", "comments", "communities"])
      .addSelect(["subscriptions.id", "subscriptions.communityId"])
      .addSelect("user.password")
      .where("user.username = :username", { username: username })
      .getOne();
  }
}
