import fs from "fs/promises";
import path from "path";

import { loadPosts, Post } from "@/utils/contents";

import pkg from "../package.json";

const LOCALES = ["en", "ja"];
const DIST_DIR = path.resolve(__dirname, "../dist");

interface Author {
  name: string;
  url?: string;
  avatar?: string;
}

interface FeedItemBase {
  id: string;
  url?: string;
  external_url?: string;
  title?: string;
  summary?: string;
  image?: string;
  banner_image?: string;
  date_published?: string;
  date_modified?: string;
  authors?: readonly Author[];
  tags?: readonly string[];
  language?: string;
}

type FeedItem = FeedItemBase &
  ({ content_html: string } | { content_text: string });

function feed(locale: string, items: readonly FeedItem[]) {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: pkg.name,
    home_page_url: pkg.homepage,
    feed_url: `${pkg.homepage}/feed/${locale}.json`,
    description: pkg.description,
    icon: `${pkg.homepage}/favicon.png`,
    authors: [
      {
        name: pkg.author.name,
        avatar: pkg.author.avatar,
      },
    ],
    language: locale,
    items,
  };
}

async function loadItem(locale: string, meta: Post): Promise<FeedItem> {
  const localeDir = locale === "en" ? "" : locale;

  const filepath = path.resolve(
    DIST_DIR,
    localeDir,
    "posts",
    meta.name,
    "index.html"
  );

  const file = await fs.readFile(filepath, "utf-8");

  const url =
    pkg.homepage + "/" + ["posts", localeDir, meta.name].join("/") + "/";

  return {
    id: url,
    url,
    title: meta.title,
    summary: meta.description || undefined,
    date_published: meta.createdAt,
    date_modified: meta.updatedAt,
    tags: meta.tags || undefined,
    content_html: file,
  };
}

export async function generateFeed() {
  await fs.mkdir(path.resolve(DIST_DIR, "feed"));

  await Promise.all(
    LOCALES.map(async (locale) => {
      const posts = await loadPosts(locale);

      const items: FeedItem[] = [];

      for (const post of posts) {
        items.push(await loadItem(locale, post));
      }

      await fs.writeFile(
        path.resolve(DIST_DIR, "feed", `${locale}.json`),
        JSON.stringify(feed(locale, items)),
        "utf-8"
      );
    })
  );
}

generateFeed();
