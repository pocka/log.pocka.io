import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { SiteLayout } from "@/components/templates/SiteLayout";

import { defaultTheme } from "@/utils/themes";

// You can't move global styles under src/components: Next.js *throws an error* when you import
// css file in other than <App/>. You need to tightly integrate your site into Next.js.
import "@/global.css";

export const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={defaultTheme}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  </ThemeProvider>
);

export default App;
