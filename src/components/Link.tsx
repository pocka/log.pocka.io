import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC } from "react";

import { pathFor } from "@/utils/i18n";

import { useLocale } from "@/hooks/useLocale";

export const Link: FC<NextLinkProps> = ({
  locale: specifiedLocale,
  href,
  ...rest
}) => {
  const { locale: currentLocale } = useLocale();

  const locale = specifiedLocale || currentLocale;

  if (typeof href !== "string") {
    return <NextLink href={href} {...rest} />;
  }

  return <NextLink href={pathFor(href, locale)} {...rest} />;
};
