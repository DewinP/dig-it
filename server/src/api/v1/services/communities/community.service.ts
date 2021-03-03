import { getRepository } from "typeorm";
import { ICommunityInput } from "../../interfaces/interfaces";
import { ICommunityResponse } from "../service.intefaces";
import { Community } from "../../models";
//buy Bitcoin and go to the moon
export class CommunityService implements ICommunityResponse {
  async createCommunity(input: ICommunityInput): Promise<Community> {
    return await getRepository(Community).save(input);
  }
  async getCommunity(name: string): Promise<Community | undefined> {
    return await getRepository(Community)
      .createQueryBuilder("community")
      .leftJoinAndSelect("community.members", "members")
      .leftJoinAndSelect("community.posts", "posts")
      .leftJoinAndSelect("posts.author", "author")
      .select(["community", "posts", "members"])
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["members.id", "members.userId"])
      .where("community.name = :name", { name: name })
      .getOne();
  }
  async getAllCommunities(): Promise<Community[]> {
    return await getRepository(Community)
      .createQueryBuilder("community")
      .leftJoinAndSelect("community.founder", "founder")
      .loadRelationCountAndMap("community.members", "community.members")
      .loadRelationCountAndMap("community.posts", "community.posts")
      .select(["community"])
      .addSelect(["founder.id", "founder.username", "founder.avatar"])
      .getMany();
  }
}
