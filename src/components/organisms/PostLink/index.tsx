import { format, formatDistanceStrict } from "date-fns";
import { enUS, ja } from "date-fns/locale";
import { useMemo } from "react";
import styled from "styled-components";

import { useLocale } from "@/hooks/useLocale";

import { Link } from "@/components/Link";

const Container = styled.li`
  border: 1px solid var(--color-bg-accent);
  padding: calc(var(--baseline) * 0.5rem) 1em;

  border-radius: 0.25em;
`;

const Title = styled.a`
  display: block;
  line-height: calc(var(--baseline) * 1rem);
`;

const UpdatedAt = styled.time`
  display: block;
  font-size: 0.8rem;
  line-height: calc(var(--baseline) * 1rem);
`;

const Tags = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  line-height: calc(var(--baseline) * 1rem);
  margin-block-start: calc(var(--baseline) * -0.25rem);
  margin-inline-start: -0.5em;

  list-style: none;
`;

const Tag = styled.li`
  margin-block-start: calc(var(--baseline) * 0.25rem);
  margin-inline-start: 0.5em;
  padding: 0 0.5em;

  background-color: var(--color-bg-accent);
  border-radius: 0.1em; ;
`;

export interface PostLinkProps {
  title: string;
  href: string;

  updatedAt: string;

  tags: readonly string[];
}

export const PostLink = ({ title, updatedAt, tags, href }: PostLinkProps) => {
  const { locale } = useLocale();

  const updatedAtDistance = useMemo(() => {
    return formatDistanceStrict(new Date(updatedAt), new Date(), {
      locale: locale === "ja" ? ja : enUS,
      addSuffix: true,
    });
  }, [updatedAt, locale]);

  const updatedAtLocal = useMemo(() => {
    return format(new Date(updatedAt), "yyyy-MM-dd");
  }, [updatedAt]);

  return (
    <Container>
      <Link href={href} passHref>
        <Title>{title}</Title>
      </Link>
      <div>
        <UpdatedAt dateTime={updatedAt} title={updatedAtLocal}>
          {updatedAtDistance}
        </UpdatedAt>
      </div>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>
            <Link href={`/posts?tag=${tag}`}>
              <a>{tag}</a>
            </Link>
          </Tag>
        ))}
      </Tags>
    </Container>
  );
};
