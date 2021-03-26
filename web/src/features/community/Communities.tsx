import { Stack } from "@chakra-ui/react";
import React from "react";
import { useCommunitiesQuery } from "../../app/services/api";
import { CommunityBlock } from "../../components/CommunityBlock";

export const Communities: React.FC<{}> = () => {
  const { data, isLoading, isError } = useCommunitiesQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Stack>
      {data?.map((c) => (
        <CommunityBlock key={c.id} community={c} />
      ))}
    </Stack>
  );
};
