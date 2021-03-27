import {
  Heading,
  Image,
  ImageProps,
  keyframes,
  Stack,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
export const LoadingLogo: React.FC<{}> = ({}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 4s linear`;

  return (
    <Stack justify="center" align="center" w="100vw" h="100vh">
      <Heading size="2xl" animation={animation}>
        DIG-IT
      </Heading>
      ;
    </Stack>
  );
};
