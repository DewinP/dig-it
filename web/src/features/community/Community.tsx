import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import { CommunityPost } from "../../components/CommunityPost";
import { useCommunityQuery } from "../../app/services/api";
import { Layout } from "../../components/Layout";
import { CommunityPostList } from "../../components/CommunityPostList";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  let { communityName } = useParams<RouteParams>();
  const { data: communityData, isLoading, isError } = useCommunityQuery(
    communityName
  );
  console.log("communityInfo", communityData);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout showSidebar={true}>
      <Stack>
        <CommunityMenu communityName={communityName} />
        <Text>No posts in this community. Be the first one!</Text>
      </Stack>
    </Layout>
  );
};
