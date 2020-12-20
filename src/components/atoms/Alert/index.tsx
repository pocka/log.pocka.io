import { FC } from "react";
import styled from "styled-components";
import {
  RiAlertLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiLightbulbLine,
  RiStickyNoteLine,
} from "react-icons/ri";

const icons = {
  tips: RiLightbulbLine,
  info: RiInformationLine,
  note: RiStickyNoteLine,
  warning: RiAlertLine,
  danger: RiErrorWarningLine,
} as const;

const Container = styled.div`
  padding: calc(var(--baseline) * 0.5rem) 1em;
  border: 1px solid var(--alert-color);

  border-radius: 0.2em;

  &[data-variant="tips"],
  &[data-variant="info"],
  &[data-variant="note"] {
    --alert-color: var(--color-fg);
  }

  &[data-variant="warning"] {
    --alert-color: #efcb68;
  }

  &[data-variant="danger"] {
    --alert-color: rgb(217, 59, 59);
  }
`;

const Title = styled.p`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: calc(var(--baseline) * 0.25rem) 0.75em;
  font-size: 0.8em;

  background-color: var(--alert-color);
  border-radius: inherit;
  color: var(--color-bg);
  text-transform: uppercase;

  @media (prefers-color-scheme: light) {
    [data-variant="warning"] > & {
      color: var(--color-fg);
    }
  }

  @media (prefers-color-scheme: dark) {
    [data-variant="danger"] > & {
      color: var(--color-fg);
    }
  }

  & > :not(:first-child) {
    margin-inline-start: 0.25em;
  }
`;

const Body = styled.p`
  margin-block-start: calc(var(--baseline) * 0.5rem);

  & > p:first-child {
    /* You need to wrap Markdown content inside HTML tag with blank lines */
    margin-block-start: 0;
  }
`;

export interface AlertProps {
  className?: string;
  slot?: string;

  variant?: "tips" | "info" | "note" | "warning" | "danger";
}

export const Alert: FC<AlertProps> = ({
  children,
  variant = "tips",
  ...rest
}) => {
  const Icon = icons[variant];

  return (
    <Container data-variant={variant} {...rest}>
      <Title>
        <Icon />
        <span>{variant}</span>
      </Title>
      <Body>{children}</Body>
    </Container>
  );
};
