import { getConnection, getRepository } from "typeorm";

import { ILikeInput, IPostInput } from "../../interfaces/interfaces";
import { Post } from "../../models";
import { Post_Liked } from "../../models/Post_Liked";
import { IPostResponse } from "../service.intefaces";

export class PostService implements IPostResponse {
  async getPostByTitle(
    title: string,
    userId?: string
  ): Promise<Post | undefined> {
    return await getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .leftJoinAndSelect("post.community", "community")
      .loadRelationCountAndMap("post.likes", "post.likedUsers")
      .loadRelationCountAndMap(
        "post.isLiked",
        "post.likedUsers",
        "likes",
        (qb) => qb.andWhere("likes.userId = :userId", { userId })
      )
      .select("post")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name", "community.avatar"])
      .where("post.title = :title", { title: title })
      .getOne();
  }

  async likePost(input: ILikeInput): Promise<void> {
    await getRepository(Post_Liked).save(input);
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    await getRepository(Post_Liked)
      .createQueryBuilder()
      .delete()
      .from(Post_Liked)
      .where("userId = :userId", { userId })
      .andWhere("postId = :postId", { postId })
      .execute();
  }

  async getCommunityPosts(
    communityId: string,
    userId?: string
  ): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .loadRelationCountAndMap("posts.likes", "posts.likedUsers")
      .loadRelationCountAndMap(
        "posts.isLiked",
        "posts.likedUsers",
        "likes",
        (qb) => qb.andWhere("likes.userId = :userId", { userId })
      )
      .select("posts")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name"])
      .where("community.id = :communityId", { communityId: communityId })
      .getMany();
  }

  async getPostsByUser(username: string, userId?: string): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .loadRelationCountAndMap("posts.likes", "posts.likedUsers")
      .loadRelationCountAndMap(
        "posts.isLiked",
        "posts.likedUsers",
        "likes",
        (qb) => qb.andWhere("likes.userId = :userId", { userId })
      )
      .select("posts")
      .addSelect(["author.id", "author.username", "author.avatar"])
      .addSelect(["community.id", "community.name"])
      .where("author.username = :username", { username: username })
      .getMany();
  }

  async getAllPosts(userId?: string): Promise<Post[]> {
    return await getRepository(Post)
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.community", "community")
      .loadRelationCountAndMap("posts.likes", "posts.likedUsers")
      .loadRelationCountAndMap(
        "posts.isLiked",
        "posts.likedUsers",
        "likes",
        (qb) => qb.andWhere("likes.userId = :userId", { userId })
      )
      .select("posts")
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
