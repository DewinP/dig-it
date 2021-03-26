import React from "react";
import { Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/services/auth.slice";

export const AuthProfile: React.FC<{}> = () => {
  let { user } = useAppSelector(selectCurrentUser);
  let history = useHistory();
  return <Stack></Stack>;
};
