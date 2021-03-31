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
import { useHistory, useParams } from "react-router-dom";
import { usePostQuery } from "../../app/services/api";
import { Layout } from "../../components/Layout";

interface RouteParams {
  postTitle: string;
}
export const PostPage: React.FC<{}> = () => {
  let { postTitle } = useParams<RouteParams>();
  let history = useHistory();
  const { data, isLoading, isError } = usePostQuery(postTitle);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout>
      <Stack>
        <Button alignSelf="end" variant="link" onClick={() => history.goBack()}>
          {`<-- go back`}
        </Button>
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="20px" fontWeight="bold">
              {data?.title}
            </Text>
            <Text fontSize="15px">u/{data?.author.username}</Text>
          </Box>
          <Text>{data?.createdAt}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="semibold">{data?.body}</Text>
        </Flex>
        <Stack>
          <ButtonGroup size="xs">
            <Button>share</Button>
            <Button>like</Button>
            <Button>save</Button>
            <Button>report</Button>
          </ButtonGroup>
          <Divider />
        </Stack>
      </Stack>
    </Layout>
  );
};
