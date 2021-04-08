import { Comment, Post, Community_User, Community } from "../models";

export interface IUserMe {
  id: string;
  email: string;
  username: string;
  created_at: Date;
  posts: Post[] | null;
  comments: Comment[] | null;
  communities: Community[];
  subscriptions: Community_User[] | null;
  isAdmin: boolean;
}

export interface ICommunityInput {}

export interface ISubscribedCommunity {
  id: string;
  user_ID: string;
  community_ID: string;
  created_at: Date;
}

export interface IAuthFieldInput {
  username: string;
  email?: string;
  password: string;
}

export interface IFieldError {
  field: string;
  message: string;
}

export interface IRegisterInput {
  username: string;
  password: string;
  email: string;
}

export interface ISubscriptionInput {
  userId: string;
  communityId: string;
}

export interface ICommunityInput {
  name: string;
  description: string;
  avatar?: string;
  hero_img?: string;
  founderId: string;
}

export interface IPostInput {
  title: string;
  body: string;
  authorId: string;
  communityId: string;
}

export interface ICommunity {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: number;
  hero_img: string;
  founderId: string;
  createdAt: Date;
  updatedAt: Date;
  isSubscribedByUser: boolean;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export enum HttpResponseStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface HttpResponse {
  status: HttpResponseStatus;
  fieldErrors?: IFieldError[];
}
