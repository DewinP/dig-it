import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Stack } from "@chakra-ui/react";
import { fetchCommunity, communitySelector } from "./community.slice";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import { CommunityPost } from "../../components/CommunityPost";
import { IPost } from "../../interfaces/interfaces";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  const { community, isError, isLoading } = useAppSelector(communitySelector);
  const dispatch = useAppDispatch();
  let { communityName } = useParams<RouteParams>();
  let posts = community.posts as IPost[];

  useEffect(() => {
    if (community.name === communityName) {
    } else {
      dispatch(fetchCommunity(communityName));
    }
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError && !isLoading) {
    return <div>Error</div>;
  }
  return (
    <Stack>
      <CommunityMenu />
      {posts?.map((p) => {
        return <CommunityPost key={p.id} post={p} />;
      })}
    </Stack>
  );
};
