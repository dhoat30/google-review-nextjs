"use client";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";

export default function CenterAlignHero({ data }) {
  return (
    <Section component="section">
      <Box className="container">
        <Box className="image-wrapper flexGrow-1">
          <div className="bulb"></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className="row " maxWidth="xl">
          <Box className="content-wrapper">
            <Typography
              className="subtitle"
              component="h2"
              variant="h4"
              color="secondary.main"
              align="center"
            >
              {data?.subtitle}
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="white"
              className="title"
              align="center"
            >
              {data?.title}
            </Typography>
            <Typography
              component="p"
              variant="h5"
              align="center"
              color=" var(--dark-on-surface)"
            >
              {data?.description}
            </Typography>
            {data?.ctaLink && (
              <Box className="button-wrapper">
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            )}
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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .content-wrapper {
      .subtitle {
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
      }
      .title {
        margin: 16px 0;
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
      width: 100%;
      padding-bottom: 40%;
      position: relative;
      @media (max-width: 900px) {
        width: 100%;
        padding-bottom: 60%;
      }
      @media (max-width: 500px) {
        width: 100%;
        padding-bottom: 130%;
      }
      img {
        object-fit: cover;
      }
    }
  }
`;
