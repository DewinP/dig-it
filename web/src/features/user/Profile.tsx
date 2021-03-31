import { Stack, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useUserPostQuery, useUserQuery } from "../../app/services/api";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";

interface RouteParams {
  username: string;
}

export const Profile: React.FC<{}> = () => {
  let { username } = useParams<RouteParams>();
  console.log("username:", username);
  const { data: userData, isLoading: userIsLoading, isError } = useUserQuery(
    username
  );
  const { data: userPosts, isLoading: postsIsLoading } = useUserPostQuery(
    username
  );
  console.log(userPosts);

  if (userIsLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Is error</div>;
  }
  return (
    <Layout>
      <Tabs isFitted>
        <TabList mb="1em">
          <Tab fontWeight="bold">Overview</Tab>
          <Tab fontWeight="bold">Posts</Tab>
          <Tab fontWeight="bold">Comments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Will show latest posts and messages</p>
          </TabPanel>
          <TabPanel>
            {userPosts?.map((p) => {
              return <Post key={p.id} postData={p} />;
            })}
          </TabPanel>
          <TabPanel>
            <p>all comments</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};
