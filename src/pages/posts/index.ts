import type { GetStaticProps } from "next";

import { loadPosts } from "@/utils/contents";

import { PostList, PostListProps } from "@/components/pages/PostList";

export const getStaticProps: GetStaticProps<PostListProps> = async (ctx) => {
  const posts = await loadPosts("en");

  const tags = posts
    .map((post) => post.tags)
    .flat()
    .filter((tag, i, tags) => tags.indexOf(tag) === i);

  return {
    props: {
      tags,
      posts,
    },
  };
};

export default PostList;
