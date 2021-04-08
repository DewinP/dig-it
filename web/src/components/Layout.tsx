import { Flex, Box, Stack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  return (
    <>
      <Navbar />
      <Flex justify="center" align="top" mt={6}>
        <Box w="800px" minW="500px">
          {children}
        </Box>
        {showSidebar && <Sidebar />}
      </Flex>
    </>
  );
};
