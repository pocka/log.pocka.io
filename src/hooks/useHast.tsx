import { createElement, ReactNode, useMemo } from "react";

import unified from "unified";
import rehypeReact, { Options as RehypeReactOptions } from "rehype-react";

import { Link } from "@/components/Link";

export type Hast = Parameters<unified.Transformer>[0];

export type Components = RehypeReactOptions<typeof createElement>["components"];

export function useHast(
  node?: Hast | null,
  components: Components = {},
  rehypeReactOptions: Partial<
    Omit<
      RehypeReactOptions<typeof createElement>,
      "components" | "createElement"
    >
  > = {}
): ReactNode {
  const processor = useMemo(() => {
    return unified().use(rehypeReact, {
      ...rehypeReactOptions,
      createElement,
      components: {
        a: ({ href, ...rest }: any) => {
          return /^(#|https?:\/\/)/.test(href) ? (
            <a href={href} {...rest} />
          ) : (
            <Link href={href} passHref>
              <a {...rest} />
            </Link>
          );
        },
        h1: (props: any) => <h2 {...props} />,
        h2: (props: any) => <h3 {...props} />,
        h3: (props: any) => <h4 {...props} />,
        h4: (props: any) => <h5 {...props} />,
        h5: (props: any) => <h6 {...props} />,
        h6: (props: any) => <p {...props} />,
        ...components,
      },
    });
  }, []);
  return useMemo(() => {
    if (!node) {
      return null;
    }

    return processor.stringify(node);
  }, [node]);
}
