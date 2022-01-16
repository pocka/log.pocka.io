import {
  ComponentType,
  createElement,
  Fragment,
  ReactNode,
  useMemo,
} from "react";

import { unified, Transformer } from "unified";
import rehypeReact, { Options as RehypeReactOptions } from "rehype-react";

import { Link } from "@/components/Link";

export type Hast = Parameters<Transformer>[0];

export type Components = Record<string, ComponentType<any>>;

export function useHast(
  node?: Hast | null,
  components: Components = {},
  rehypeReactOptions: Partial<
    Omit<RehypeReactOptions, "components" | "createElement">
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

    // unified/rehype changed type defs and now it's almost impossible to defined correct type (?)
    return processor.stringify(node as any);
  }, [node]);
}
