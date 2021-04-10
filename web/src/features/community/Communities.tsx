import { Stack } from "@chakra-ui/react";
import React from "react";
import { useCommunitiesQuery } from "../../app/services/api";
import { CommunityBlock } from "../../components/CommunityBlock";
import { Layout } from "../../components/Layout";

export const Communities: React.FC<{}> = () => {
  const { data, isLoading, isError } = useCommunitiesQuery();

  return (
    <Layout showSidebar={false}>
      <Stack>
        {data?.map((c) => (
          <CommunityBlock key={c.id} community={c} />
        ))}
      </Stack>
    </Layout>
  );
};
