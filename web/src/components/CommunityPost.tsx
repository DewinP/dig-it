import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
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
        <Stack>
          <Text
            as={Link}
            to={`${communityName}/${post.title}`}
            fontSize="xl"
            fontWeight="semibold"
          >
            {post.title}
          </Text>
          <Text as={Link} to={`/u/${post.author.username}`} fontSize="xs">
            by u/{post.author.username}
          </Text>
        </Stack>
        <Text fontSize="xs">{post.createdAt}</Text>
      </Flex>
      <Box>
        <Text fontWeight="semibold">{post.body}</Text>
      </Box>
    </Stack>
  );
};
