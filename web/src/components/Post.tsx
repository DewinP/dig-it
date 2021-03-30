import {
  Stack,
  Flex,
  Box,
  ButtonGroup,
  Button,
  Divider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IPost } from "../interfaces/interfaces";

interface PostProps {
  postData: IPost;
}

export const Post: React.FC<PostProps> = ({ postData }) => {
  return (
    <Stack borderRadius="1px" minH="100px" padding="10px">
      <Flex justify="space-between" align="center">
        <Box>
          <Flex>
            <Text fontSize="xs">by u/{postData.author.username}</Text>
          </Flex>
          <Text
            as={Link}
            to={`${postData.community.name}/${postData.title}`}
            fontSize="xl"
            fontWeight="semibold"
          >
            {postData.title}
          </Text>
        </Box>
        <Text fontSize="xs">Place holder date</Text>
      </Flex>
      <Box>
        <Text fontWeight="semibold">{postData.body}</Text>
      </Box>
    </Stack>
  );
};
