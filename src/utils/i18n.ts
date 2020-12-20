import { useRouter } from "next/router";

export interface I18nProps<T> {
  locale: string;
  t: T;
}

export function createI18nProps<T extends Record<string, any>>(
  locale: string | undefined,
  dict: Record<string, T>
): I18nProps<T> {
  return {
    locale: locale!,
    t: dict[locale!],
  };
}

export function useI18n<T extends Record<string, any>>(
  dict: Record<string, T>
) {
  const { locale } = useRouter();

  return {
    t: dict[locale!],
  };
}

const jaRegExp = /^\/ja(\/.*)$/;

export function pathFor(path: string, locale: string): string {
  const isJa = path.match(jaRegExp);

  if (isJa) {
    return locale === "ja" ? path : isJa[1];
  }

  return locale === "en" ? path : `/ja${path}`;
}
