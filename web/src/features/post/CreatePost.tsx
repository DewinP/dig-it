import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useCreatePostMutation } from "../../app/services/api";
import { InputField } from "../../components/InputField";
import { TextareaField } from "../../components/TextareaField";
import { toErrorMap } from "../../helpers/toErrorMap";

interface CreatePostProps {
  communityId: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ communityId }) => {
  let history = useHistory();
  const initialValues = { title: "", body: "", communityId };
  const [createPost] = useCreatePostMutation();
  return (
    <Stack spacing={10}>
      <Flex justify="center">
        <Heading size="lg">Create new post</Heading>
      </Flex>
      <Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            try {
              await createPost(values).unwrap();
              history.goBack();
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
                  name="title"
                  placeholder="post title"
                  label="Title"
                  width="400px"
                  limit={25}
                />
                <TextareaField
                  name="body"
                  placeholder="...share your mind"
                  width="400px"
                />
                <Button
                  mt={4}
                  colorScheme="pink"
                  isLoading={isSubmitting}
                  type="submit"
                  width="400px"
                >
                  Post
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};
