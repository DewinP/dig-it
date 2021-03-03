import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex justify="center">
        <Box w="800px" minW="500px" mt={6}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
