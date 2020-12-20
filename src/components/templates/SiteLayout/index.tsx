import { FC } from "react";
import styled from "styled-components";

import { Footer } from "@/components/organisms/Footer";
import { Navigation } from "@/components/organisms/Navigation";

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(100vw, 1fr);
  min-height: 100vh;

  & > * {
    padding: calc(var(--baseline) * 1rem) 16px;
  }

  & > * > :first-child {
    margin-block-start: 0;
  }

  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      grid-template-columns: 200px minmax(0, 1fr);
    }
  }

  @media ${({ theme }) => theme.queries.threeColumn} {
    & {
      grid-template-columns: 1fr min(700px, 100%) 1fr;
    }
  }
`;

const NavBg = styled.div`
  grid-row: 1;
  grid-column: 1 / -1;
  margin-block-end: calc(var(--baseline) * 2rem);

  background-color: var(--color-bg-accent);
`;

const Nav = styled(Navigation)`
  grid-row: 1;
  grid-column: 1;
  margin-block-end: calc(var(--baseline) * 2rem);

  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      grid-column: 1 / -1;
    }
  }

  @media ${({ theme }) => theme.queries.threeColumn} {
    & {
      grid-column: 2;
    }
  }
`;

const FooterBg = styled.div`
  grid-row: 999;
  grid-column: 1 / -1;
  margin-block-start: calc(var(--baseline) * 2rem);

  background-color: var(--color-bg-accent);
`;

const StyledFooter = styled(Footer)`
  grid-row: 999;
  grid-column: 1;
  margin-block-start: calc(var(--baseline) * 2rem);

  color: var(--color-fg-sub);

  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      grid-column: 1 / -1;
    }
  }

  @media ${({ theme }) => theme.queries.threeColumn} {
    & {
      grid-column: 2;
    }
  }
`;

export const SiteLayout: FC = ({ children }) => {
  return (
    <Layout>
      <NavBg />
      <Nav />
      {children}
      <FooterBg />
      <StyledFooter />
    </Layout>
  );
};
