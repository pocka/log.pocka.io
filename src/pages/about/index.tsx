import { GetStaticProps } from "next";

import { loadMarkdown } from "@/utils/contents";

import { AboutPageProps } from "@/components/pages/AboutPage";

export const getStaticProps: GetStaticProps<AboutPageProps> = async (ctx) => {
  const [meta, content] = await loadMarkdown(`about.en.md`);

  return {
    props: { content, meta },
  };
};

export { AboutPage as default } from "@/components/pages/AboutPage";
