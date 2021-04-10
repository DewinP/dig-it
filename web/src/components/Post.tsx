import { Stack, Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { toAgoDateFormat } from "../helpers/toAgoDateFormat";
import { IPost } from "../interfaces/interfaces";
import { LikeButton } from "./LikeButton";

interface PostProps {
  showCommunity?: boolean;
  postData: IPost;
}

export const Post: React.FC<PostProps> = ({
  postData,
  showCommunity = true,
}) => {
  const { isLoggedIn } = useAppSelector(selectCurrentUser);
  return (
    <Stack borderRadius="1px" minH="100px" padding="10px">
      <Flex justify="space-between" align="center">
        <Box>
          <Flex>
            {showCommunity && (
              <Text fontSize="xs">c/{postData.community.name}</Text>
            )}
            <Text fontSize="xs">by u/{postData.author.username}</Text>
          </Flex>
          <Text
            as={Link}
            to={`/c/${postData.community.name}/${postData.title}`}
            fontSize="xl"
            fontWeight="semibold"
          >
            {postData.title}
          </Text>
        </Box>
        <Text fontSize="xs">{toAgoDateFormat(postData.createdAt)}</Text>
      </Flex>
      <Box>
        <Text fontWeight="semibold">{postData.body}</Text>
      </Box>
      <Flex>
        {isLoggedIn && (
          <LikeButton
            postId={postData.id}
            isLiked={postData.isLiked}
            communityId={postData.communityId}
            likes={postData.likes}
          />
        )}
      </Flex>
    </Stack>
  );
};
