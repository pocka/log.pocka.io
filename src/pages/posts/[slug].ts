import { GetStaticPaths, GetStaticProps } from "next";

import { doesFileExist, loadMarkdown, loadPosts } from "@/utils/contents";

import { PostPage, PostPageProps } from "@/components/pages/PostPage";

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
  const [[post, content, toc], alternate] = await Promise.all([
    loadMarkdown(`posts/en/${ctx.params!.slug}.md`),
    doesFileExist(`posts/ja/${ctx.params!.slug}.md`),
  ]);

  return {
    props: {
      content,
      toc,
      meta: post,
      translations: ["en", alternate && "ja"].filter((s): s is string => !!s),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths = await loadPosts("en");

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.name,
      },
    })),
    fallback: false,
  };
};

export default PostPage;
