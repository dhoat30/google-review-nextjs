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

export default function RowStatusSection({
  title,
  description,
  image,
  firstSmallImage,
  secondSmallImage,
  ctaGroup,
  statsArray,
}) {
  const imgPadding = (image.height / image.width) * 100;
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        <div className="wrapper">
          <div className="content-wrapper">
            <div className="title-description-wrapper">
              <Image
                src={"/title-pattern.png"}
                alt={image.alt}
                width={120}
                height={51}
              />
              <Typography variant="h2" component="h2" className="title mt-8">
                {title}
              </Typography>
              <div
                className="description body1 mb-16 mt-16"
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
            {statsArray?.length > 0 && statsArray && (
              <div className="stats-wrapper">
                {statsArray.map((stat, index) => {
                  return (
                    <Stats
                      key={index}
                      label={stat.stat_label}
                      value={stat.stat_value}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* image wrapper */}
          <div className="image-container">
            <div
              className="image-wrapper main-image"
              style={{ paddingBottom: `${imgPadding}%` }}
            >
              <Image
                src={image.sizes.large}
                alt={image.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 70vw"
              />
            </div>
            {firstSmallImage && secondSmallImage && (
              <div className="small-image-wrapper">
                <Image
                  src={firstSmallImage.sizes.medium}
                  alt={image.alt}
                  width={200}
                  height={216}
                />
                <Image
                  src={secondSmallImage.sizes.medium}
                  alt={image.alt}
                  width={200}
                  height={216}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-surface-container-lowest);
  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
  }
  .wrapper {
    display: grid;
    grid-template-columns: 500px 1fr;
    grid-template-rows: 1fr;
    gap: 120px;
    align-items: start;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: center;
    }
    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      display: grid;
    }
    .content-wrapper {
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
`;
