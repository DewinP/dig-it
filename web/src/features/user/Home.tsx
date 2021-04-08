import React from "react";
import { useAllPostsQuery } from "../../app/services/api";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";

export const Home: React.FC<{}> = () => {
  const { data } = useAllPostsQuery();
  console.log(data);
  return (
    <Layout>
      {data?.map((p) => {
        return <Post postData={p} />;
      })}
    </Layout>
  );
};
