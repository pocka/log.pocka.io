import Head from "next/head";
import styled from "styled-components";

import { Post } from "@/utils/contents";

import { Hast, useHast } from "@/hooks/useHast";

import { SiteHead } from "@/components/SiteHead";

const Main = styled.main`
  grid-column: 1 / -1;

  @media ${({ theme }) => theme.queries.threeColumn} {
    & {
      grid-column: 2;
    }
  }
`;

export interface AboutPageProps {
  content: Hast;
  meta: Post;
}

export const AboutPage = ({ content, meta }: AboutPageProps) => {
  const element = useHast(content);

  return (
    <>
      <Head>
        <title>About || log.pocka.io</title>
      </Head>
      <SiteHead />
      <Main>
        <h1>{meta.title}</h1>
        <div>{element}</div>
      </Main>
    </>
  );
};
