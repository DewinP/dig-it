import { getRepository } from "typeorm";
import {
  ICommunityInput,
  ISubscriptionInput,
} from "../../interfaces/interfaces";
import { ICommunityResponse } from "../service.intefaces";
import { Community, Community_User } from "../../models";
export class CommunityService implements ICommunityResponse {
  async subscribeToCommunity(
    input: ISubscriptionInput
  ): Promise<Community_User> {
    return await getRepository(Community_User).save(input);
  }
  async unsubscribeFromCommunity(
    communityId: string,
    userId: string
  ): Promise<string> {
    let result = await getRepository(Community_User)
      .createQueryBuilder()
      .delete()
      .from(Community_User)
      .where("userId = :userId", { userId: userId })
      .andWhere("communityId = :communityId", { communityId: communityId })
      .returning("id")
      .execute();
    return result.raw[0].id;
  }
  async createCommunity(input: ICommunityInput): Promise<Community> {
    return await getRepository(Community).save(input);
  }

  async isSubscribed(userId: string, communityId: string) {
    const isSubscribed = await getRepository(Community_User)
      .createQueryBuilder("subscription")
      .where("subscription.userId = :userId", { userId })
      .andWhere("subscription.communityId = :communityId", { communityId })
      .getCount();

    return Boolean(isSubscribed);
  }

  async getCommunity(name: string): Promise<Community | undefined> {
    return await getRepository(Community)
      .createQueryBuilder("community")
      .leftJoinAndSelect("community.members", "members")
      .loadRelationCountAndMap("community.members", "community.members")
      .select(["community", "members"])
      .where("community.name = :name", { name: name })
      .getOne();
  }
  async getAllCommunities(userId?: string): Promise<Community[]> {
    let qb = getRepository(Community).createQueryBuilder("community");
    return await qb
      .leftJoinAndSelect("community.members", "members")
      .loadRelationCountAndMap(
        "community.isSubscribed",
        "community.members",
        "subscription",
        (qb) => qb.andWhere("subscription.userId = :userId", { userId })
      )
      .loadRelationCountAndMap("community.members", "community.members")
      .select(["community"])
      .getMany();
  }
}
