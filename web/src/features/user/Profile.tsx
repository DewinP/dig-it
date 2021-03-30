import { Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useUserQuery } from "../../app/services/api";
import { selectCurrentUser } from "../../app/services/auth.slice";
import { Layout } from "../../components/Layout";

interface RouteParams {
  username: string;
}
export const Profile: React.FC<{}> = () => {
  let { user } = useAppSelector(selectCurrentUser);
  let { username } = useParams<RouteParams>();
  const { data, isLoading } = useUserQuery(username);
  return (
    <Layout>
      <Stack>
        <Text>{data?.username}</Text>
      </Stack>
    </Layout>
  );
};
