import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../interfaces/interfaces";
import { FaUserAstronaut } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { NavLink } from "react-router-dom";
import { useSubcribeMutation } from "../app/services/api";

interface CommunityBlockProps {
  community: ICommunity;
  userId?: string;
}
export const CommunityBlock: React.FC<CommunityBlockProps> = ({
  community,
}) => {
  const { user } = useAppSelector(selectCurrentUser);
  const [subscribe, { isLoading }] = useSubcribeMutation();
  const SubscribeButton = () => {
    let isSubscribed = user.subscriptions?.find(
      (subscription) => subscription.communityId === community.id
    );
    if (isSubscribed) {
      return <Button size="sm">unsubscribe</Button>;
    } else {
      return (
        <Button
          size="sm"
          colorScheme="pink"
          isLoading={isLoading}
          onClick={() => subscribe(community.id)}
        >
          subscribe
        </Button>
      );
    }
  };

  return (
    <Flex
      boxShadow="0px 0px 8px -6px black"
      h="100px"
      justify="space-between"
      p="10px"
    >
      <Stack>
        <NavLink to={`/c/${community.name}`}>
          <Text fontSize="18px" fontWeight="semibold">
            {community.name}
          </Text>
        </NavLink>
        <Text fontSize="15px">{community.description}</Text>
      </Stack>
      <Flex>
        <Flex justify="center" align="center">
          <Stack spacing={0} justify="center" align="center">
            <Flex align="center">
              <FaUserAstronaut />
              <Text ml="5px">{community.members}</Text>
            </Flex>
            <Text fontStyle="semibold" ml="sm">
              members
            </Text>
            {user && <SubscribeButton />}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};
