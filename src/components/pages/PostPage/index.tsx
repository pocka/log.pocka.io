import { format, differenceInDays } from "date-fns";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { Post } from "@/utils/contents";
import { pathFor } from "@/utils/i18n";

import { Hast, useHast } from "@/hooks/useHast";
import { useI18n } from "@/hooks/useI18n";
import { useLocale } from "@/hooks/useLocale";

import { SiteHead } from "@/components/SiteHead";

import {
  Alert,
  Header,
  Links,
  Main,
  Meta,
  Nav,
  Sidebar,
  YoutubeEmbed,
} from "./styles";

import en from "./en.json";
import ja from "./ja.json";

import "prism-themes/themes/prism-a11y-dark.css";

export interface PostPageProps {
  content: Hast;
  toc: Hast;
  meta: Post;

  translations: string[];
}

const TOO_OLD_THRESHOLD = 365 * 3;
const OLD_THRESHOLD = 365;

export const PostPage = ({
  content,
  toc,
  meta,
  translations,
}: PostPageProps) => {
  const element = useHast(content, {
    "blog-alert": Alert,
    "blog-youtube": YoutubeEmbed,
  });
  const tocElement = useHast(
    toc,
    {
      nav: Nav,
      ol: Links,
    },
    {
      Fragment,
    }
  );

  const { asPath: pathname } = useRouter();
  const { locale } = useLocale();

  const { t } = useI18n({ en, ja });

  const old = differenceInDays(new Date(), new Date(meta.updatedAt));

  return (
    <>
      <SiteHead locales={translations} ogp={false}>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        {meta.description && (
          <meta property="og:description" content={meta.description} />
        )}
        <meta
          property="og:url"
          content={"https://log.pocka.io" + pathFor(pathname, locale)}
        />
        <meta
          property="og:image"
          content="https://log.pocka.io/open-graph-image.png"
        />
        <meta property="article:published_time" content={meta.createdAt} />
        <meta property="article:modified_time" content={meta.updatedAt} />
        <meta
          property="article:author"
          content={`https://log.pocka.io${pathFor("/about/", locale)}`}
        />
        {meta.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <title>{meta.title} || log.pocka.io</title>
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.tags.length > 0 && (
          <meta name="keywords" content={meta.tags.join(",")} />
        )}
      </SiteHead>
      <Header>
        <h1>{meta.title}</h1>
        <Meta>
          <small>
            Last updated at{" "}
            <time dateTime={meta.updatedAt}>
              {format(new Date(meta.updatedAt), "yyyy-MM-dd")}
            </time>
          </small>
        </Meta>
        {old > TOO_OLD_THRESHOLD ? (
          <Alert variant="warning">{t.tooOutdated}</Alert>
        ) : old > OLD_THRESHOLD ? (
          <Alert variant="info">{t.outdated}</Alert>
        ) : null}
      </Header>
      <Sidebar>{tocElement}</Sidebar>
      <Main>{element}</Main>
    </>
  );
};
