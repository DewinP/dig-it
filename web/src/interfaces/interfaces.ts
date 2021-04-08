export interface IPost {
  id: string;
  title: string;
  body: string;
  authorId: string;
  communityId: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  community: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostInput {
  title: string;
  body: string;
  communityId: string;
}
export interface IMe {
  id: string;
  username: string;
  email: string;
  posts: IPost[];
  subscriptions: ISubscription[];
  createdAt: Date;
}

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  posts: IPost[];
  createdAt: Date;
}

export interface ISubscription {
  id: string;
  userId: string;
  communityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface IRegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface IFieldError {
  field: string;
  message: string;
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
  isSubscribed: boolean;
}

export interface ICommunityInput {
  name: string;
  description: string;
}
