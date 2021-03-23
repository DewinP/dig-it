import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useRegisterMutation } from "../../app/services/auth";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../helpers/toErrorMap";
import { IRegisterInput } from "../../interfaces/interfaces";

export const Register: React.FC<{}> = () => {
  const [register] = useRegisterMutation();
  let history = useHistory();
  const initialValues: IRegisterInput = {
    username: "",
    email: "",
    password: "",
  };
  return (
    <Stack>
      <Flex justify="center">
        <Heading size="lg">Join Dig-it!</Heading>
      </Flex>
      <Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            try {
              await register(values).unwrap();
              history.push("/login");
            } catch (error) {
              if (error.status === 400) {
                setErrors(toErrorMap(error.data));
              }
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
                  name="email"
                  placeholder="email"
                  label="email"
                  width="400px"
                />
                <InputField
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
