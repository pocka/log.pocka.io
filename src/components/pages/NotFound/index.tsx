import Head from "next/head";
import styled from "styled-components";

import { useI18n } from "@/hooks/useI18n";

import { SiteHead } from "@/components/SiteHead";
import { NotFoundAnim } from "@/components/organisms/NotFoundAnim";

import en from "./en.json";
import ja from "./ja.json";

const Main = styled.main`
  grid-column: 1 / -1;

  @media ${({ theme }) => theme.queries.threeColumn} {
    & {
      grid-column: 2;
    }
  }
`;

const Anim = styled(NotFoundAnim)`
  grid-column: 1 / -1;
  margin-bottom: calc(var(--baseline) * 3rem);
`;

export const NotFoundPage = () => {
  const { t } = useI18n({ en, ja });

  return (
    <>
      <Head>
        <title>404 || log.pocka.io</title>
      </Head>
      <SiteHead />
      <Main>
        <h1>{t.title}</h1>
      </Main>
      <Anim />
    </>
  );
};
