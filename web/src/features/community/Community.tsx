import React from "react";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import { CommunityPost } from "../../components/CommunityPost";
import { useCommunityQuery } from "../../app/services/api";
import { Layout } from "../../components/Layout";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  let { communityName } = useParams<RouteParams>();
  const { data, isLoading, isError } = useCommunityQuery(communityName);
  console.log(data);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout>
      <Stack>
        <CommunityMenu communityName={communityName} />
        {data?.posts.map((p) => {
          return (
            <CommunityPost key={p.id} communityName={communityName} post={p} />
          );
        })}
      </Stack>
    </Layout>
  );
};
