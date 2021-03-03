import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IPost } from "../interfaces/interfaces";

interface CommunityPostProps {
  post: IPost;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  return (
    <Stack
      backgroundColor="tomato"
      borderRadius="1px"
      minH="100px"
      padding="10px"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="xl" fontWeight="semibold">
            {post.title}
          </Text>
          <Text fontSize="xs">by u/{post.author.username}</Text>
        </Box>
        <Text fontSize="xs">Place holder date</Text>
      </Flex>
      <Box>
        <Text fontWeight="semibold">{post.body}</Text>
      </Box>
    </Stack>
  );
};
