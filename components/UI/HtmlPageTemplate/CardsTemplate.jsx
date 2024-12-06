"use client";

import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "../Card/BlogCard";

export default function CardsTemplate({
  cardsDataArr,
  heroData,
  oneByOneAspectRatio,
}) {
  if (!cardsDataArr || !heroData) return null;
  const cards = cardsDataArr.map((item, index) => {
    return (
      <BlogCard
        key={index}
        title={item.title}
        image={item.image}
        ctaLink={item.ctaLink}
        ctaLabel={item.ctaLabel ? item.ctaLabel : "LEARN MORE"}
        description={item?.description}
        authorFirstName={item.authorFirstName}
        authorLastName={item.authorLastName}
        profilePic={item.profilePic}
        publishDate={item.publishDate}
        categoryDetails={item.categoryDetails}
      />
    );
  });
  return (
    <>
      <Section>
        <Container maxWidth="xl">
          <div className="title-wrapper">
            <Typography variant="h2" component="h1" align="center">
              {heroData.title}
            </Typography>
            <Typography
              align="center"
              variant="body1"
              component="div"
              className="subtitle mt-24"
              dangerouslySetInnerHTML={{ __html: heroData.description }}
            ></Typography>
          </div>
        </Container>
      </Section>
      <CardsSection>
        <Container maxWidth="xl" className="cards-wrapper">
          {cards}
        </Container>
      </CardsSection>
    </>
  );
}

const Section = styled.section`
  border-top: 1px solid var(--light-outline-variant);
  border-bottom: 1px solid var(--light-outline-variant);
  padding: 120px 0 40px 0;
  background: var(--light-surface-container);
  @media (max-width: 1020px) {
    padding: 80px 0 40px 0;
  }
  .title-wrapper {
    max-width: 900px;
    margin: 0 auto 0 auto;
    .subtitle {
      margin-top: 16px;
    }
  }
`;
const CardsSection = styled.section`
  padding: 40px 0;
  background: var(--light-surface-container-lowest);

  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    @media (max-width: 1100px) {
      gap: 16px;

      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
`;
