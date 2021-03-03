import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { InputField } from "../../components/InputField";
import { TextareaField } from "../../components/TextareaField";
import { toErrorMap } from "../../helpers/toErrorMap";
import { ICommunityInput } from "../../interfaces/interfaces";
import { createCommunity } from "../community/community.slice";

export const CreateCommunity: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const initialValues: ICommunityInput = { name: "", description: "" };
  return (
    <Stack spacing={10}>
      <Flex justify="center">
        <Heading size="lg">Create your a community</Heading>
      </Flex>
      <Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            try {
              const resultAction = await dispatch(createCommunity(values));
              unwrapResult(resultAction);
              console.log("resilt", resultAction.payload);
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
  );
};
