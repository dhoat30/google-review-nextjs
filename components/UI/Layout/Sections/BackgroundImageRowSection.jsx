import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";
import Stats from "../../Stats/Stats";
import dynamic from "next/dynamic";
const Madala = dynamic(() => import("../../Patterns/Madala"));

export default function BackgroundImageRowSection({
  title,
  description,
  image,
  ctaGroup,
  contentAlignment,
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignmentClass = contentAlignment === "left" ? "left" : "right";
  return (
    <Section className="mt-8">
      {/* image wrapper */}

      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="100vw"
        objectFit="cover"
      />
      <Container maxWidth="xl" className="container">
        <div className={`wrapper ${contentAlignmentClass}`}>
          <div className="content-wrapper border-radius-12">
            <Madala className="pattern" />
            <div className="title-description-wrapper">
              <Typography variant="h4" component="h2" className="title mt-8">
                {title}
              </Typography>

              <div
                className="description body1"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            {ctaGroup.cta && (
              <Link href={ctaGroup.cta.url} className="cta">
                <Button variant={ctaGroup.cta_type} color="primary">
                  {ctaGroup.cta.title}
                </Button>
              </Link>
            )}
          </div>
          <div className="empty-div"></div>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-lowest);
  position: relative;
  height: 80vh;
  @media (max-width: 900px) {
    height: 80vh;
  }
  .container {
    width: 100%;

    .wrapper.right {
      flex-direction: row-reverse;
    }
    .wrapper.left {
    }
    .wrapper {
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      grid-template-columns: 1fr 1fr;
      width: calc(100% - 112px);
      left: 0;
      display: flex;
      justify-content: space-between;
      margin-left: 56px;
      margin-right: 56px;

      @media (max-width: 1000px) {
        margin-right: 16px;
        margin-left: 16px;
        width: calc(100% - 32px);
      }

      .content-wrapper {
        background: var(--dark-surface-container-lowest);
        padding: 24px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        max-width: 600px;
        @media (max-width: 600px) {
          padding: 16px;
        }
        .pattern {
          position: absolute;
          top: 0;
          z-index: -1;
          width: 600px;
          height: 600px;
          left: 0;
          top: -50%;
          /* add rotation animation */
          animation: rotate 100s linear infinite; /* Slower spin */
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        .subtitle {
          margin: 0 0 8px 0;
        }
        .cta {
          margin-top: 16px;
          display: inline-block;
        }
        .stats-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }

      .image-container {
        position: relative;
        /* @media (min-width: 1100px) {
        position: sticky;
        top: 100px;
      } */
        .small-image-wrapper {
          @media (max-width: 1300px) {
            display: none;
          }
          display: flex;
          gap: 16px;
          position: relative;
          top: -80px;
          left: -216px;
          img {
            object-fit: cover;
          }
        }
      }
    }
  }
`;
