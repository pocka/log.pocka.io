import { useRouter } from "next/router";
import styled from "styled-components";

import { useI18n } from "@/hooks/useI18n";

import { Link } from "@/components/Link";
import { Logo } from "@/components/atoms/Logo";

import en from "./en.json";
import ja from "./ja.json";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlockAnchor = styled.a`
  display: inline-flex;
`;

const NavLogo = styled(Logo)`
  font-size: 2rem;
`;

const Links = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  margin: 0;

  list-style: none;
`;

export interface NavigationProps {
  className?: string;
  slot?: string;
}

export const Navigation = (props: NavigationProps) => {
  const { t } = useI18n({ en, ja });
  const { asPath: pathname } = useRouter();

  return (
    <Container {...props}>
      <Link href="/" passHref>
        <BlockAnchor title={t.sitetop}>
          <NavLogo />
        </BlockAnchor>
      </Link>

      <Links>
        <li>
          <Link href="/posts" passHref>
            <BlockAnchor>Posts</BlockAnchor>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <BlockAnchor>About</BlockAnchor>
          </Link>
        </li>
        <li>
          <Link href={pathname} locale="en" passHref>
            <BlockAnchor hrefLang="en">EN</BlockAnchor>
          </Link>
          {" / "}
          <Link href={pathname} locale="ja" passHref>
            <BlockAnchor hrefLang="ja">JA</BlockAnchor>
          </Link>
        </li>
      </Links>
    </Container>
  );
};
