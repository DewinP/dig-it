import { Stack, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useUserQuery } from "../../app/services/api";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";

interface RouteParams {
  username: string;
}

export const Profile: React.FC<{}> = () => {
  let { username } = useParams<RouteParams>();
  const { data, isLoading, isError } = useUserQuery(username);
  if (isLoading) {
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
            <p>Post will go here</p>
          </TabPanel>
          <TabPanel>
            <p>all comments</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};
