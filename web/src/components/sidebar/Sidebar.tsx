import { Stack } from "@chakra-ui/layout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CommunitySidebar } from "./CommunitySidebar";
import { HomeSidebar } from "./HomeSidebar";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Switch>
      <Route path="/c/:communityName" component={CommunitySidebar} exact />
    </Switch>
  );
};
