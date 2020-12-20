declare module "styled-components" {
  export interface DefaultTheme {
    queries: {
      twoColumn: string;
      threeColumn: string;
    };
  }
}

import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  queries: {
    twoColumn: "(min-width: 700px)",
    threeColumn: "(min-width: 1000px)",
  },
};
