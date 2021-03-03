import React from "react";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";

interface CommunityMenuProps {}

export const CommunityMenu: React.FC<CommunityMenuProps> = ({}) => {
  return (
    <Flex w="100%" h="35px" align="center" justify="space-between">
      <Flex align="center">
        <Text fontWeight="semibold" mr="5px">
          Sort By:
        </Text>
        <Select
          bg="tomato"
          borderColor="tomato"
          color="white"
          size="sm"
          w="100px"
        >
          <option value="option1">New</option>
          <option value="option3">Top</option>
        </Select>
      </Flex>
      <Input size="sm" w="sm" placeholder="search by title or author" />
      <Button colorScheme="pink" size="sm">
        create post
      </Button>
    </Flex>
  );
};
