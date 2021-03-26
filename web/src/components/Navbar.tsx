import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useMeQuery } from "../app/services/api";
import { selectCurrentUser } from "../app/services/auth.slice";

export const Navbar: React.FC<{}> = () => {
  let { isLoading } = useMeQuery();
  let { user } = useAppSelector(selectCurrentUser);
  return (
    <>
      <Flex
        h="50px"
        w="100%"
        boxShadow="0 2px 10px -10px black"
        zIndex={2}
        top="0"
        justify="space-between"
        align="center"
        paddingX="50px"
      >
        <Flex>
          <NavLink to="/">
            <Heading cursor="pointer">Dig-it</Heading>
          </NavLink>
        </Flex>
        <Flex>
          {user.id && !isLoading && (
            <Flex>
              <NavLink to="/create-community">
                <Text mr="20px">Create community</Text>
              </NavLink>
              <NavLink to="/c">
                <Text mr="20px">Communities</Text>
              </NavLink>
              <NavLink to="/account">
                <Text mr="20px">Account</Text>
              </NavLink>
              <Text>{user.username}</Text>
            </Flex>
          )}
          {!isLoading && !user.id && (
            <Fragment>
              <NavLink to="/login">
                <Text mr="20px">Login</Text>
              </NavLink>
              <NavLink to="/register">
                <Text>Register</Text>
              </NavLink>
            </Fragment>
          )}
        </Flex>
      </Flex>
    </>
  );
};
