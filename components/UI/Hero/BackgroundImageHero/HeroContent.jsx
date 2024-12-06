"use client";
import React from "react";

import styled from "@emotion/styled";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import Link from "next/link";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

export default function HeroContent({
  title,
  subtitle,
  description,
  ctaArray,
  className,
  heroUSP,
}) {
  let ctaComponent = null;
  if (ctaArray.length > 0) {
    ctaComponent = ctaArray.map((cta, index) => {
      // Determine the icon based on the URL
      let secondIcon = <LocalMallOutlinedIcon />;
      if (cta.cta_link.url === "/contact") {
        console.log(cta.cta_link.url);
        secondIcon = <LocalPhoneOutlinedIcon />;
      }
      return (
        <Link href={cta.cta_link.url} key={index} target="_blank">
          <Button
            variant={`${index === 0 ? "contained" : "outlined"}`}
            size="large"
            startIcon={index === 0 ? <CalendarMonthOutlinedIcon /> : secondIcon}
          >
            {cta.cta_link.title}
          </Button>
        </Link>
      );
    });
  }
  // check if heroUSP object is available and has a value
  let heroUSPComponent = null;
  if (heroUSP) {
    heroUSPComponent = (
      <div className="hero-usp-wrapper">
        <div className="text-usp-wrapper">
          {heroUSP.text_usp.map((item, index) => {
            return (
              <Typography
                variant="subtitle2"
                component="div"
                className="text-usp"
                key={index}
                color="var(--light-on-primary-fixed-variant)"
              >
                <CheckCircleIcon />
                <span> {item.value}</span>
              </Typography>
            );
          })}
        </div>
        <div className="image-usp-wrapper">
          {heroUSP.image_usp &&
            heroUSP.image_usp.map((item, index) => {
              return (
                <Image
                  key={index}
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                />
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <Div className={className}>
      <Typography
        component="h1"
        variant="h1"
        className="title"
        color="var(--light-on-primary-fixed-variant)"
        align="center"
      >
        {title}
      </Typography>

      <div className="button-wrapper">{ctaComponent}</div>
      {heroUSPComponent}
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 0 16px;
  max-width: 1200px;

  .subtitle {
    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
  .title {
    margin: 8px 0 16px 0;
  }

  .button-wrapper {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      max-width: 500px;
    }
  }
  .hero-usp-wrapper {
    .text-usp-wrapper {
      margin-top: 32px;
    }
    .image-usp-wrapper {
      margin-top: 16px;
    }
    .text-usp-wrapper,
    .image-usp-wrapper {
      display: flex;
      align-items: center;
      gap: 16px;

      flex-wrap: wrap;
      .text-usp {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
`;
