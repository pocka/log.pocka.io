import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Post } from "@/utils/contents";

import { useI18n } from "@/hooks/useI18n";

import { SiteHead } from "@/components/SiteHead";
import { Filter } from "@/components/organisms/Filter";
import { PostLink } from "@/components/organisms/PostLink";

import en from "./en.json";
import ja from "./ja.json";

const Search = styled(Filter)`
  @media ${({ theme }) => theme.queries.threeColumn} {
    position: sticky;
    top: calc(var(--baseline) * 1rem);
    margin: 0;
    margin-inline-start: auto;
    max-width: 200px;
  }
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(var(--baseline) * 1rem);
  padding: 0;
  margin: 0;
`;

const NoPost = styled.p`
  padding: calc(var(--baseline) * 1rem);

  text-align: center;
`;

export interface PostListProps {
  /**
   * A list of all tags available
   */
  tags: readonly string[];

  posts: readonly Post[];
}

export const PostList = ({ tags, posts }: PostListProps) => {
  const { t } = useI18n({ en, ja });

  const { query, replace } = useRouter();

  const normalizedQuery =
    typeof query.tag === "string"
      ? query.tag
      : query.tag instanceof Array
      ? query.tag[0]
      : null;

  const [tagName, setTagName] = useState(normalizedQuery || "");

  useEffect(() => {
    setTagName(normalizedQuery || "");
  }, [normalizedQuery]);

  const changeTagName = (tag: string) => {
    setTagName(tag);

    const url = new URL(location.href);

    url.searchParams.set("tag", tag);

    replace(url.pathname + url.search);
  };

  const filteredPosts = !tagName
    ? posts
    : posts.filter((post) => post.tags.some((tag) => tag.includes(tagName)));

  return (
    <>
      <SiteHead />
      <div>
        <Search
          id="posts_filter_by_tag"
          label={t.filter_by_tag}
          placeholder={t.tag_placeholder}
          options={tags}
          value={tagName}
          onChange={changeTagName}
        />
      </div>
      <main>
        {filteredPosts.length > 0 ? (
          <List>
            {filteredPosts.map((post) => (
              <PostLink
                title={post.title}
                href={`/posts/${post.name}`}
                updatedAt={post.updatedAt}
                tags={post.tags}
              />
            ))}
          </List>
        ) : (
          <NoPost>{t.no_posts}</NoPost>
        )}
      </main>
    </>
  );
};
