import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import { Typography } from "@mui/material";
import PatternHeading from "../../Headings/PatternHeading";
import MenuCard from "../../Card/MenuCard";
export default function MenuSection({ title, description, cards, className }) {
  if (cards.length === 0) {
    return;
  }

  const cardsComponent = cards.map((card, index) => {
    return (
      <MenuCard
        key={index}
        title={card.item_title}
        description={card.item_description}
        image={card.image}
        cta={card.link}
      />
    );
  });
  return (
    <Section className={className}>
      <Container className="container" maxWidth="xl">
        <PatternHeading title={title} description={description} />
        <div className="cards-wrapper mt-40">{cardsComponent}</div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  padding: 80px 0;
  background: var(--dark-surface-container-lowest);
  @media (max-width: 768px) {
    padding: 40px 0;
  }
  .container {
    .title-description-wrapper {
    }
    .cards-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 32px;
      @media (max-width: 1366px) {
        gap: 16px;
      }
      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }
  }
`;
