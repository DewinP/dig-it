import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useCreateCommunityMutation } from "../../app/services/api";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { TextareaField } from "../../components/TextareaField";
import { toErrorMap } from "../../helpers/toErrorMap";
import { ICommunityInput } from "../../interfaces/interfaces";

export const CreateCommunity: React.FC<{}> = () => {
  const [createCommunity] = useCreateCommunityMutation();
  let history = useHistory();
  const initialValues: ICommunityInput = { name: "", description: "" };
  return (
    <Layout>
      <Stack spacing={10}>
        <Flex justify="center">
          <Heading size="lg">Create your a community</Heading>
        </Flex>
        <Stack>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors }) => {
              try {
                let c = await createCommunity(values).unwrap();
                history.push(`/c/${c.name}`);
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
                    name="name"
                    placeholder="name your community"
                    label="Community name"
                    width="400px"
                    limit={25}
                  />
                  <TextareaField
                    label="Community description"
                    name="description"
                    placeholder="...whats your community about"
                    width="400px"
                  />
                  <Button
                    mt={4}
                    colorScheme="pink"
                    isLoading={isSubmitting}
                    type="submit"
                    width="400px"
                  >
                    Create Community
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
