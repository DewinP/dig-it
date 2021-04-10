import {
  Flex,
  GridItem,
  Text,
  Image,
  Stack,
  Grid,
  Box,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../interfaces/interfaces";
import { SubscriptionButton } from "./SubscriptionButton";

interface CommunityHeaderProps {
  community?: ICommunity;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  community,
}) => {
  return (
    <>
      <GridItem colSpan={12}>
        <Image
          h="150px"
          w="100%"
          src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"
        />
      </GridItem>
      <GridItem colSpan={10} colStart={2}>
        <Stack>
          <Flex align="center">
            <Text fontWeight="bold" fontSize="30px" mr="20px">
              {community?.name}
            </Text>
            {community && <SubscriptionButton community={community} />}
          </Flex>
        </Stack>
        <Divider />
      </GridItem>
    </>
  );
};
