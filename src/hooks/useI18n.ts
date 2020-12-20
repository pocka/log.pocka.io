import { useLocale } from "@/hooks/useLocale";

export function useI18n<T extends Record<string, any>>(dict: T) {
  const { locale } = useLocale();

  return {
    t: dict[locale],
  };
}
