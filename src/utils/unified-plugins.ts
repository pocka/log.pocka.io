import { Plugin, Transformer } from "unified";
import { visit, SKIP, Node } from "unist-util-visit";

export const rehypeNavOnly: Plugin = () => {
  const transformer: Transformer = (tree) => {
    visit(tree, "element", (node: Node, index: number, parent: any) => {
      if (parent?.type === "root" && (node as any).tagName !== "nav") {
        parent?.children.splice(index, 1);

        return [SKIP, index];
      }
    });

    visit(tree, "text", (node: Node, index: number, parent: any) => {
      if (parent?.type === "root") {
        parent?.children.splice(index, 1);

        return [SKIP, index];
      }
    });
  };

  return transformer;
};
