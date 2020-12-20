import styled from "styled-components";

import { Alert as AlertUnstyled } from "@/components/atoms/Alert";
import { YoutubeEmbed as YoutubeEmbedUnstyled } from "@/components/atoms/YoutubeEmbed";

export const Header = styled.header`
  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      grid-column: 2;
    }
  }
`;

export const Meta = styled.p`
  margin-block-start: calc(var(--baseline) * 0.5rem);
`;

export const Sidebar = styled.aside`
  grid-column: 1;
`;

export const Nav = styled.nav`
  position: sticky;
  top: calc(var(--baseline) * 1rem);
  font-size: 0.8em;

  opacity: 0.8;
  transition: opacity 0.2s ease;

  @media ${({ theme }) => theme.queries.twoColumn} {
    & {
      margin-inline-start: auto;
      margin-inline-end: 0;
      max-width: 400px;
    }
  }

  @media (prefers-color-scheme: dark) {
    & {
      opacity: 0.6;
    }
  }

  &:hover {
    opacity: 1;
  }
`;

export const Links = styled.ol`
  margin: 0;
  padding: 0;

  list-style: none;

  & ol {
    padding-left: 1em;
  }
`;

export const Main = styled.div`
  & > div > :first-child {
    margin-block-start: 0;
  }
`;

export const Alert = styled(AlertUnstyled)`
  margin-block-start: calc(var(--baseline) * 1rem);
`;

export const YoutubeEmbed = styled(YoutubeEmbedUnstyled)`
  margin-block-start: calc(var(--baseline) * 1rem);
`;
