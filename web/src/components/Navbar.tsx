import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useLogoutMutation, useMeQuery } from "../app/services/api";
import { selectCurrentUser } from "../app/services/auth.slice";
import { BsFillCaretDownFill } from "react-icons/bs";

export const Navbar: React.FC<{}> = () => {
  // let { isLoading } = useMeQuery();
  let { user, isLoggedIn } = useAppSelector(selectCurrentUser);
  let [logout] = useLogoutMutation();
  let history = useHistory();
  return (
    <>
      <Flex
        h="50px"
        w="100%"
        boxShadow="0 2px 10px -10px black"
        zIndex={2}
        top="0"
        justify="space-between"
        paddingX={{ base: "0px", md: "50px" }}
        align="center"
      >
        <Flex>
          <NavLink to="/">
            <Heading cursor="pointer">Dig-it</Heading>
          </NavLink>
        </Flex>
        <Flex>
          {isLoggedIn && (
            <Flex>
              <NavLink to="/create-community">
                <Text mr="20px">Create community</Text>
              </NavLink>
              <NavLink to="/c">
                <Text mr="20px">Communities</Text>
              </NavLink>
              <Menu>
                <MenuButton
                  p="0"
                  as={Button}
                  variant="link"
                  fontWeight="bold"
                  rightIcon={<BsFillCaretDownFill />}
                >
                  {user.username}
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to={`/u/${user.username}`}>
                    Profile
                  </MenuItem>
                  <MenuItem as={Link} to="/account">
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      history.push("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
          {!isLoggedIn && (
            <Fragment>
              <Text as={Link} to="/login" mr="20px">
                Login
              </Text>
              <Text as={Link} to="/register">
                Register
              </Text>
            </Fragment>
          )}
        </Flex>
      </Flex>
    </>
  );
};
