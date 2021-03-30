import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
