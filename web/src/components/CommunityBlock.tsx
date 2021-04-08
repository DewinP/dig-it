import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../interfaces/interfaces";

import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { Link } from "react-router-dom";
import { SubscriptionButton } from "./SubscriptionButton";

interface CommunityBlockProps {
  community: ICommunity;
}
export const CommunityBlock: React.FC<CommunityBlockProps> = ({
  community,
}) => {
  const { isLoggedIn } = useAppSelector(selectCurrentUser);
  return (
    <Flex
      boxShadow="0px 0px 8px -6px black"
      h="100px"
      justify="space-between"
      p="10px"
    >
      <Stack>
        <Text
          fontSize="18px"
          as={Link}
          to={`/c/${community.name}`}
          fontWeight="semibold"
        >
          c/{community.name}
        </Text>

        <Text fontSize="15px">{community.description}</Text>
      </Stack>
      <Flex>
        <Flex justify="center" align="center">
          <Stack spacing={0} maxW="100px" justify="center" align="center">
            {isLoggedIn && <SubscriptionButton community={community} />}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};
