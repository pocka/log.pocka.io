import fs from "fs/promises";
import path from "path";

import { isAfter } from "date-fns";
import { loadFront } from "yaml-front-matter";

import { unified, Transformer } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

import { rehypeNavOnly } from "@/utils/unified-plugins";

export interface Post {
  readonly name: string;
  readonly title: string;
  readonly description: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tags: readonly string[];
}

export async function loadPosts(locale: string): Promise<readonly Post[]> {
  const srcDir = path.resolve(process.cwd(), "./contents/posts", locale);

  const posts = await Promise.all(
    (
      await fs.readdir(srcDir)
    ).map<Promise<Omit<Post, "updatedAt"> & { updatedAt: Date }>>(
      async (filename) => {
        const abspath = path.resolve(srcDir, filename);

        const [content, stat] = await Promise.all([
          fs.readFile(abspath),
          fs.stat(abspath),
        ]);

        const frontmatter = loadFront(content);

        const {
          updatedAt = stat.birthtime.toISOString(),
          createdAt = stat.mtime.toISOString(),
        } = frontmatter;

        return {
          name: filename.replace(/\.md$/, ""),
          title: frontmatter.title,
          description: frontmatter.description || null,
          createdAt: new Date(createdAt).toISOString(),
          updatedAt: new Date(updatedAt),
          tags: frontmatter.tags,
        };
      }
    )
  );

  return posts
    .sort((a, b) => (isAfter(a.updatedAt, b.updatedAt) ? -1 : 1))
    .map<Post>((post) => ({
      ...post,
      updatedAt: post.updatedAt.toISOString(),
    }));
}

type Node = Parameters<Transformer>[0];

/**
 * @returns [Metadata, Body Node, ToC Node]
 */
export async function loadMarkdown(
  filename: string
): Promise<[Post, Node, Node]> {
  const srcFile = path.resolve(process.cwd(), "./contents", filename);
  const name = path.basename(srcFile, ".md");

  const [content, stat] = await Promise.all([
    fs.readFile(srcFile, "utf-8"),
    fs.stat(srcFile),
  ]);

  const frontmatter = loadFront(content);

  const {
    updatedAt = stat.birthtime.toISOString(),
    createdAt = stat.mtime.toISOString(),
  } = frontmatter;

  const post: Post = {
    name,
    title: frontmatter.title,
    description: frontmatter.description || null,
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
    tags: frontmatter.tags || [],
  };

  // Returns Unified instance with common plugins
  const processor = () =>
    unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkRehype, {
        allowDangerousHtml: true,
      })
      .use(rehypeRaw)
      .use(rehypeSlug);

  const bodyProcessor = processor().use(rehypePrism);

  const tocProcessor = processor().use(rehypeToc).use(rehypeNavOnly);

  const node = await bodyProcessor.run(bodyProcessor.parse(content));

  const toc = await tocProcessor.run(tocProcessor.parse(content));

  return [post, node, toc];
}

export async function doesFileExist(filename: string): Promise<boolean> {
  const abs = path.resolve(process.cwd(), "./contents", filename);

  const err = await fs
    .stat(abs)
    .then(() => null)
    .catch((err) => err);

  return !err;
}
