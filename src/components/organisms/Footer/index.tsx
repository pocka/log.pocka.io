import styled from "styled-components";
import { RiGithubLine, RiTwitterLine } from "react-icons/ri";

import { useLocale } from "@/hooks/useLocale";

import pkg from "@/../package.json";

const Container = styled.footer`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-inline-start: 0.5em;
  font-size: 1rem;

  list-style: none;

  & a {
    display: flex;
    margin-inline-start: 0.25em;
  }
`;

export interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const { locale } = useLocale();
  return (
    <Container className={className}>
      <span>&copy; 2020 {pkg.author.name}</span>
      <Links>
        <li>
          <a href="https://github.com/pocka" title="@pocka on GitHub">
            <RiGithubLine />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/pockaquel" title="@pockaquel on Twitter">
            <RiTwitterLine />
          </a>
        </li>
      </Links>
    </Container>
  );
};
