import styled from "@emotion/styled";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/utils/themeSettings";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
export default function ProjectsSection({
  title,
  subtitle,
  description,
  cards,
  projectsData,
}) {
  // filter all projects with the selected projects
  const projectsDataArr = projectsData.filter((project) =>
    cards.includes(project.id)
  );

  const cardsJSX = projectsDataArr.map((card, index) => {
    return (
      <Link
        className={`card card-${index + 1}`}
        key={index}
        href={`/projects/${card.slug}`}
      >
        <div className="image-wrapper">
          <Image
            src={card.acf.gallery[0].url}
            alt={
              card.acf.gallery[0].alt
                ? card.acf.gallery[0].alt
                : card.title.rendered
            }
            fill
            priority={true}
            sizes="100vw"
            className="hero-image"
          />
        </div>
        <div className="content-wrapper">
          <Typography variant="subtitle1" component="h4" className="title">
            {card.title.rendered}
          </Typography>
          <Typography variant="subtitle1" component="p" className="description">
            <LocationOnIcon sx={{ position: "relative", top: "6px" }} />
            {card.acf.location}
          </Typography>
        </div>
      </Link>
    );
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="xl">
          <div className="subtitle-row">
            <Typography component="h3" variant="h3" className="subtitle">
              {subtitle}
            </Typography>
          </div>
          <div className="title-row">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <Typography variant="h5" component="p" className="subtitle">
              {description}
            </Typography>
          </div>

          <div className="cards">{cardsJSX}</div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-low);
  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .subtitle-row {
    @media (min-width: 900px) {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    }

    .subtitle {
      grid-column: 5 / span 8;
    }
  }
  .title-row {
    margin-top: 24px;

    @media (min-width: 900px) {
      margin-top: 120px;
      display: grid;
      grid-template-columns: 60% 40%;
    }
    .title {
      grid-column: 1 / span 1;
    }
    .subtitle {
      margin-top: 24px;
      grid-column: 1 / span 1;
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
    .card-1 {
      grid-column: 5 / span 4;
      .image-wrapper {
        padding-bottom: 100%;
        @media (max-width: 900px) {
          padding-bottom: 56.25%;
        }
      }
    }
    .card-2 {
      grid-column: 9 / span 4;
      .image-wrapper {
        padding-bottom: 150%;
        @media (max-width: 900px) {
          padding-bottom: 56.25%;
        }
      }
    }
    .card-3 {
      grid-column: 1 / span 8;
      .image-wrapper {
        padding-bottom: 64%;
        @media (max-width: 900px) {
          padding-bottom: 56.25%;
        }
      }
    }
    .card {
      cursor: pointer;
      .image-wrapper {
        border-radius: 12px;
        overflow: hidden;
        img {
          transition: transform 1s;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      .content-wrapper {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
`;
