import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
export default function ServicePackageCard({
  title,
  description,
  price,
  image,
  ctaLink,
  ctaLabel,
  className,
}) {
  if (!image) return null;
  return (
    <PaperStyle className={`${className} card-wrapper`} elevation={0}>
      <Link className="link-wrapper" href={ctaLink}>
        <div className="image-wrapper">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={true}
            sizes=""
          />
        </div>
        <div className="content-wrapper">
          <Typography className="title" component="h2" variant="h4">
            {title}
          </Typography>
          <Typography className="description" component="p" variant="body1">
            {description}
          </Typography>
          <Typography className="price" component="div" variant="h4">
            ${price}
          </Typography>
          <Button className="button" variant="contained" size="large">
            {ctaLabel}
          </Button>
        </div>
      </Link>
    </PaperStyle>
  );
}
const PaperStyle = styled(Paper)`
  transition: transform 0.3s;
  border-radius: 12px;
  overflow: hidden;
  &:hover {
    transform: scale(1.01);
  }
  .link-wrapper {
    grid-template-columns: repeat(12, 1fr);
    display: grid;
    align-items: center;
    overflow: hidden;
    height: 500px;
    @media (max-width: 1150px) {
      display: block;
      height: auto;
    }
    .image-wrapper {
      grid-column: span 7;
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
      @media (max-width: 1150px) {
        padding-bottom: 56.25%;
        height: auto;
      }
      img {
        overflow: hidden;
        object-fit: cover;
      }
    }
    .content-wrapper {
      padding: 32px;
      grid-column: span 5;
      @media (max-width: 600px) {
        padding: 16px;
      }
      .description {
        margin-top: 8px;
        margin-bottom: 24px;
        @media (max-width: 600px) {
          margin-bottom: 8px;
        }
      }
      .button {
        margin-top: 24px;
        @media (max-width: 600px) {
          margin-top: 8px;
        }
      }
    }
  }
`;
