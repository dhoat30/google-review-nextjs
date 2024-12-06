"use client";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Image from "next/image";
import Link from "next/link";
export default function Hero({ data }) {
  return (
    <Section component="section">
      <Container className="row" maxWidth="xl">
        <Box className="content-wrapper">
          <Typography
            className="subtitle"
            component="h2"
            variant="h4"
            color="secondary.main"
          >
            {data.subtitle}
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            color="white"
            className="title"
          >
            {data.title}
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color=" var(--dark-on-surface)"
          >
            {data.description}
          </Typography>
          <Box className="button-wrapper">
            <Link href={data.ctaLink}>
              <Button variant="contained" size="large">
                {data.ctaLabel}
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          className="image-wrapper flexGrow-1"
          style={{
            paddingBottom: `${
              (data.desktopImage.height / data.desktopImage.width) * 100
            }%`,
          }}
        >
          <div className="bulb"></div>
          <Image
            src={data.desktopImage.url}
            alt="hero"
            fill
            priority={true}
            sizes="(max-width: 1200px) 100vw, 50vw"
          />
        </Box>
      </Container>
    </Section>
  );
}
const Section = styled(Box)`
  .row {
    align-items: center;
    height: calc(90vh + 100px);
    gap: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 1200px) {
      height: auto;
      padding: 80px 8px;
      grid-template-columns: 1fr;
    }
  }
  background: var(--dark-surface-container-lowest);
  .content-wrapper {
    .subtitle {
      @media (max-width: 600px) {
        font-size: 1.5rem;
      }
    }
    .title {
      margin: 8px 0;
    }
    .button-wrapper {
      margin-top: 16px;
    }
  }
  .image-wrapper {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #4f33ff 0%,
      rgba(79, 51, 255, 0) 90%
    );
    width: 100%;

    position: relative;
    @media (max-width: 900px) {
      width: 100%;
      padding-bottom: 100%;
    }
    .bulb {
    }
  }
`;
