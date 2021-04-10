import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import { CommunityPost } from "../../components/CommunityPost";
import { useCommunityQuery } from "../../app/services/api";
import { Layout } from "../../components/Layout";
import { CommunityPostList } from "../../components/CommunityPostList";
import { CommunityHeader } from "../../components/CommunityHeader";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  let { communityName } = useParams<RouteParams>();
  const { data: communityData, isLoading, isError } = useCommunityQuery(
    communityName
  );
  return (
    <Layout
      showSidebar={true}
      communityHeader={<CommunityHeader community={communityData} />}
    >
      <Stack>
        <CommunityMenu communityName={communityName} />
        {/* Need to add post list*/}
        <Text>No posts in this community. Be the first one!</Text>
      </Stack>
    </Layout>
  );
};
