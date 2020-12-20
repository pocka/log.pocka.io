import styled, { keyframes } from "styled-components";

const LeftSwing = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(30deg);
  }

  50% {
    transform: rotate(0deg);
  }
`;

const RightSwing = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-30deg);
  }

  50% {
    transform: rotate(0deg);
  }
`;

const Container = styled.div`
  --bg: var(--color-bg-accent);
  --fg: var(--color-fg-sub);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--bg);

  &&& {
    padding: 0;
    padding-block-end: 2em;
  }
`;

const Letter = styled.div`
  --swing-duration: 2s;
  --swing-easing: linear;

  display: flex;
  flex-direction: column;
  align-items: center;

  transform-origin: top center;

  &:first-child {
    animation: var(--swing-duration) var(--swing-easing) 0s infinite both
      ${LeftSwing};
  }

  &:last-child {
    animation: var(--swing-duration) var(--swing-easing)
      calc(var(--swing-duration) / 2) infinite both ${RightSwing};
  }
`;

const BallString = styled.i`
  display: block;
  height: 3em;
  border-left: 1px solid var(--fg);
`;

const Ball = styled.div`
  display: flex;
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;

  background-color: var(--fg);
  border-radius: 50%50%;
  color: var(--bg);
`;

export interface NotFoundAnimProps {
  className?: string;
}

export const NotFoundAnim = (props: NotFoundAnimProps) => {
  return (
    <Container aria-hidden="true" {...props}>
      <Letter>
        <BallString />
        <Ball>
          <span>4</span>
        </Ball>
      </Letter>
      <Letter>
        <BallString />
        <Ball>
          <span>0</span>
        </Ball>
      </Letter>
      <Letter>
        <BallString />
        <Ball>
          <span>4</span>
        </Ball>
      </Letter>
    </Container>
  );
};

export default NotFoundAnim;
