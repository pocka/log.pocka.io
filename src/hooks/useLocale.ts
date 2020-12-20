import { useRouter } from "next/router";

export function useLocale() {
  const { asPath: pathname } = useRouter();

  return {
    locale: /^\/ja\//.test(pathname) ? "ja" : "en",
    defaultLocale: "en",
  };
}
