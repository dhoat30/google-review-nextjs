"use client";
import React from "react";
import styled from "@emotion/styled";
import CustomAccordion from "../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
function FaqAccordionSection({ title, description, qaData }) {
  if (!qaData) return null;
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper ">
          <div className="title-wrapper">
            <Typography variant="h4" component="h3" className="description">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
          </div>
          <CustomAccordion qaData={qaData} />
        </div>
      </Container>
    </Section>
  );
}

export default FaqAccordionSection;
const Section = styled.section`
  background: var(--dark-surface-container-high);
  padding: 80px 0;

  @media (max-width: 900px) {
    padding: 40px 0;
  }
  .section-title {
  }
  .grid-wrapper {
    grid-template-columns: 500px 1fr;
    gap: 56px;
    display: grid;
    align-items: start;
    @media (max-width: 1100px) {
      gap: 24px;

      grid-template-columns: 1fr;
    }
    .title-wrapper {
      @media (min-width: 1100px) {
        position: sticky;
        top: 100px;
      }
    }
  }
`;
