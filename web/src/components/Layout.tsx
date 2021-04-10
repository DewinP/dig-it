import {
  Flex,
  Box,
  Stack,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { start } from "node:repl";
import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  communityHeader?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  communityHeader,
}) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={12}>
        <Navbar />
      </GridItem>
      {communityHeader}
      <GridItem
        mt="1rem"
        colStart={showSidebar ? 2 : 3}
        colSpan={showSidebar ? 7 : 8}
      >
        {children}
      </GridItem>
      {showSidebar && (
        <GridItem mt="1rem" colSpan={3}>
          <Sidebar />
        </GridItem>
      )}
    </Grid>
  );
};
