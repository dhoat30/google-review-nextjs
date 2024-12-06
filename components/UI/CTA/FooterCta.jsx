import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
const Madala = dynamic(() => import("../Patterns/Madala"));

export default function FooterCta({ title, description, cta }) {
  return (
    <Section component="section">
      <Container maxWidth="xl">
        <div className="wrapper">
          <Madala className="pattern" />
          <div className="content-wrapper">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700 }}
              color="white"
              className="title"
            >
              {title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="white"
              className="description mt-16"
            >
              {description}
            </Typography>
            <div className="button-wrapper">
              <Link href={cta.url}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    background: "white",
                    color: "var(--dark-on-primary)",
                    "&:hover": {
                      background: "#eaeaea",
                    },
                  }}
                >
                  {cta.title}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = styled(Box)`
  padding: 56px 0;
  @media (max-width: 900px) {
    padding: 24px 0;
  }
  .wrapper {
    background: linear-gradient(102deg, #041783 0.72%, #047898 96.8%);
    border: 1px solid #047898;
    border-radius: 12px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    .pattern {
      position: absolute;
      width: 100%;
      height: 100%;
      right: -50%;
      /* add rotation animation */
      animation: rotate 100s linear infinite;
      z-index: 0;
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      path {
        fill: #035369;
      }
    }
    .content-wrapper {
      position: relative;
      z-index: 2;
      padding: 80px 32px;
      max-width: 700px;
      @media (max-width: 600px) {
        padding: 32px 16px;
      }
      .title {
        font-weight: 600;
      }
      .button-wrapper {
        margin-top: 32px;
        flex-wrap: wrap;
      }
    }
    .image-wrapper {
      border: solid red;

      svg {
        /* add rotation animation */
        animation: rotate 100s linear infinite;
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;
