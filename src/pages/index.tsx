import { isAfter } from "date-fns";
import type { GetStaticProps } from "next";

import { loadPosts } from "@/utils/contents";

import { TopPageProps } from "@/components/pages/TopPage";

export const getStaticProps: GetStaticProps<TopPageProps> = async (ctx) => {
  const allPosts = await loadPosts("en");

  return {
    props: {
      recentPosts: [...allPosts]
        .sort((a, b) =>
          isAfter(new Date(a.updatedAt), new Date(b.updatedAt)) ? -1 : 1
        )
        .slice(0, 3),
    },
  };
};

export { TopPage as default } from "@/components/pages/TopPage";
