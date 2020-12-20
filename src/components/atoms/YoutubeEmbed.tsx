import { useMemo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
`;

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;

  outline: none;
`;

export interface YoutubeEmbedProps {
  className?: string;

  src: string;

  aspectratio?: string;
}

export const YoutubeEmbed = ({
  className,
  aspectratio = "16:9",
  ...rest
}: YoutubeEmbedProps) => {
  const paddingTop = useMemo(() => {
    const [strWidth, strHeight] = aspectratio.includes(":")
      ? aspectratio.split(":")
      : aspectratio.includes("/")
      ? aspectratio.split("/")
      : ["1", "1"];

    const [width, height] = [
      Math.abs(parseInt(strWidth.trim())),
      Math.abs(parseInt(strHeight.trim())),
    ];

    if (!isFinite(width) || !width || !isFinite(height) || !height) {
      return "100%";
    }

    return `${(height / width) * 100}%`;
  }, [aspectratio]);

  return (
    <Wrapper className={className} style={{ paddingTop }}>
      <IFrame
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        {...rest}
      />
    </Wrapper>
  );
};
