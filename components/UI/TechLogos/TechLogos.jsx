"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import React from "react";
import styled from "@emotion/styled";
import Slider from "react-slick";
import Image from "next/image";

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 12,
  autoplay: true,
  draggable: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  autoplaySpeed: 4000,
  padding: "40px",
  cssEase: "linear",
  speed: 3000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 10,
      },
    },

    {
      breakpoint: 900,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

export default function TechLogos({ data }) {
  if (!data) return null;
  const logos = data.logos.map((item, index) => {
    return (
      <Image
        style={{ objectFit: "cover" }}
        key={index}
        src={item.logo.url}
        alt={item.logo.alt ? item.logo.alt : "logo"}
        width={83}
        height={83}
      />
    );
  });
  return (
    <Section component="section">
      <div className="title-wrapper">
        <Typography variant="h5" component="h2" align="center">
          {data.title}
        </Typography>
      </div>
      <div className="carousel-wrapper">
        <Slider {...settings}>{logos}</Slider>
      </div>
    </Section>
  );
}
const Section = styled(Box)`
  background: var(--light-surface-container-low);

  border-top: 1px solid var(--light-outline-variant);
  border-bottom: 1px solid var(--light-outline-variant);
  padding-top: 24px;
  padding-bottom: 24px;
  .title-wrapper {
  }
  .carousel-wrapper {
    margin-top: 24px;
  }
  img {
    object-fit: contain !important;
  }
`;
