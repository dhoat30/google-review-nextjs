"use client";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import ServiceTabsScrollable from "./ServiceTabsScrollable";
export default function ServiceSelectorTabs({
  subtitle = null,
  title,
  description,
  residentialServicesData,
  commercialServicesData,
  industrialServicesData,
}) {
  const data = [
    {
      title: "Residential Cleaning",
      data: residentialServicesData,
      slug: "residential-cleaning",
    },
    {
      title: "Commercial Cleaning",
      data: commercialServicesData,
      slug: "commercial-cleaning",
    },
    {
      title: "Industrial Cleaning",
      data: industrialServicesData,
      slug: "industrial-cleaning",
    },
  ];
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}

        <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description"
            align="center"
          >
            {description}
          </Typography>
        </div>
        <div className="tabs mt-24">
          <ServiceTabsScrollable tabsData={data} />
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-lowest);

  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
  }

  .title-row {
    max-width: 1000px;
    margin: 0 auto;
    .title {
    }
    .subtitle {
    }
    .description {
      margin-top: 16px;
    }
  }
  .cards {
    margin-top: 80px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    @media (max-width: 900px) {
      display: flex;
      gap: 32px;
      flex-direction: column;
    }
  }
`;
