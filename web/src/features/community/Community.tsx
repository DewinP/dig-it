import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import { CommunityPost } from "../../components/CommunityPost";
import { useCommunityQuery, useSubcribeMutation } from "../../app/services/api";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  let { communityName } = useParams<RouteParams>();
  const { data, isLoading, isError } = useCommunityQuery(communityName);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Stack>
      <CommunityMenu communityName={communityName} />
      {data?.posts.map((p) => {
        return (
          <CommunityPost key={p.id} communityName={communityName} post={p} />
        );
      })}
    </Stack>
  );
};
