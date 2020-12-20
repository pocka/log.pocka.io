import styled from "styled-components";

import { Post } from "@/utils/contents";

import { useI18n } from "@/hooks/useI18n";

import { SiteHead } from "@/components/SiteHead";
import { PostLink } from "@/components/organisms/PostLink";

import pkg from "@/../package.json";

import en from "./en.json";
import ja from "./ja.json";

const Main = styled.main`
  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      grid-column: 2;
    }
  }
`;

const PostLinkList = styled.ul`
  padding: 0;
  margin: 0;
  margin-block-start: calc(var(--baseline) * 1rem);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(var(--baseline) * 1rem);

  list-style: none;
`;

export interface TopPageProps {
  recentPosts: readonly Post[];
}

export const TopPage = ({ recentPosts }: TopPageProps) => {
  const { t } = useI18n({ en, ja });
  return (
    <>
      <SiteHead />
      <Main>
        <h1>{pkg.name}</h1>
        <h2>{t.recentPosts}</h2>
        <PostLinkList>
          {recentPosts.map((post) => (
            <PostLink
              title={post.title}
              href={`/posts/${post.name}`}
              updatedAt={post.updatedAt}
              tags={post.tags}
            />
          ))}
        </PostLinkList>
      </Main>
    </>
  );
};
