import { getConnection, getRepository } from "typeorm";

import { IPostInput } from "../../interfaces/interfaces";
import { Post } from "../../models";
import { IPostResponse } from "../service.intefaces";

export class PostService implements IPostResponse {
  async getPostByTitle(title: string): Promise<Post | undefined> {
    return await getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .leftJoinAndSelect("post.community", "community")
      .select("post")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name", "community.avatar"])
      .where("post.title = :title", { title: title })
      .getOne();
  }

  async getCommunityPosts(communityId: string): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .select("posts")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name"])
      .where("community.id = :communityId", { communityId: communityId })
      .getMany();
  }

  async getPostsByUser(username: string): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .select("posts")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name"])
      .where("author.username = :username", { username: username })
      .getMany();
  }

  async getAllPosts(): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .select(["posts"])
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name"])
      .getMany();
  }

  async createPost(input: IPostInput): Promise<string> {
    let result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(input)
      .returning("title")
      .execute();
    return result.raw[0].title;
  }
}
