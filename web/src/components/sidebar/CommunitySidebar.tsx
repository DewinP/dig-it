import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useCommunityQuery } from "../../app/services/api";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { SubscriptionButton } from "../SubscriptionButton";

interface RouteParams {
  communityName: string;
}

interface CommunitySidebarProps {}

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({}) => {
  let { communityName } = useParams<RouteParams>();
  const { data: communityData } = useCommunityQuery(communityName);
  let { isLoggedIn } = useAppSelector(selectCurrentUser);

  return (
    <Box boxShadow="0px 0px 8px -6px black">
      <Flex padding="1rem" bg="linkedin.200">
        <Text fontWeight="semibold">About this community</Text>
      </Flex>
      <Stack padding="1rem">
        <Text fontSize="15px">{communityData?.description}</Text>
        <Divider />
        <Text fontSize="15px">Members: {communityData?.members}</Text>
        {isLoggedIn && communityData && (
          <NavLink to={`${communityData?.name}/submit`}>
            <Button colorScheme="teal" size="sm" w="100%">
              create post
            </Button>
          </NavLink>
        )}
      </Stack>
    </Box>
  );
};
