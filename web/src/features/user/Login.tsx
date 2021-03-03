import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "./user.slice";
import { Formik, Form } from "formik";
import { Flex, Heading, Stack, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../helpers/toErrorMap";
import { InputField } from "../../components/InputField";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { ILoginInput } from "../../interfaces/interfaces";

export const Login: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const initialValues: ILoginInput = { username: "", password: "" };
  return (
    <Stack>
      <Flex justify="center">
        <Heading size="lg">Welcome back!</Heading>
      </Flex>
      <Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            try {
              const resultAction = await dispatch(loginUser(values));
              unwrapResult(resultAction);
              history.push("/");
            } catch (fieldErrors) {
              setErrors(toErrorMap(fieldErrors));
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack align="center">
                <InputField
                  name="username"
                  placeholder="username"
                  label="username"
                  width="400px"
                />
                <InputField
                  type="password"
                  name="password"
                  placeholder="password"
                  label="password"
                  width="400px"
                />
                <Button
                  w="400px"
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login to Dig-it
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};
