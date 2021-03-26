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
  AlertIcon,
  Alert,
  AlertDescription,
  AlertTitle,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React from "react";

export const Account: React.FC<{}> = () => {
  return (
    <Stack spacing={0}>
      <Text fontWeight="semibold" fontSize="20px">
        Account Settings
      </Text>
      <Stack spacing={12}>
        <Stack spacing={4} direction="row" align="center">
          <Tabs size="md" w="100%" variant="enclosed">
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Change Password</Tab>
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
                  <Flex>
                    <Text fontWeight="semibold">Username:</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="semibold">Favorite Communities:</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="semibold">Bio:</Text>
                  </Flex>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Email Sent!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    We sent you a email with a code. Use this code to change
                    your password
                  </AlertDescription>
                </Alert>
                <HStack>
                  <PinInput>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
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
                      Email me whenever a change is made on my personal
                      information.
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
        </Stack>
      </Stack>
    </Stack>
  );
};
