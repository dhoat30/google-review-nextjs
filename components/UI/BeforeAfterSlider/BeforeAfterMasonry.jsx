import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { ReactCompareSlider } from "react-compare-slider";

export default function BeforeAfterMasonry({ data, showTitle, priority }) {
  if (!data.afterImage || !data.beforeImage) return null;
  return (
    <Container>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}

      <ReactCompareSlider
        className="image-wrapper"
        onlyHandleDraggable={true}
        style={{
          paddingBottom: `${
            (data.beforeImage.height / data.beforeImage.width) * 100
          }%`,
          touchAction: "pan-y",
        }}
        itemTwo={
          <Image
            src={data.beforeImage.url}
            alt={data.beforeImage.alt ? data.beforeImage.alt : "Before"}
            priority={priority}
            fill
          />
        }
        itemOne={
          <Image
            src={data.afterImage.url}
            alt={data.afterImage.alt ? data.afterImage.alt : "Before"}
            fill
            priority={priority}
          />
        }
      />
    </Container>
  );
}
const Container = styled.section`
  .image-wrapper {
    display: inline-block;

    width: 100%;
    position: relative;
    img {
      object-fit: cover;
    }
  }
`;
