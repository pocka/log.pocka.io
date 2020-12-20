import { Plugin, Transformer } from "unified";
import visit from "unist-util-visit";

export const rehypeNavOnly: Plugin = () => {
  const transformer: Transformer = (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (parent?.type === "root" && (node as any).tagName !== "nav") {
        parent?.children.splice(index, 1);

        return [visit.SKIP, index];
      }
    });

    visit(tree, "text", (node, index, parent) => {
      if (parent?.type === "root") {
        parent?.children.splice(index, 1);

        return [visit.SKIP, index];
      }
    });
  };

  return transformer;
};
