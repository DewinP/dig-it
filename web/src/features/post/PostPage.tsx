import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { usePostQuery } from "../../app/services/api";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { Layout } from "../../components/Layout";
import { LikeButton } from "../../components/LikeButton";
import { toAgoDateFormat } from "../../helpers/toAgoDateFormat";

interface RouteParams {
  postTitle: string;
}
export const PostPage: React.FC<{}> = () => {
  let { postTitle } = useParams<RouteParams>();
  let { isLoggedIn } = useAppSelector(selectCurrentUser);
  const { data: post, isLoading, isError } = usePostQuery(postTitle);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout>
      <Stack>
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="20px" fontWeight="bold">
              {post?.title}
            </Text>
            <Text fontSize="15px">u/{post?.author.username}</Text>
          </Box>
          <Text>{toAgoDateFormat(post?.createdAt)} </Text>
        </Flex>
        <Flex>
          <Text fontWeight="semibold">{post?.body}</Text>
        </Flex>
        <Stack>
          <ButtonGroup size="xs">
            <Button>share</Button>
            <Button>save</Button>
            <Button>report</Button>
            {isLoggedIn && post && (
              <LikeButton
                communityId={post.communityId}
                postId={post.id}
                isLiked={post.isLiked}
              />
            )}
          </ButtonGroup>
          <Divider />
        </Stack>
      </Stack>
    </Layout>
  );
};
