"use client";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CenterAlignHeroTop({ data }) {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <Section component="section">
      <Box className="container">
        <Box className="image-wrapper flexGrow-1">
          <div className="bulb"></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className="row " maxWidth="xl">
          <Box className="content-wrapper">
            {data && data.subtitle ? (
              <Typography
                className="subtitle"
                component="h2"
                variant="h4"
                color="secondary.main"
                align="center"
              >
                {data.subtitle}
              </Typography>
            ) : null}
            {data && data.title ? (
              <Typography
                component="h1"
                variant="h2"
                color="white"
                className="title"
                align="center"
              >
                {data.title}
              </Typography>
            ) : null}

            {data && data.description ? (
              <Typography
                component="p"
                variant="h5"
                align="center"
                color=" var(--dark-on-surface)"
              >
                {data.description}
              </Typography>
            ) : null}
            {data && data.ctaLink ? (
              <Box className="button-wrapper">
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </Section>
  );
}

const Section = styled(Box)`
  background: var(--dark-surface-container-lowest);
  .container {
    position: relative;
    .row {
      position: absolute;
      z-index: 10;
      top: 30%;
      left: 50%;
      @media (max-width: 350px) {
        top: 40%;
      }
      transform: translate(-50%, -50%);
    }
    .content-wrapper {
      max-width: 900px;
      margin: 0 auto;
      .subtitle {
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
      }
      .title {
        margin: 16px 0;
        @media (max-width: 450px) {
          font-size: 1.8rem;
        }
      }
      .button-wrapper {
        margin-top: 24px;
        display: flex;
        justify-content: center;
      }
    }
    .image-wrapper {
      /* background: radial-gradient(
        50% 50% at 50% 50%,
        #4f33ff 0%,
        rgba(79, 51, 255, 0) 50%
      ); */
      padding-bottom: 56.25%;

      width: 100%;

      position: relative;
      @media (max-width: 800px) {
        padding-bottom: 125%;
      }
      img {
        object-fit: cover;
      }
    }
  }
`;
