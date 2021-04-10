import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CommunityMenu } from "../../components/CommunityMenu";
import {
  useCommunityQuery,
  useCommunityPostsQuery,
} from "../../app/services/api";
import { Layout } from "../../components/Layout";
import { CommunityHeader } from "../../components/CommunityHeader";
import { Post } from "../../components/Post";

interface RouteParams {
  communityName: string;
}
export const Community: React.FC<{}> = () => {
  let { communityName } = useParams<RouteParams>();
  const { data: communityData, isSuccess } = useCommunityQuery(communityName);
  const { data: communityPosts } = useCommunityPostsQuery(
    communityData?.id ?? "",
    {
      skip: !isSuccess,
    }
  );
  return (
    <Layout
      showSidebar={true}
      communityHeader={<CommunityHeader community={communityData} />}
    >
      <Stack>
        <CommunityMenu communityName={communityName} />
        {communityPosts ? (
          communityPosts.map((p) => {
            return <Post postData={p} showCommunity={false} />;
          })
        ) : (
          <Text>No posts in this community. Be the first one!</Text>
        )}
      </Stack>
    </Layout>
  );
};
