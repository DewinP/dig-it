import {
  Avatar,
  Divider,
  Flex,
  Stack,
  Text,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  Switch,
  FormHelperText,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { Layout } from "../../components/Layout";

export const AccountSettings: React.FC<{}> = () => {
  let { user } = useAppSelector(selectCurrentUser);
  return (
    <Layout>
      <Tabs orientation="vertical" justifyContent="space-between">
        <TabList w="200px">
          <Tab>Account</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack justify="center">
              <Text fontWeight="semibold" opacity="50%">
                Your Avatar
              </Text>
              <Flex>
                <Avatar
                  size="lg"
                  name="avatar"
                  src="https://bit.ly/sage-adebayo"
                  mr="20px"
                />
                <Button
                  colorScheme="blue"
                  mr="20px"
                  size="sm"
                  alignSelf="center"
                  fontSize="xs"
                >
                  Upload New
                </Button>
                <Button size="sm" fontSize="xs" alignSelf="center">
                  Remove Avatar
                </Button>
              </Flex>
              <Divider />

              <Text fontWeight="semibold">Username: {user.username}</Text>

              <Text fontWeight="semibold">
                Number of Posts: {user.posts.length}
              </Text>

              <Text fontWeight="semibold">
                Number of subscriptions: {user.subscriptions.length}
              </Text>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack>
              <Text fontWeight="semibold" opacity="50%">
                Enable or Disable Notifications
              </Text>
              <Divider />
              <FormControl display="stack" alignItems="center">
                <Flex align="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Alert on account changes
                  </FormLabel>
                  <Switch
                    defaultChecked={true}
                    isDisabled={true}
                    id="email-alerts"
                  />
                </Flex>
                <FormHelperText m={0}>
                  Email me whenever a change is made on my personal information.
                </FormHelperText>
              </FormControl>
              <FormControl display="stack" alignItems="center">
                <Flex align="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Email me about Dig-It updates
                  </FormLabel>
                  <Switch id="email-alerts" />
                </Flex>
                <FormHelperText m={0}>
                  Email me whenever a Dig-It releases new features
                </FormHelperText>
              </FormControl>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};
