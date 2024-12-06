import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function MenuCard({ title, description, image, cta }) {
  return (
    <LinkStyled href={cta.url}>
      <div className="image-wrapper" style={{ paddingBottom: "120%" }}>
        <Image src={image.url} alt={title} fill />
      </div>
      <div className="content-wrapper">
        <Typography
          variant="h5"
          component="h3"
          className="title mt-8"
          align="center"
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="description mt-8"
          align="center"
        >
          {description}
        </Typography>
      </div>
    </LinkStyled>
  );
}
const LinkStyled = styled(Link)`
  .image-wrapper {
    overflow: hidden;
    img {
      transition: transform 0.5s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .content-wrapper {
    padding: 8px;
  }
`;
