import React from "react";
import { Formik, Form } from "formik";
import { Flex, Heading, Stack, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../helpers/toErrorMap";
import { InputField } from "../../components/InputField";
import { useHistory } from "react-router-dom";
import { ILoginInput } from "../../interfaces/interfaces";
import { useLoginMutation } from "../../app/services/api";
import { Layout } from "../../components/Layout";

export const Login: React.FC<{}> = () => {
  const [login] = useLoginMutation();
  let history = useHistory();
  const initialValues: ILoginInput = { username: "", password: "" };
  return (
    <Layout showSidebar={false}>
      <Stack>
        <Flex justify="center">
          <Heading size="lg">Welcome back!</Heading>
        </Flex>
        <Stack>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors }) => {
              try {
                await login(values).unwrap();
                history.push("/");
              } catch (errors) {
                if (errors.status === 400) {
                  setErrors(toErrorMap(errors.data));
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
    </Layout>
  );
};
