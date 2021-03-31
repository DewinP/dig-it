import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useCommunityQuery,
  useCreatePostMutation,
} from "../../app/services/api";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { TextareaField } from "../../components/TextareaField";
import { toErrorMap } from "../../helpers/toErrorMap";
interface RouteParams {
  communityName: string;
}

export const CreatePost: React.FC<{}> = () => {
  let history = useHistory();
  const [createPost] = useCreatePostMutation();
  let { communityName } = useParams<RouteParams>();
  const { data, isLoading } = useCommunityQuery(communityName);
  const initialValues = { title: "", body: "" };
  if (isLoading) {
    return <div>...Loading</div>;
  } else
    return (
      <Layout>
        <Stack spacing={10}>
          <Flex justify="center">
            <Heading size="lg">Create new post</Heading>
          </Flex>
          <Stack>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { setErrors }) => {
                try {
                  let post = await createPost({
                    communityId: data!.id,
                    ...values,
                  }).unwrap();
                  history.push(`${post.title}`);
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
      </Layout>
    );
};
