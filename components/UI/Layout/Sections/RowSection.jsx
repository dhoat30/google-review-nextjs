import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";

export default function RowSection({
  title,
  subtitle,
  description,
  imageAlignment,
  image,
  ctaGroup,
  bulletPoints,
  showBeforeAfterImages,
  beforeImage,
  afterImage,
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignment = imageAlignment === "left" ? "2 / 3" : "1 / 2";
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        <div className="wrapper">
          <div
            className="content-wrapper"
            style={{ gridColumn: contentAlignment }}
          >
            <Image
              src={"/title-pattern.png"}
              alt={image.alt}
              width={120}
              height={51}
            />
            {subtitle && (
              <Typography variant="h6" component="div" className="subtitle">
                {subtitle}
              </Typography>
            )}

            <Typography variant="h2" component="h2" className="title mt-8">
              {title}
            </Typography>

            <div
              className="description body1 mb-16 mt-16"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {bulletPoints?.length > 0 &&
              bulletPoints.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bullet-point flex align-center gap-8 mt-8"
                  >
                    <CheckCircleIcon
                      sx={{ color: "var(--light-on-primary-fixed-variant)" }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="var(--light-on-primary-fixed-variant)"
                    >
                      {item.text}
                    </Typography>
                  </div>
                );
              })}
            {ctaGroup.cta && (
              <Link href={ctaGroup.cta.url} className="cta">
                <Button variant={ctaGroup.cta_type} color="primary">
                  {ctaGroup.cta.title}
                </Button>
              </Link>
            )}
          </div>

          {/* image wrapper */}
          {showBeforeAfterImages ? (
            <div className="image-container">
              <BeforeAfter
                showTitle={false}
                data={{ beforeImage, afterImage }}
              />
            </div>
          ) : (
            <div
              className="image-wrapper"
              style={{ paddingBottom: `${imgPadding}%` }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
            </div>
          )}
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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 40px;
    align-items: start;
    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      gap: 16px;
      display: flex;
      flex-direction: column;
    }
    .content-wrapper {
      @media (min-width: 1100px) {
        position: sticky;
        top: 100px;
        grid-row: 1 / 2;
      }

      .subtitle {
        margin: 0 0 8px 0;
      }
      .cta {
        margin-top: 16px;
        display: inline-block;
      }
    }
    .image-wrapper,
    .image-container {
      @media (min-width: 1100px) {
        grid-row: 1 / 2;
      }
    }
  }
`;
