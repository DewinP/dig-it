import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchMe, userSelector } from "../features/user/user.slice";

export const Navbar: React.FC<{}> = () => {
  let { user, isLoggedIn } = useAppSelector(userSelector);
  let dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(fetchMe());
    }
  });
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
          {isLoggedIn ? (
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
          ) : (
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
