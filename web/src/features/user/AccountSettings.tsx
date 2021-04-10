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
    <Layout showSidebar={false}>
      <Tabs orientation="vertical" justifyContent="space-between">
        <TabList w="200px">
          <Tab>Account</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack justify="center"></Stack>
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
