"use client";
import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
export default function USP({
  title,
  description,
  cards,
  showTitle = false,
  statsArray,
}) {
  return (
    <Section>
      <Container maxWidth="xl" className="container">
        {showTitle && (
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
            {statsArray && statsArray.length > 0 && (
              <div className="stats-wrapper mt-24">
                {statsArray.map((stat, index) => (
                  <div key={index} className="stat">
                    <Typography
                      variant="h2"
                      component="div"
                      className="title"
                      color="var(--dark-on-surface)"
                      align="center"
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="description"
                      color="var(--dark-on-surface)"
                      align="center"
                    >
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="cards-wrapper">
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => (
              <div key={index} className="card">
                <Image
                  src={card.icon.url}
                  alt={card.icon.alt}
                  width="80"
                  height="80"
                  className="image"
                />
                <div className="content">
                  <Typography
                    variant="h6"
                    component="h3"
                    className="title mt-16"
                    color="var(--dark-on-surface)"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className="description mt-8"
                    color="var(--dark-on-surface-variant)"
                  >
                    {card.description}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  margin-top: 8px;
  background: var(--dark-secondary-container);
  padding: 80px 0;

  @media (max-width: 900px) {
    padding: 40px 0;
  }
  .container {
    display: grid;
    grid-template-columns: 500px 1fr;
    gap: 80px;
    align-items: start;
    @media (max-width: 1300px) {
      gap: 40px;
    }
    @media (max-width: 1250px) {
      gap: 24px;
      grid-template-columns: 1fr;
    }
    .title-wrapper {
      @media (min-width: 1250px) {
        position: sticky;
        top: 100px;
      }
      .title {
        color: var(--dark-on-surface);
      }
      .description {
        color: var(--dark-on-surface-variant);
      }
    }
    .cards-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      @media (max-width: 900px) {
        gap: 16px;
      }
      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
      .card {
        border-radius: 12px;
        border: 1px solid #b3f1be;
        background: var(
          --material-theme-sys-dark-medium-contrast-on-secondary-fixed-variant,
          #003f1d
        );
        padding: 16px;
        .title {
        }
        .image {
          border-radius: 50%;
        }
      }
    }
    .stats-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .stat {
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 8px 16px;
      }
    }
  }
`;
