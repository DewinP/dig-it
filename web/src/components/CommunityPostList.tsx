import React from "react";
import { useCommunityPostsQuery } from "../app/services/api";
import { IPost } from "../interfaces/interfaces";
import { Post } from "./Post";

interface CommunityPostListProps {
  communityId: string;
}

export const CommunityPostList: React.FC<CommunityPostListProps> = ({
  communityId,
}) => {
  const { data, isLoading } = useCommunityPostsQuery(communityId);

  return (
    <>
      {data?.map((p) => {
        return <Post key={p.id} postData={p} showCommunity={true} />;
      })}
    </>
  );
};
