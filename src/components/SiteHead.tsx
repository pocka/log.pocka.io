import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, FC } from "react";

import { pathFor } from "@/utils/i18n";

import pkg from "@/../package.json";

export interface SiteHeadProps {
  locales?: string[];

  ogp?: boolean;
}

export const SiteHead: FC<SiteHeadProps> = ({
  children,
  locales = ["en", "ja"],
  ogp = true,
}) => {
  const { asPath: pathname } = useRouter();

  // TODO: Update `lang` attribute for <html>
  useEffect(() => {}, []);

  return (
    <Head>
      {locales.map((locale) => {
        return (
          <link
            rel="alternate"
            hrefLang={locale}
            href={pathFor(pathname, locale)}
          />
        );
      })}
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Ubuntu+Mono:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#d93b85" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>{pkg.name}</title>
      <meta name="description" content={pkg.description} />
      {ogp && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pkg.name} />
          <meta property="og:description" content={pkg.description} />
          <meta
            property="og:image"
            content={pkg.homepage + "/open-graph-image.png"}
          />
          <meta property="og:url" content={pkg.homepage} />
        </>
      )}
      {children}
    </Head>
  );
};
