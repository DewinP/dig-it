import {
  IPostInput,
  ILoginInput,
  IRegisterInput,
  ISubscriptionInput,
  ICommunityInput,
} from "../interfaces/interfaces";
import { Community, Community_User, Post, User } from "../models";

export interface IPostResponse {
  getPostByTitle(title: string): Promise<Post | undefined>;
  getCommunityPosts(communityId: string): Promise<Post[]>;
  getPostsByUser(username: string): Promise<Post[]>;
  getAllPosts(): Promise<Post[]>;
  createPost(input: IPostInput): Promise<string>;
}

export interface IAuthResponse {
  register(input: IRegisterInput): Promise<User>;
  login(input: ILoginInput): Promise<User | undefined>;
  me(username: string): Promise<User>;
}

export interface IUserResponse {
  subscribeToCommunity(input: ISubscriptionInput): Promise<Community_User>;
  getUserByUsername(authorId: string): Promise<User | undefined>;
  getMe(username: string): Promise<User | undefined>;
  addUser(input: IRegisterInput): Promise<User>;
}

export interface ICommunityResponse {
  subscribeToCommunity(input: ISubscriptionInput): Promise<Community_User>;
  createCommunity(input: ICommunityInput): Promise<Community>;
  unsubscribeFromCommunity(
    communityId: string,
    userId: string
  ): Promise<string>;
  getCommunity(name: string): Promise<Community | undefined>;
  getAllCommunities(userId?: string): Promise<Community[]>;
  isSubscribed(userId: string, communityId: string): Promise<boolean>;
}
