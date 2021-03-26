import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { IPost } from "../interfaces/interfaces";

interface CommunityPostProps {
  post: IPost;
  communityName: string;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  post,
  communityName,
}) => {
  return (
    <Stack
      backgroundColor="tomato"
      borderRadius="1px"
      minH="100px"
      padding="10px"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <NavLink to={`${communityName}/${post.title}`}>
            <Text fontSize="xl" fontWeight="semibold">
              {post.title}
            </Text>
          </NavLink>
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
