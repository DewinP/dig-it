import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communitiesSelector,
  fetchCommunities,
} from "../community/communities.slice";
import { CommunityBlock } from "../../components/CommunityBlock";

export const Communities: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { communities, isLoading, isError } = useAppSelector(
    communitiesSelector
  );
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (communities.length < 1) {
      dispatch(fetchCommunities());
    }
    setIsReady(true);
  }, [communities.length, dispatch]);

  if (isLoading || !isReady) {
    return <div>loading...</div>;
  }
  if (isError && !isLoading) {
    return <div>Error</div>;
  }

  return (
    <Stack>
      {communities.map((c) => (
        <CommunityBlock key={c.id} community={c} />
      ))}
    </Stack>
  );
};
